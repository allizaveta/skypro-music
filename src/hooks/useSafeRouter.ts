import { useRouter } from "next/router";

export function useSafeRouter() {
  try {
    return useRouter();
  } catch (error: unknown) {
    return {
      push: () => {},
      replace: () => {},
    };
  }
}
