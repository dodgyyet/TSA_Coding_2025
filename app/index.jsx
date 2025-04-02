import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  console.log(loading && isLogged);

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-full flex justify-center items-center px-4">
          {/* ActiveMax Logo */}
          <Image
            source={images.logo}
            className="w-[250px] h-[84px] mb-4"
            resizeMode="fill"
          />

          {/* Cards Image (Preview of App) */}
          <Image
            source={images.cards}
            className="max-w-[420px] w-full h-[350px]"
            resizeMode="contain"
          />

          {/* Title Text */}
          <View className="relative mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Inspire Activity Through{"\n"}
              Limitless Ideas With{" "}
              <Text className="text-secondary-200">ActiveMax</Text>
            </Text>
          </View>

          {/* Subtitle */}
          <Text className="text-sm font-pregular text-gray-100 mt-5 text-center">
            Where Tech meets Creativity to Inspire Activity and Kill Boredom®
          </Text>

          {/* Onboarding*/}
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
