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
import { AntDesign, Foundation, Ionicons } from "@expo/vector-icons";
import { getSize } from "@/lib/utils";
import InputView from "@/components/complex/InputView";
import { useTheme } from "@/hooks/useTheme";
import registerStore from "@/stores/registerStore";
import Toast from "@/components/base/Toast";

const GenderPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [age, setAge] = useState("");
  const [selectedNum, setSelectedNum] = useState(-1);
  const { themeColor } = useTheme();
  const rStore = registerStore();

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
              <BrandText>{t("I want to meet?")}</BrandText>
              <Text
                style={{
                  color: themeColor.white,
                  marginTop: 24,
                  fontWeight: "bold",
                }}
              >
                {t(
                  "Choose the kind of friends you want to meet on Soon. You can change this later."
                )}
              </Text>
              <InputView
                onPress={() => {
                  rStore.setUser({ want: 1 });
                }}
                selected={rStore.user?.want === 1}
                wrapperStyle={{
                  marginTop: 16,
                }}
                icon={
                  <Ionicons
                    name="male-female-sharp"
                    size={28}
                    color={themeColor.white}
                  />
                }
                text={t("Any gender")}
              />
              <InputView
                onPress={() => {
                  rStore.setUser({ want: 2 });
                }}
                selected={rStore.user?.want === 2}
                wrapperStyle={{
                  marginVertical: 16,
                }}
                icon={
                  <Foundation
                    name="male-symbol"
                    size={28}
                    color={themeColor.white}
                  />
                }
                text={t("Male friends only")}
              />
              <InputView
                onPress={() => {
                  rStore.setUser({ want: 2 });
                }}
                selected={rStore.user?.want === 2}
                icon={
                  <Foundation
                    name="female-symbol"
                    size={28}
                    color={themeColor.white}
                  />
                }
                text={t("Female friends only")}
              />
            </View>

            <View className="mb-4 items-center  ">
              <Button
                style={{ width: getSize(60) }}
                textStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  if (!rStore.user?.want) {
                    Toast.fail("Enter Gender");
                    return;
                  }
                  console.log(2222);
                  router.push(
                    "/screens/register/register-process/profile-img/"
                  );
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
export default GenderPage;
