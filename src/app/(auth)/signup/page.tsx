"use client";
import Image from "next/image";
import { useFormik } from "formik";
import Link from "next/link";
import Textbox from "../../components/FormInput/Textbox";
import { Github } from "@/app/assets";
import SubmitBtn from "@/app/components/FormInput/SubmitBtn";

export default function Signup() {
  const loginUrl = "/login";

  return (
    <section className="flex justify-center p-4">
      <div className="w-full max-w-[35rem] p-8 shadow-md rounded flex flex-col gap-8">
        <h2 className="text-3xl text-center">Create Account</h2>
        <form className="flex flex-col gap-3">
          <Textbox
            label="Email"
            name="email"
            placeholder="e.g johne@gmail.com"
            value=""
          />
          <Textbox
            label="Username"
            name="username"
            placeholder="e.g john_d23"
            value=""
          />
          <Textbox
            label="Password"
            name="password"
            placeholder="e.g xxxxxxxxxx"
            value=""
          />

          <SubmitBtn label="Continue" />
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
