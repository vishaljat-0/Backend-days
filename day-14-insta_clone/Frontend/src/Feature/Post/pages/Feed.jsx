import React, { useEffect } from "react";
import "../style/Feed.scss";
import Post from "../component/Post";
import { usepost } from "../hook/usepost";

const Feed = () => {
  const { feed, handlegetfeed, loading } = usepost();
  useEffect(() => {
    handlegetfeed();
  }, []);
  if (loading || !feed) {
    return (
      <main>
        {" "}
        <h1> feed is loading</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main>
      <div className="post-conatiner">
        {feed.map((post) => {
          return <Post key={post._id} user={post.user} post={post} />;
        })}
      </div>
    </main>
  );
};

export default Feed;
