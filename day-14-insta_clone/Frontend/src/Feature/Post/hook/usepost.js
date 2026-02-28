import { useContext } from "react";
import { getfeed } from "../service/post.api";
import { FeedContext } from "../Feed.context";

export const usepost = () => {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error("usepost must be used inside FeedProvider");
  }

  const { post, setPost, feed, setFeed, loading, setLoading } = context;

  const handlegetfeed = async () => {
    try {
      setLoading(true);

      const data = await getfeed();
      setFeed(data.posts);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, feed, post, handlegetfeed };
};