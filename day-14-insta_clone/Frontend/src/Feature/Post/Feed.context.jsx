import { createContext, useState } from "react";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <FeedContext.Provider
      value={{ post, setPost, feed, setFeed, loading, setLoading }}
    >
      {children}
    </FeedContext.Provider>
  );
};