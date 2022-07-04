import { useRouter } from "next/router";

import { auth } from "../lib/firebase";

const useSignUp = (email: string, password: string) => {
  const router = useRouter();
  return async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push("/todos");
    } catch (error: any) {
      alert(error.message);
    }
  };
};

export default useSignUp;
