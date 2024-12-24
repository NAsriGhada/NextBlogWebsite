import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDB } from "./utils";
import { User } from "./models";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    console.log("users credentials", credentials);
    connectToDB();
    const user = await User.findOne({
      username: credentials.username,
    });
    if (!user) {
      throw new Error("wrong credentials from username");
    }
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    console.log("Password comparison result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new Error("wrong credentials from password");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      // return true
      if (account.provider === "github") {
        // saving new user here
        connectToDB();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
