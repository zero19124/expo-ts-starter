import Button from "@/components/base/Button";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { useRouter } from "expo-router";
import BrandText from "@/components/complex/BrandText";
import GoBackBtn from "@/components/complex/GoBackBtn";
import { useTranslation } from "react-i18next";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { getSize } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { TImagePickerResult, pickImages } from "@/hooks/useImagePicker";
import registerStore from "@/stores/registerStore";
import Toast from "@/components/base/Toast";
import {
  getStorage,
  ref,
  listAll,
  uploadToFirebase,
  listFiles,
} from "@/lib/firebaseStorage";

const ProfilePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const rStore = registerStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.black }}>
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
            <BrandText>{t("Add your profile pic")}</BrandText>
            <Text
              style={{
                color: themeColor.white,
                marginTop: 24,
                fontWeight: "bold",
              }}
            >
              {t(
                "Make sure this photo is of you and your face is clearly visible."
              )}
            </Text>
          </View>

          <View style={{ flex: 1, padding: 36, paddingHorizontal: 48 }}>
            {rStore.user?.avatar?.uri ? (
              <FastImage
                style={{
                  flex: 1,
                  padding: 36,
                  paddingHorizontal: 48,
                  borderRadius: 8,
                }}
                source={{ uri: rStore.user?.avatar?.uri }}
              />
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: themeColor.grey242424,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  flex: 1,
                }}
                onPress={async () => {
                  pickImages({ allowsEditing: true }).then(async (res) => {
                    const imgData = res?.[0];
                    const { uri } = imgData || {};
                    console.log(imgData, "imgData");
                    const fileName = uri?.split("/").pop();
                    const uploadResp = await uploadToFirebase(
                      uri,
                      fileName,
                      (progress: number) => {
                        console.log(progress, "%%%%%");
                      }
                    );
                    console.log(uploadResp);
                    listFiles().then((listResp) => {
                      const files = listResp.map((value) => {
                        return { name: value.fullPath };
                      });

                      console.log(files, "files");
                    });
                    rStore.setUser({ avatar: imgData as TImagePickerResult });
                  });
                }}
              >
                <View
                  style={{
                    backgroundColor: themeColor.primary,
                    width: getSize(95),
                    height: getSize(95),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                >
                  <Entypo name="plus" size={45} color={themeColor.black} />
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View className="mb-4 items-center  ">
            <Button
              style={{ width: getSize(60) }}
              textStyle={{ fontWeight: "bold" }}
              onPress={() => {
                console.log(2222);
                if (!rStore.user?.avatar) {
                  Toast.fail("Upload Avatar");
                  return;
                }
                router.push("/screens/register/register-process/tags-choose/");
              }}
              // className="bg-red-500 mb-4"
            >
              <AntDesign name="arrowright" size={24} color="black" />
            </Button>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};
export default ProfilePage;
