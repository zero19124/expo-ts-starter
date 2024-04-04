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
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

const AgePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [age, setAge] = useState("");
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
              <BrandText>{t("When’s your birthday?")}</BrandText>
              <LoginInput
                value={rStore.user!.birthday}
                maxLength={10}
                onChangeText={(val: string) => {
                  // console.log(val, "val-age", val.length, "age:", age.length);
                  const gt = val.length >= age.length;
                  if (val.length === 2 && gt) {
                    setAge((val += "/"));
                  }
                  if (val.length === 5 && gt) {
                    setAge((val += "/"));
                  }
                  setAge(val);
                  rStore.setUser({ birthday: val });
                }}
                keyboardType="number-pad"
                wrapperStyle={{ marginVertical: 24 }}
                placeholder={t("MM / DD / YYYY")}
                textStyle={{ color: darkTheme.text1 }}
                placeholderTextColor={darkTheme.text1}
              />
            </View>

            <View className="mb-4 items-center  ">
              <Button
                style={{ width: getSize(60) }}
                textStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  if (!rStore.user?.birthday) {
                    Toast.fail("Enter Age");
                    return;
                  }
                  if (dateRegex.test(String(rStore.user?.birthday))) {
                    console.log(2222);
                    return;
                  }
                  console.log(1111);
                  router.push("/screens/register/register-process/nickname/");
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
