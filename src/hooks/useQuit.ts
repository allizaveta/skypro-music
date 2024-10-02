"use client";

import { usePathname } from "next/navigation";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useAppDispatch } from "@/store/store";
import { signOut } from "@/store/features/userSlice";

export function useQuit() {
  const router = useSafeRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  function handleQuit() {
    dispatch(signOut());

    if (pathname === "/tracks/favorite") router.replace("/tracks/");
  }

  return { onQuit: handleQuit };
}
