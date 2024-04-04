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
              rStore.cleanUser?.();
              router.push("/screens/landing/");
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
              <BrandText>{t("Infos")}</BrandText>
              <Text style={{ color: "white" }}>
                {JSON.stringify(rStore.user)}
              </Text>
              <InputView
                onPress={() => {
                  setSelectedNum(3);
                }}
                selected={selectedNum === 3}
                icon={
                  <Foundation
                    name="female-symbol"
                    size={28}
                    color={themeColor.white}
                  />
                }
                text={t("Female")}
              />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default GenderPage;
