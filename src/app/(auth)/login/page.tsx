"use client";
import Textbox from "@/app/components/FormInput/Textbox";
import Link from "next/link";
import SubmitBtn from "../../components/FormInput/SubmitBtn";
import { FormEvent, useState, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { findMatchingFieldError } from "@/app/utils/findMatchingFieldError";
import GithubSignIn from "../components/GithubSignIn";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "@/app/clientRequests/auth";
import { SigninBody, ZodFieldError } from "@/app/types";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const initialFormState = {
  password: "",
  email: "",
}

export default function Login({
  searchParams: { callbackUrl = "/projects" },
}: Props) {
  const signupUrl = "/signup";
  const router = useRouter();
  const [formState, setFormState] = useState(initialFormState);

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: SigninBody) =>
      await logIn({ email, password }),
  });


  function clearErrMsgFields() {
    emailErrorRef.current!.textContent = "";
    passwordErrorRef.current!.textContent = "";
  }

  function updateIsAuthenticating(update: boolean) {
    setIsAuthenticating(update)
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // prevent triggering submit twice in a row
    if (isAuthenticating) return;
    // make sure email or password is not empty
    if (!formState.email || !formState.password) {
      if (!formState.password) {
        passwordErrorRef.current!.textContent = "Password is required";
      }
      if (!formState.email) {
        emailErrorRef.current!.textContent = "Email is required";
      }
      return;
    }

    // clear the error fields
    clearErrMsgFields();

    updateIsAuthenticating(true);
    const res = await loginMutation.mutateAsync({
      email: formState.email, password: formState.password
    })
    updateIsAuthenticating(false);

    if (res.operationStatus === "error") {
      if (res.errors) {
        const errors = res.errors
        // check if the email field has an error
        const emailFieldError = findMatchingFieldError("email", errors);
        if (emailFieldError) {
          emailErrorRef.current!.textContent = emailFieldError.message;
        } else {
          emailErrorRef.current!.textContent = "";
        }
        // check if the password field has an error
        const passwordFieldError = findMatchingFieldError("password", errors);
        if (passwordFieldError) {
          passwordErrorRef.current!.textContent = passwordFieldError.message;
        } else {
          passwordErrorRef.current!.textContent = "";
        }
        toast.error("Some fields weren't filled correctly");
      } else {
        toast.error(res.error as string);
      }
      return;
    }


    clearErrMsgFields();
    toast.success("Login Successful!")
    // clear form state
    setFormState(initialFormState);
    // redirect to projects page
    router.push("/projects");
  }

  function handleOnChange(update: { [key: string]: string }) {
    setFormState((prev) => {
      return { ...prev, ...update };
    });
  }

  return (
    <section className="flex justify-center p-4">
      <div className="w-full max-w-[35rem] p-8 shadow-md rounded flex flex-col gap-8">
        <h2 className="text-3xl text-center">Login</h2>
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <Textbox
            label="Email"
            name="email"
            placeholder="e.g johne@gmail.com"
            value={formState.email}
            onChange={handleOnChange}
            errRef={emailErrorRef}
          />
          <Textbox
            label="Password"
            name="password"
            placeholder="e.g xxxxxxxxxx"
            value={formState.password}
            onChange={handleOnChange}
            errRef={passwordErrorRef}
          />
          <SubmitBtn label="Continue" disable={loginMutation.isPending} />
        </form>
        <div>
          <div className="before:w-full before:h-[1px] before:bg-gray-50 after:w-full after:h-[1px] after:bg-gray-50 flex items-center gap-2">
            <span>Or</span>
          </div>
        </div>
        <div className="">
          <GithubSignIn isAuthenticating={isAuthenticating} setIsAuthenticating={updateIsAuthenticating} />
        </div>
        <div>
          <p className="text-gray-50 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href={signupUrl}
              className="underline text-gray-75 hover:text-accent"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
