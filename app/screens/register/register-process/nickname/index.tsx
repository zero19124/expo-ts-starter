import Button from "@/components/base/Button";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { useRouter } from "expo-router";
import { darkTheme } from "@/theme/dark";
import BrandText from "@/components/complex/BrandText";
import LoginInput from "@/components/complex/LoginInput";
import GoBackBtn from "@/components/complex/GoBackBtn";
import { t } from "@/hooks/useI18n";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import { getSize } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import registerStore from "@/stores/registerStore";
import Toast from "@/components/base/Toast";

const AgePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [age, setAge] = useState("");
  const rStore = registerStore();
  const { themeColor } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.black }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 "
      >
        <Pressable
          className="flex-1"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <GoBackBtn
            onPress={() => {
              router.back();
            }}
          />
          <View
            style={{
              flex: 1,
              padding: 24,
              paddingTop: 0,
              justifyContent: "space-between",
            }}
          >
            <View>
              <BrandText>{t("What’s your nickname?")}</BrandText>
              <LoginInput
                value={rStore.user!.nickname}
                maxLength={15}
                onChangeText={(nickname: string) => {
                  rStore.setUser({ nickname });
                }}
                wrapperStyle={{ marginVertical: 24 }}
                placeholder={t("Nickname")}
                textStyle={{ color: darkTheme.text1 }}
                placeholderTextColor={darkTheme.text1}
              />
            </View>

            <View className="mb-4 items-center  ">
              <Button
                style={{ width: getSize(60) }}
                textStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  console.log(2222);
                  if (!rStore.user?.nickname) {
                    Toast.fail("Enter Nickname");
                    return;
                  }
                  router.push("/screens/register/register-process/gender/");
                }}
                // className="bg-red-500 mb-4"
              >
                <AntDesign name="arrowright" size={24} color="black" />
              </Button>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default AgePage;
