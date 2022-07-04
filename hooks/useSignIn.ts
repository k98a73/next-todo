import { useRouter } from "next/router";

import { auth } from "../lib/firebase";

const useSignIn = (email: string, password: string) => {
  const router = useRouter();
  return async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/todos");
    } catch (error: any) {
      alert(error.message);
    }
  };
};

export default useSignIn;
