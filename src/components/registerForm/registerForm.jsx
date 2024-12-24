"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import styles from "./registerForm.module.css";
import { register } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();
  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" id="" />
      <input type="email" placeholder="email" name="email" id="" />
      <input type="password" placeholder="password" name="password" id="" />
      <input
        type="password"
        placeholder="repeat password"
        name="passwordRepeat"
        id=""
      />
      <button>Register</button>
      {state?.error}
      <Link href={"/login"}>
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
