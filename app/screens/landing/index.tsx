import Button from "@/components/base/Button";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

const Landing = () => {
  const router = useRouter();
  console.log("Landing");
  const { t } = useTranslation();
  const { themeColor } = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColor.black,
        justifyContent: "space-around",
        flex: 1,
        alignItems: "center",
      }}
    >
      <FastImage
        style={{ width: 50, height: 50 }}
        source={require("@/assets/images/soon-log.png")}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View className="w-full">
        {/* <Text className="text-white">Landing</Text> */}
        <View className="mb-4">
          <Button
            textStyle={{ fontWeight: "bold" }}
            onPress={() => {
              console.log(2222);
              router.push("/screens/login/");
            }}
            // className="bg-red-500 mb-4"
          >
            {t("Login")}
          </Button>
        </View>
        <Button
          textStyle={{ fontWeight: "bold" }}
          onPress={() => {
            console.log(2222);
            router.push("/screens/register/");
          }}
          // className="mx-8"
        >
          {t("Sign In")}
        </Button>
      </View>
    </SafeAreaView>
  );
};
export default Landing;
