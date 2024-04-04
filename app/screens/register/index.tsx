import Button from "@/components/base/Button";
import React, { useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { useRouter } from "expo-router";
import * as z from "zod";

import { darkTheme } from "@/theme/dark";
import BrandText from "@/components/complex/BrandText";
import LoginInput from "@/components/complex/LoginInput";
import GoBackBtn from "@/components/complex/GoBackBtn";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import registerStore from "@/stores/registerStore";
import fetchApi from "@/lib/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "@/components/base/Toast";
import { fetchFn } from "@/utils/fetch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAsyncStoreData, setAsyncStore } from "@/lib/asyncStorage";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "must more than 8 chars"),
  code: z.string().min(6, "must more than 5 chars"),
});
const SignUp = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const rStore = registerStore();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: rStore.user?.email || "",
      password: rStore.user?.password || "",
      code: rStore.user?.code || "",
    },
  });

  console.log(errors, "eeeee");
  const { themeColor } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.black }}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <GoBackBtn
            onPress={() => {
              rStore.cleanUser?.();
              router.back();
            }}
          />
          <View style={{ padding: 24, paddingTop: 0 }}>
            <BrandText>{t("Sign up")}</BrandText>
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View style={{ marginBottom: 8 }}>
                  <LoginInput
                    onBlur={onBlur}
                    value={rStore.user?.email}
                    onChangeText={(email: string) => {
                      onChange(email);
                      rStore.setUser({ email });
                    }}
                    placeholder="Email Address"
                    placeholderTextColor={darkTheme.text1}
                  />
                  {!!error?.message && (
                    <Text style={{ color: "red", marginBottom: 8 }}>
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
              name="email"
            />

            <Controller
              control={control}
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <View style={{ marginBottom: 8 }}>
                  <LoginInput
                    onBlur={onBlur}
                    value={rStore.user?.password}
                    onChangeText={(password: string) => {
                      onChange(password);
                      rStore.setUser({ password });
                    }}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor={darkTheme.text1}
                  />
                  {!!error?.message && (
                    <Text style={{ color: "red", marginBottom: 8 }}>
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
              name="password"
            />
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <View style={{ marginBottom: 8 }}>
                  <LoginInput
                    onBlur={onBlur}
                    value={rStore.user?.code}
                    onChangeText={(code: string) => {
                      onChange(code);
                      rStore.setUser({ code });
                    }}
                    placeholder="Code"
                    placeholderTextColor={darkTheme.text1}
                  />
                  {!!error?.message && (
                    <Text style={{ color: "red", marginBottom: 8 }}>
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
              name="code"
            />

            <View className="flex-row">
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  marginRight: 4,
                  textAlign: "center",
                  marginVertical: 24,
                }}
              >
                {t("Already have an account?")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "blue",
                    textAlign: "center",
                    marginVertical: 24,
                  }}
                >
                  {t("Login here")}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={async () => {
                if (!rStore.user?.email) {
                  Toast.fail("Enter email");
                  return;
                }
                Toast.success("Code Sent");
                const body = { email: rStore.user?.email, tag: "sign-in" };
                console.log(body, "body");
                const data = await fetchFn("/public/email/code/send", {
                  method: "POST",
                  body: body as any,
                });
                console.log(data, "data-code");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: themeColor.white,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {t("Send Code")}
              </Text>
            </TouchableOpacity>
            <View className="mb-4">
              <Button
                key={Math.random()}
                textStyle={{ fontWeight: "bold" }}
                onPress={handleSubmit(async (formData) => {
                  console.log(formData, "formData");
                  console.log(rStore, "rStore");
                  const data = await fetchApi("/public/email/code/verify", {
                    method: "POST",
                    body: {
                      email: rStore.user?.email,
                      code: rStore.user?.code,
                      tag: "sign-in",
                    } as any,
                  });
                  if (data.code !== 200) {
                    Toast.fail("Invalid Code");
                    return;
                  }
                  console.log(data.data, "data");
                  setAsyncStore("token", data.data);
                  console.log(getAsyncStoreData("token"));
                  router.push("/screens/register/register-process/age/");
                })}

                // className="bg-red-500 mb-4"
              >
                {t("Create account")}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};
export default SignUp;
