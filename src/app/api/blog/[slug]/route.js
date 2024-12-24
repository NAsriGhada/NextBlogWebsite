import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import { Post } from "@/lib/models";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDB();
    const post = await Post.findOne({ slug });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;
  try {
    connectToDB();
    await Post.deleteOne(slug);
    return NextResponse.json("post deleted");
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to delete post" },
      { status: 500 }
    );
  }
};
