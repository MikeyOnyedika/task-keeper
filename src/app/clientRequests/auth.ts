import { AxiosError } from "axios";
import { SigninBody, SigninRequestResponse, SignupBody, SignupRequestResult, ZodFieldError } from "../types";
import api from "./axios.config";
import { signIn } from "next-auth/react";

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
  // TODO: I think this functino is broken. My login page breaks and sasys somthing along the lines of ... 
  try {
    const res = await signIn("credentials", {
      password,
      email,
      redirect: false,
    });
    if (res?.error) {
      const err = JSON.parse(res?.error);
      const operationStatus = "error"
      console.log("nextauth error: ", err);
      if (err instanceof Array) {
        return {
          operationStatus,
          errors: err
        }
      }
      return {
        operationStatus,
        error: err
      }
    }
    return {
      operationStatus: "success",
      message: "Login Successful"
    }
  } catch (err) {
    console.log("nextauth login exception: ", err);
    return {
      operationStatus: "error",
      error: "Failed to login"
    }
  }

}
