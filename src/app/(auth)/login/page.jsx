// import { auth, signIn } from '@/lib/auth'
import { handleGithubLogin } from "@/lib/actions";
import React from "react";
import LoginForm from "../../../components/loginForm/LoginForm";
import styles from './login.module.css'

const LoginPage = () => {
  // const session = await auth()
  // console.log(session)
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;


