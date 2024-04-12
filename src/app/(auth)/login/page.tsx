"use client";
import Textbox from "@/app/components/FormInput/Textbox";
import Link from "next/link";
import Image from "next/image";
import { Github } from "@/app/assets";
import SubmitBtn from "../../components/FormInput/SubmitBtn";
import { signIn } from "next-auth/react";
import { FormEvent, useState, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { findMatchingFieldError } from "@/app/utils/findMatchingFieldError";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function Login({
  searchParams: { callbackUrl = "/projects" },
}: Props) {
  const signupUrl = "/signup";
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [formState, setFormState] = useState({
    password: "",
    email: "",
  });
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // make sure email or password is not empty
    if (!formState.email || !formState.password) {
      toast.error("Email and password are required");
      return;
    }

    setIsAuthenticating(true);
    const res = await signIn("credentials", {
      password: formState.password,
      email: formState.email,

      redirect: false,
    });

    if ((res as unknown as any).errors) {
      const errors = (res as unknown as any).errors as {
        message: string;
        field: string | number;
      }[];

      // check if the email field has an error
      const emailFieldError = findMatchingFieldError("email", errors);
      if (emailErrorRef.current) {
        if (emailFieldError) {
          emailErrorRef.current.textContent = emailFieldError.message;
        } else {
          emailErrorRef.current.textContent = "";
        }
      }

      // check if the password field has an error
      const passwordFieldError = findMatchingFieldError("password", errors);
      if (passwordErrorRef.current) {
        if (passwordFieldError) {
          passwordErrorRef.current.textContent = passwordFieldError.message;
        } else {
          passwordErrorRef.current.textContent = "";
        }
      }
    } else if (res?.error) {
      toast.error(res?.error || "Wrong credentials. Try again");
    } else if (res?.ok) {
      router.push(callbackUrl);
      toast.success("Logged in successfully!");
    }

    setIsAuthenticating(false);
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
          <SubmitBtn label="Continue" disable={isAuthenticating} />
        </form>
        <div>
          <div className="before:w-full before:h-[1px] before:bg-gray-50 after:w-full after:h-[1px] after:bg-gray-50 flex items-center gap-2">
            <span>Or</span>
          </div>
        </div>
        <div className="">
          <Link
            href="#"
            className="rounded  px-4 py-2 flex gap-4 items-center justify-center bg-primary border-2"
          >
            <Image src={Github} alt="" className="w-6" />
            <span>Continue with Github</span>
          </Link>
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
