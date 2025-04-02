import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router"; // Use Link for navigation to VideoDetail page
import { useGlobalContext } from "../context/GlobalProvider"; // Import global context

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
  description,
  postId,
}) => {
  const { bookmarkedPosts, toggleBookmark } = useGlobalContext(); // Get bookmarked posts and toggleBookmark function
  const isBookmarked = bookmarkedPosts.includes(postId); // Check if the post is bookmarked

  // Check if the thumbnail is a valid URL (i.e., a URI)
  const isUri = (url) => {
    return (
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://"))
    );
  };

  // Determine if thumbnail is a URI or local image to make sure it is properly displayed
  const thumbnailSource = isUri(thumbnail)
    ? { uri: thumbnail } // Use URI if it's a valid URL
    : thumbnail || ""; // Otherwise uses plain image or blank as fallback

  return (
    <View className="flex flex-col items-center px-4 mb-14 relative">
      <View className="flex flex-row gap-3 items-start w-full">
        {/* Thumbnail and creator info */}
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.25">
            <Image
              source={avatar}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            {/* Wrapping the title in a Link component for navigation to video detail page */}
            <Link
              href={{
                pathname: `/video/[id]`,
                params: {
                  title,
                  creator,
                  video,
                  description,
                  thumbnail,
                  avatar,
                  postId,
                },
              }}
              asChild
            >
              <TouchableOpacity activeOpacity={0.7} className="w-full">
                <Text
                  className="font-psemibold text-sm text-white"
                  numberOfLines={1}
                >
                  {title || "Untitled Content"}
                </Text>
                <Text
                  className="text-xs text-gray-100 font-pregular"
                  numberOfLines={1}
                >
                  {creator || "Unknown Creator"}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      {/* Content Section (also link to videodetail) */}
      <Link
        href={{
          pathname: `/video/[id]`,
          params: {
            title,
            creator,
            video,
            description,
            thumbnail,
            avatar,
            postId,
          },
        }}
        asChild
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={thumbnailSource} // Use the dynamically selected source
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Link>

      {/* Bookmark Button in Top Right Corner */}
      <TouchableOpacity
        onPress={() => toggleBookmark(postId)} // Toggle bookmark state on press
        className="absolute top-1 right-2"
      >
        <Image
          source={require("../assets/icons/bookmark.png")}
          className="w-6 h-6 mr-1"
          style={{
            tintColor: isBookmarked ? "#FF9C01" : "#CDCDE0",
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;
