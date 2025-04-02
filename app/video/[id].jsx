import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { Video } from "expo-av";
import RenderHTML from "react-native-render-html";
import icons from "../../constants/icons";
import { useGlobalContext } from "../../context/GlobalProvider"; // Import the context

const VideoDetail = () => {
  // Extract parameters with default values
  const params = useLocalSearchParams();
  const title = params.title || "Untitled";
  const video = params.video || "";
  const creator = params.creator || "Unknown";
  const description = params.description || "";
  const avatar = params.avatar || ""; // This could be a string URL or an object
  const postId = params.postId || "";

  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user } = useGlobalContext();
  const { bookmarkedPosts, toggleBookmark, completeActivity } =
    useGlobalContext(); // Use hook here
  const isBookmarked = bookmarkedPosts.includes(postId);

  // Log avatar to see the passed value
  console.log("Avatar:", avatar);
  console.log(typeof avatar);
  console.log(avatar == "[object Object]");

  // Check if it's a YouTube video
  const isYouTubeVideo =
    video.includes("youtube.com") || video.includes("youtu.be");

  // Convert regular YouTube URL to an embeddable format
  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}?rel=0&playsinline=1`
      : url;
  };

  // Open external links safely
  const openExternalLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  // State for managing challenge completion (local state)
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  // Handle Challenge Completion
  const handleCompleteChallenge = () => {
    completeActivity(); // Call the completeActivity function from context
    setChallengeCompleted(true); // Mark challenge as completed locally
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="bg-primary p-4 flex-1">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 flex justify-center items-center"
          >
            <Image
              source={icons.leftArrow}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View className="flex-row items-center gap-4 ml-1 flex-1">
            <Image
              source={
                avatar != "[object Object]" ? avatar : { uri: user?.avatar }
              }
              className="w-12 h-12 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-xl font-semibold text-white">{title}</Text>
              <Text className="text-sm text-gray-300">by {creator}</Text>
            </View>
          </View>
          {/* Bookmark button - toggles if pressed */}
          <TouchableOpacity
            onPress={() => toggleBookmark(postId)}
            className="w-10 h-10 flex justify-center items-center"
          >
            <Image
              source={icons.bookmark}
              className="w-6 h-6"
              style={{
                //Changes color based on bookmark status
                tintColor: isBookmarked ? "#FF9C01" : "#CDCDE0",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Video or Image Section */}
        {isYouTubeVideo ? (
          <WebView
            source={{
              html: `<iframe width="100%" height="100%" src="${getYouTubeEmbedUrl(
                video
              )}" frameborder="0" allowfullscreen></iframe>`,
            }}
            className="w-full h-60 rounded-xl mb-4"
            javaScriptEnabled
            domStorageEnabled
          />
        ) : video.endsWith(".mp4") ||
          video.endsWith(".mov") ||
          video.endsWith(".avi") ? (
          <Video
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mb-4"
            resizeMode="contain"
            useNativeControls
            shouldPlay={false}
          />
        ) : (
          <Image
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mb-4"
            resizeMode="cover"
          />
        )}

        {/* Render Clickable Links in Description */}
        <RenderHTML
          contentWidth={width}
          source={{
            html: description
              ? `<p style="color: #ccc; font-size: 16px;">${description.replace(
                  /(https?:\/\/[^\s]+)/g,
                  '<a href="$1" style="color: #4A90E2; text-decoration: underline;">$1</a>'
                )}</p>`
              : "<p>No description available.</p>",
          }}
          tagsStyles={{
            p: { color: "#ccc", fontSize: 16 },
            a: { color: "#4A90E2", textDecorationLine: "underline" },
          }}
          onLinkPress={(event, href) => openExternalLink(href)}
        />

        {/* Challenge Completion Button */}
        {!challengeCompleted && (
          <TouchableOpacity
            onPress={handleCompleteChallenge}
            style={{
              backgroundColor: "#4caf50",
              padding: 12,
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Completed Activity
            </Text>
          </TouchableOpacity>
        )}

        {challengeCompleted && (
          <View className="flex justify-center items-center w-full mt-8">
            <Text className="text-lg text-green-500">Activity Completed!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoDetail;
