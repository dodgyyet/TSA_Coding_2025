import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";
import samplePosts from "../assets/samplePosts"; // Import samplePosts globally

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [activitiesCompleted, setActivitiesCompleted] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]); // Store bookmarked post IDs

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
          // Example stats values
          setStreak(24);
          setActivitiesCompleted(83);
          setBestStreak(34);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  // Toggle bookmark state
  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prevBookmarkedPosts) => {
      if (prevBookmarkedPosts.includes(postId)) {
        return prevBookmarkedPosts.filter((id) => id !== postId); // Remove bookmark
      } else {
        return [...prevBookmarkedPosts, postId]; // Add bookmark
      }
    });
  };

  // Define completeActivity function to increment activitiesCompleted
  const completeActivity = () => {
    setActivitiesCompleted((prevCount) => prevCount + 1); // Increment activities completed
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        streak,
        activitiesCompleted,
        bestStreak,
        bookmarkedPosts, // Providing bookmarkedPosts
        toggleBookmark, // Function to toggle bookmark
        completeActivity, // Provide completeActivity function
        samplePosts, // Providing samplePosts globally
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
