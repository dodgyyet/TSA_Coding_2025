import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { EmptyState, SearchInput, VideoCard } from "../../components";
import samplePosts from "../../assets/samplePosts";
import shuffler from "lodash"; // Import Lodash - filters the posts randomly with shuffler
import InfoPopup from "../../components/InfoPopup.jsx"; // Import Streak component
import streak from "../../assets/icons/streak.png";
import { useGlobalContext } from "../../context/GlobalProvider.jsx";
const Home = () => {
  const [query, setQuery] = useState(""); // Query state to filter posts
  const [filteredPosts, setFilteredPosts] = useState(samplePosts); // Filtered posts based on query
  const [refreshing, setRefreshing] = useState(false);
  const [streakVisible, setStreakVisible] = useState(false); // To control the visibility of the streak popup
  const { user } = useGlobalContext();

  // Function to filter posts based on the search query
  const runSearch = (searchQuery) => {
    //console.log("search with query:", searchQuery); // Log query before filtering
    setQuery(searchQuery);

    if (searchQuery === "") {
      setFilteredPosts(samplePosts); // Reset to all posts when no query
    } else {
      const filtered = samplePosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      //console.log("Filtered posts:", filtered);
      setFilteredPosts(filtered); // Update filtered posts
    }
  };

  // Function to handle refreshing and randomize the post order
  const onRefresh = async () => {
    setRefreshing(true);
    const shuffledPosts = shuffler.shuffle(samplePosts); // Shuffle posts using Lodash
    setFilteredPosts(shuffledPosts);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={filteredPosts} // Display filtered posts (if a filter is applied)
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (
            <VideoCard
              title={item.title}
              creator={item.creator.username}
              thumbnail={item.thumbnail}
              video={item.video}
              description={item.description}
              postId={item.$id}
              avatar={item.avatar}
            />
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex mt-2 px-4">
            <View className="flex flex-row justify-between items-center mb-6">
              {/* User Greeting */}
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              {/* Streak Icon in top right corner  */}
              <TouchableOpacity
                onPress={() => {
                  console.log("Streak icon pressed");
                  setStreakVisible(true);
                }}
              >
                <View className="flex flex-row items-center">
                  <Image source={streak} style={{ width: 75, height: 75 }} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="mb-6">
              <SearchInput
                query={query}
                setQuery={setQuery}
                onSearch={runSearch}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Posts Found" subtitle="No posts created yet" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Streak Component Popup */}
      {streakVisible && (
        <InfoPopup
          onClose={() => {
            setStreakVisible(false);
          }}
          visible={streakVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
