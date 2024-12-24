import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import { Post } from "@/lib/models";

export const GET = async (request) => {
  try {
    connectToDB();
    const posts = await Post.find();
    return  NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
