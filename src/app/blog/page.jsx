import { getPosts } from "../../lib/data";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/PostCard";

//  * // FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

   const data = await res.json();
   console.log("API Response:", data); // Check the structure here
   return data;
};

const BlogPage = async () => {
  // * FETCH DATA WITHOUT AN API (ACTIONS)
  // const posts = await getPosts();
  // console.log("get posts function", posts);
  // * FETCH DATA WITH AN API
  const posts = await getData();
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
