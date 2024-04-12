"use client";
import { isSessionStillActive } from "@/app/actions";
import {  signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function AuthStateMonitor() {
  const pathname = usePathname();

  const checkSessionStillActive = useCallback(async () => {
    const res = await isSessionStillActive();
    if (res === false) {
      await signOut({ callbackUrl: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("focus", checkSessionStillActive);
    return () => {
      window.removeEventListener("focus", checkSessionStillActive);
    };
  }, [checkSessionStillActive]);

  return <></>;
}
