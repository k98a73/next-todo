import { useRouter } from "next/router";

import { auth } from "../lib/firebase";

const useSignOut = () => {
  const router = useRouter();
  return async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
};

export default useSignOut;
