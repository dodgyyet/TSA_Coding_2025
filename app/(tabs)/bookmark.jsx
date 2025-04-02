import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Bookmark = () => {
  const { bookmarkedPosts, samplePosts } = useGlobalContext();

  const bookmarkedData = samplePosts.filter((post) =>
    bookmarkedPosts.includes(post.$id)
  );

  return (
    <SafeAreaView className="px-4 bg-primary h-full" edges={["top"]}>
      <Text className="text-2xl text-white font-psemibold my-6">
        Bookmarked Posts
      </Text>

      {bookmarkedData.length > 0 ? (
        <FlatList
          data={bookmarkedData}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard
              title={item.title}
              creator={item.creator.username}
              thumbnail={item.thumbnail}
              video={item.video}
              description={item.description}
              postId={item.$id}
              avatar={item.avatar}
            />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      ) : (
        <View className="flex items-center justify-center mt-10">
          <Text className="text-gray-400">No bookmarks yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
