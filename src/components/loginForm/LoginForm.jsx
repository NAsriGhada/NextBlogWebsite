"use client";
import React from "react";
import { useFormState } from "react-dom";
import styles from "./loginForm.module.css";
import { login } from "@/lib/actions";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" id="" />
      <input type="password" placeholder="password" name="password" id="" />
      <button>Login with credentials</button>
      {state?.error}
      <Link href={"/register"}>
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
