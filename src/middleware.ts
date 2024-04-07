import { NextRequest, NextResponse } from "next/server";
import { validateSignupBody } from "@/app/middlewares/validateSignupBody";
import { MiddlewareConfig, MiddlewareFn } from "./app/types";

export function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl.pathname;
  const method = request.method;

  // only run on /api routes
  if (requestUrl.startsWith("/api")) {
    // set up middlewares for  ---  POST /api/signup
    if (requestUrl === "/api/signup") {
      if (method === "POST") {
        return middlewareRunner({
          req: request,
          fns: [validateSignupBody],
        });
      }
    }
  }
  return NextResponse.next();
}

//  pass it the request object and an array of middleware functions you want to run for that route/method
async function middlewareRunner({
  req,
  fns,
}: MiddlewareConfig): Promise<NextResponse> {
  for (const middlewareFn of fns) {
    const res = await middlewareFn(req);
    if (res.status < 200 || res.status > 299) {
      return res; // this means there has been a problem, so return to client some error response
    }
  }

  return NextResponse.next();
}
