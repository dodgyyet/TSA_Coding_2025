import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import samplePosts from "../../assets/samplePosts"; // Import your sample posts data
import { EmptyState, SearchInput, VideoCard } from "../../components";

const Search = () => {
  const [query, setQuery] = useState(""); // Search query state
  const [filteredPosts, setFilteredPosts] = useState(samplePosts); // State to hold filtered posts

  // Function to handle search and filter posts
  const runSearch = (searchQuery) => {
    console.log("Running search with query:", searchQuery); // Debugging log for search query

    setQuery(searchQuery); // Update the query state
    // Filter posts based on the search query
    if (searchQuery === "") {
      console.log("No query entered, displaying all posts."); // Log when no query is entered
      setFilteredPosts(samplePosts); // If search query is empty, reset to all posts
    } else {
      const filtered = samplePosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("Filtered posts:", filtered); // Log the filtered posts
      setFilteredPosts(filtered); // Update filtered posts based on query
    }
  };

  useEffect(() => {
    console.log("Filtered Posts Updated:", filteredPosts); // Log the filtered posts whenever they change
  }, [filteredPosts]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredPosts} // Display filtered posts
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query || "Search for something..."}
              </Text>

              <View className="mt-6 mb-8">
                {/* Pass query and setQuery as props to SearchInput */}
                <SearchInput
                  query={query}
                  setQuery={setQuery}
                  onSearch={runSearch}
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
