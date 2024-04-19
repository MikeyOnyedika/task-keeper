import { AxiosError } from "axios";
import { SigninBody, SigninRequestResult, SignupBody, SignupRequestResult, ZodFieldError } from "../types";
import api from "./axios.config";
import { signIn } from "next-auth/react";
import { parseJSON } from "../utils/helpers";

export async function signup({
  username,
  password,
  email,
}: SignupBody): Promise<SignupRequestResult> {
  try {
    const { data, status } = await api.post("/signup", {
      username,
      password,
      email,
    });
    const operationStatus = "success";
    if (status === 200) {
      return {
        operationStatus,
        data: {
          message: data.message,
        },
      };
    }

    // the other non error status code will be a 201
    return {
      operationStatus,
      data: {
        user: data.user,
      },
    };
  } catch (er) {
    const err = er as AxiosError;
    const operationStatus = "error";

    if (err.response) {
      // check the  status code returned
      const resData = err.response.data as any;
      const errStatus = err.response.status as number;
      if (errStatus === 400) {
        return {
          operationStatus,
          errors: resData.errors as ZodFieldError[],
        };
      }

      // the only other error will be a 500
      return {
        operationStatus,
        error: resData.error,
      };
    }

    let error = "Something went wrong";
    if (err.request) {
      error = "Check your internet. Couldn't make request";
    } else {
      error = err.message;
    }

    return {
      operationStatus: "error",
      error,
    };
  }
}

export async function logIn({ email, password }: SigninBody): Promise<SigninRequestResult> {
  try {
    const res = await signIn("credentials", {
      password,
      email,
      redirect: false,
    });

    if (res?.error) {
      const operationStatus = "error"
      const err = parseJSON<ZodFieldError[]>(res.error);
      // if err parsing fails, it means err is just a string
      if (err === false) {
        return {
          operationStatus,
          error: res.error
        }
      }
      return {
        operationStatus,
        errors: err
      }
    }
    return {
      operationStatus: "success",
    }
  } catch (err) {
    console.log("nextauth login exception: ", err);
    return {
      operationStatus: "error",
      error: "Failed to login"
    }
  }

}
