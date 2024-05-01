"use client";
import Image from "next/image";
import Link from "next/link";
import Textbox from "../../components/FormInput/Textbox";
import { Github } from "@/app/assets";
import SubmitBtn from "@/app/components/FormInput/SubmitBtn";
import { FormEvent, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/app/clientRequests/auth";
import { SignupBody, User } from "@/app/types";
import { findMatchingFieldError } from "@/app/utils/findMatchingFieldError";
import GithubSignIn from "../components/GithubSignIn";

const initialFormState = {
  username: "",
  email: "",
  password: "",
};

type FormInputName = keyof typeof initialFormState;

export default function Signup() {
  const loginUrl = "/login";
  const emailRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const emailErrRef = useRef<HTMLParagraphElement>(null);
  const usernameErrRef = useRef<HTMLParagraphElement>(null);
  const passwordErrRef = useRef<HTMLParagraphElement>(null);

  const [formState, setFormState] = useState(initialFormState);

  const signupMutation = useMutation({
    mutationFn: async ({ username, email, password }: SignupBody) =>
      await signup({ username, email, password }),
  });

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // prevent double-triggering the handleSignup while there's a pending signup request
    if (signupMutation.isPending) {
      return;
    }

    if (!formState.email || !formState.password || !formState.username) {
      if (!formState.password) {
        passwordRef.current?.focus();
        passwordErrRef.current!.textContent = "Password is required";
      }

      if (!formState.username) {
        usernameRef.current?.focus();
        usernameErrRef.current!.textContent = "Username is required";
      }

      if (!formState.email) {
        emailRef.current?.focus();
        emailErrRef.current!.textContent = "Email is required";
      }

      return;
    }

    // clear the error fields
    clearErrMsgFields();

    // Do the actual API request to signup
    const res = await signupMutation.mutateAsync({
      username: formState.username,
      email: formState.email,
      password: formState.password,
    });

    if (res.operationStatus === "error") {
      if (res.error) {
        toast.error(res.error as string);
      }

      if (res.errors) {
        // display the error message for each field. Start in the reverse order as they appear in the UI so that the focus works as expected
        const passwordErr = findMatchingFieldError<FormInputName>(
          "password",
          res.errors
        );
        const usernameErr = findMatchingFieldError<FormInputName>(
          "username",
          res.errors
        );
        const emailErr = findMatchingFieldError<FormInputName>(
          "email",
          res.errors
        );

        if (passwordErr || usernameErr || emailErr) {
          if (passwordErr) {
            passwordErrRef.current!.textContent = passwordErr.message;
            passwordRef.current?.focus();
          }

          if (usernameErr) {
            usernameErrRef.current!.textContent = usernameErr.message;
            usernameRef.current?.focus();
          }

          if (emailErr) {
            emailErrRef.current!.textContent = emailErr.message;
            emailRef.current?.focus();
          }
        }

        toast.error("Some fields weren't filled correctly");
      }

      return;
    }

    if (res.data.message) {
      toast.error("User already exists. Try logging in");
      return;
    }
    // clear error fields
    clearErrMsgFields();

    // display success for signup
    toast.success("Signup Successful! Login in ...");
    // clear form state
    setFormState(initialFormState);

    // todo: attempt to automatically log in user
    const user = res.data.user as User;
    // try {
    //   await signIn("credentials", {
    //     username: user.username,
    //     hashedPassword: formState.password,
    //     email: user.email,
    //     redirect: false,
    //   });
    // } catch (err) {
    //   toast.error("Couldn't sign in");
    // }
  }

  function handleOnChange(update: { [key: string]: string }) {
    setFormState((prev) => {
      return { ...prev, ...update };
    });
  }

  function clearErrMsgFields() {
    emailErrRef.current!.textContent = "";
    usernameErrRef.current!.textContent = "";
    passwordErrRef.current!.textContent = "";
  }

  return (
    <section className="flex justify-center p-4">
      <div className="w-full max-w-[35rem] p-8 shadow-md rounded flex flex-col gap-8">
        <h2 className="text-3xl text-center">Create Account</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSignup}>
          <Textbox
            label="Email"
            name="email"
            placeholder="e.g johne@gmail.com"
            value={formState.email}
            onChange={handleOnChange}
            errRef={emailErrRef}
            ref={emailRef}
          />
          <Textbox
            label="Username"
            name="username"
            placeholder="e.g john_d23"
            value={formState.username}
            onChange={handleOnChange}
            errRef={usernameErrRef}
            ref={usernameRef}
          />
          <Textbox
            label="Password"
            name="password"
            type="password"
            placeholder="e.g xxxxxxxxxx"
            value={formState.password}
            onChange={handleOnChange}
            errRef={passwordErrRef}
            ref={passwordRef}
          />

          <SubmitBtn label="Continue" disable={signupMutation.isPending} />
        </form>
        <div>
          <div className="before:w-full before:h-[1px] before:bg-gray-50 after:w-full after:h-[1px] after:bg-gray-50 flex items-center gap-2">
            <span>Or</span>
          </div>
        </div>
        <div className="">
          <GithubSignIn isAuthenticating={signupMutation.isPending} />
        </div>
        <div>
          <p className="text-gray-50 text-center">
            Already have an account?{" "}
            <Link
              href={loginUrl}
              className="underline text-gray-75 hover:text-accent"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
