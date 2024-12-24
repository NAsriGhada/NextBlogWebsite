"use server";
import { connectToDB } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcrypt";

export const addPost = async (previousState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.findByIdAndDelete(id);
    console.log("deleted post");
    // to update and show the latest content immediately, rather than waiting for the cache to expire or requiring a manual refresh.
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong with deleting posts" };
  }
};

export const addUser = async (previousState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  console.log(username, email, password, img);
  try {
    connectToDB();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });
    await newUser.save();
    // to update and show the latest content immediately, rather than waiting for the cache to expire or requiring a manual refresh.
    revalidatePath("/admin");
    console.log("saved to db");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong with adding posts" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted user");
    // to update and show the latest content immediately, rather than waiting for the cache to expire or requiring a manual refresh.
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong with deleting posts" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};
export const handleGithubLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    // return "Passwords do not match";
    // throw new Error("Passwords do not match");
    return { error: "Passwords do not match" };
  }
  try {
    connectToDB();
    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    console.log("saved to db", newUser);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong with registration" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
