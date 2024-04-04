import Button from "@/components/base/Button";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BrandText from "@/components/complex/BrandText";
import LoginInput from "@/components/complex/LoginInput";
import GoBackBtn from "@/components/complex/GoBackBtn";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import registerStore from "@/stores/registerStore";
import { Api } from "@/api/apiService";
import { HttpClient } from "@/api/http-client";
const Login = () => {
  const router = useRouter();
  const sss = registerStore();
  const { themeColor, toggleTheme, themeName } = useTheme();
  // console.log(themeColor, "colors");
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const showGoBack = useMemo(() => router.canGoBack(), []);
  return (
    <SafeAreaView style={{ backgroundColor: themeColor.black, flex: 1 }}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView>
          {showGoBack && (
            <GoBackBtn
              onPress={() => {
                router.back();
              }}
            />
          )}
          <View style={{ padding: 24, paddingTop: 0 }}>
            <BrandText>{t("Login")}</BrandText>
            {/* <Text style={{ color: "white" }}>{registerStore.}</Text> */}
            {/* <View
            className={classNames(` w-[${100}]  h-[50]    `, `bg-red-200`)}
            // style={tw`w-10 bg-red-200`}
          >
            <Text>466</Text>
          </View>
          <View
            className={cn(`w-[50vw]  h-[100]  bg-yellow-500 `)}
            // style={{ width: 50, height: 50 }}
          >
            <Text>466</Text>
          </View> */}
            <LoginInput
              wrapperStyle={{ marginVertical: 24 }}
              placeholder={t("Email Address")}
              placeholderTextColor={themeColor.text1}
            />
            <LoginInput
              placeholder={t("Password")}
              placeholderTextColor={themeColor.text1}
            />
            <Text
              style={{
                fontSize: 16,
                color: themeColor.white,
                textAlign: "center",
                marginVertical: 24,
              }}
            >
              {t("Forgot Password?")}
            </Text>
            {/* <Text className="text-white">Login</Text> */}
            <View className="mb-4 " style={{ gap: 4 }}>
              <Button
                textStyle={{ fontWeight: "bold" }}
                onPress={async () => {
                  router.replace("/(tabs)");
                  return;
                  const api = new Api();
                  const data = await api.public.emailCodeSendCreate({
                    tag: "sign-in",
                    email: "evan@soonapp.ai",
                  });
                  console.log(434343, data.json());
                  alert("login");
                }}
                // className="bg-red-500 mb-4"
              >
                {t("Login")}
              </Button>
              <Button
                textStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  toggleTheme(themeName === "light" ? "dark" : "light");
                }}
              >
                {t("Theme")}
              </Button>
              <Button
                textStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  handleChangeLanguage(i18n.language === "cn" ? "en" : "cn");
                }}
              >
                {t("Language")}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};
export default Login;
