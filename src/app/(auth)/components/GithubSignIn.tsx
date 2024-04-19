import { Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image"
import { Github } from "@/app/assets";

type Props = {
	isAuthenticating: boolean,
	setIsAuthenticating: (update: boolean) => void,
}

export default function GithubSignIn({ isAuthenticating, setIsAuthenticating }: Props) {

	async function signInWithGithub() {
		if (isAuthenticating) return;
		setIsAuthenticating(true)
		const res = await signIn("github");
		setIsAuthenticating(false)
	}

	return (
		<button
			className={`rounded  px-4 py-2 flex gap-4 items-center justify-center bg-primary border-2 w-full ${isAuthenticating ? "bg-gray-50 hover:bg-gray-50" : ""}`}
			onClick={() => signInWithGithub()}
			disabled={isAuthenticating}
		>
			<Image src={Github} alt="" className="w-6" />
			<span>Continue with Github</span>
		</button>
	)
}
