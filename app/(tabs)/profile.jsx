import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import userPosts from "../../assets/userPosts"; // Import sample posts

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  // Use the first post from samplePosts for the profile's post, if available
  const posts = null;

  const logout = async () => {
    // Simulate sign-out functionality
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={{ uri: item.avatar }}
            postId={item.$id}
            description={item.description}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Ideas Found"
            subtitle="No ideas found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            {/* Avatar Section */}
            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar } || ""}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username || "Unknown User"}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={userPosts?.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox title="8" subtitle="Friends" titleStyles="text-xl" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
