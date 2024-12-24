"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navbarLink/navLink";
import Image from "next/image";
import { handleGithubLogout } from "@/lib/actions";

const Links = ({ session }) => {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  const [open, setOpen] = useState(false);

  // temporary variables
  // const session = true;
  // const isAdmin = true;
  // passing the permanent session as a prop coz this the client side so i cant use session directly here (refer to Next.js 14 Complete Course 2024 | Next.js 14 Full Stack App Tutorial for Beginners)
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleGithubLogout}>
              {" "}
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
