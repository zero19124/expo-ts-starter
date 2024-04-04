import Button from "@/components/base/Button";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { getSize } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import registerStore from "@/stores/registerStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchApi from "@/lib/fetchApi";
import Toast from "@/components/base/Toast";
import { fetchFn } from "@/utils/fetch";
const interests = [
  "reading",
  "hiking",
  "cooking",
  "gardening",
  "painting",
  "photography",
  "traveling",
  "yoga",
  "meditation",
  "writing",
  "running",
  "swimming",
  "cycling",
  "drawing",
  "playing guitar",
  "playing piano",
  "playing violin",
  "singing",
  "dancing",
  "knitting",
  "pottery",
  "woodworking",
  "surfing",
  "skiing",
  "snowboarding",
  "rock climbing",
  "scuba diving",
  "fishing",
  "bird watching",
  "stargazing",
  "skydiving",
  "bungee jumping",
  "kayaking",
  "rafting",
  "horseback riding",
  "volunteering",
  "learning languages",
  "coding",
  "watching movies",
  "listening to music",
  "playing video games",
  "collecting stamps",
  "collecting coins",
  "astronomy",
  "baking",
  "home brewing",
  "calligraphy",
  "beekeeping",
  "urban gardening",
];

const TagChoosePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [age, setAge] = useState("");

  const { themeColor } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const rStore = registerStore();

  const scrollToMiddle = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: 150, animated: true });
    }, 750);
    return;
    // 获取 ScrollView 的宽度和高度
    const { width: containerWidth, height: containerHeight } =
      scrollViewRef.current?.measureLayout();

    // 计算滚动到中间位置的水平和垂直偏移量
    const scrollX = (containerWidth - scrollViewRef.current?.width) / 2;
    const scrollY = (containerHeight - scrollViewRef.current?.height) / 2;

    // 滚动到中间位置
    scrollViewRef.current?.scrollTo({ x: scrollX, y: scrollY, animated: true });
  };
  const [selectedList, setSelectedList] = useState<string[]>([]);
  useEffect(() => {
    scrollToMiddle();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.black }}>
      <GoBackBtn
        onPress={() => {
          router.back();
        }}
      />
      <View
        style={{
          flex: 1,
          // justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 24 }}>
          <BrandText>{t("What are you into?")}</BrandText>
          <Text
            style={{
              color: themeColor.white,
              marginTop: 24,
              fontWeight: "bold",
            }}
          >
            {t(
              "Tab 5 tags to show your hobbies and interests in your profile."
            )}
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={{
            height: 100,
            marginVertical: 32,
          }}
          contentContainerStyle={{
            width: getSize(800),
            flexWrap: "wrap",
            gap: 12,
            // backgroundColor: "blue",
          }}
          horizontal={true}
        >
          {interests.map((interest) => {
            const isInIt = rStore.user?.tags?.includes(interest);
            return (
              <TouchableOpacity
                onPress={() => {
                  if (isInIt) {
                    rStore.setUser({
                      tags: rStore.user?.tags?.filter(
                        (item) => item !== interest
                      ),
                    });
                    // setSelectedList(
                    //   selectedList.filter((item) => item !== interest)
                    // );
                    return;
                  }
                  rStore.setUser({
                    tags: [...(rStore.user?.tags || []), interest],
                  });
                  // setSelectedList([...selectedList, interest]);
                }}
                key={interest}
                style={{
                  alignSelf: "flex-start",
                  borderRadius: 4,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  backgroundColor: isInIt
                    ? themeColor.primary
                    : themeColor.grey,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: isInIt ? themeColor.black : themeColor.white,
                  }}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 24,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 4,
              padding: 8,
              backgroundColor: themeColor.white,
              width: "auto",
              alignItems: "center",
              gap: 8,
              flexDirection: "row",
            }}
          >
            <FontAwesome name="search" size={20} color={themeColor.black} />
            <Text style={{ fontSize: 16 }}>{t("See More")}</Text>
          </TouchableOpacity>
        </View>
        <View className="mb-4 items-center  ">
          <Button
            style={{ width: getSize(60) }}
            textStyle={{ fontWeight: "bold" }}
            onPress={async () => {
              if (!rStore.user?.tags?.length) {
                Toast.fail("Select Tags");
                return;
              }
              // const formData = new FormData();
              // formData.append("birthday", "1711699559768");
              // formData.append("gender", "1");
              // formData.append("want", "1");
              // formData.append(
              //   "avatar",
              //   "https://cdnb.artstation.com/p/assets/images/images/007/742/713/large/albert-zhou-img-2785.jpg?1508221010"
              // );
              // // formData.append("avatar", {
              // //   uri: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAMJSURBVFhHxZddSBRRFMf/d3a3THN3WwtpRWoLtSgoiB6UMEGQCOyhJyPBqCii6FkReklMqofAyF5CV4woCLQS6sE+INyXoIeIDLWl/Eo3w68kc3du54yXav2c2XbXHww759zh/s+ce+/ZOQL/ICXEgPSW6kCFBplPZqYQ0NRwTNCcOomM0G0nXY1ZYrCd5pTGIPEngM96tldD5B4NFipXYpDyZQT241u0vkE2jQBY3IbIa7J8bCcaykpQh+0AB6Fx2m0I302WOENZ9gmEW1hb9OveIyTepsaSi0Qpb7CKOWs1kCcoAJmvrKRDR6FA06XIVHZcmf4hjWs5JGmLfuld/qlloE2E0ZCO3q4werpm0fMhjG6+p999BWtwo8kNx5qoUrOAmAJ41voTDdenDKGx71S25lF+JhW1DW5oJkqY5QAmxnQc3DGC0PBCYeZ85XpU1jr5qJnCcpm9dmlyUXEWrL7qRNUV8+KMpQy8fzuLw/tDiESUQ2GzAXW33Th2OlV5zGM6A5JeuvrC+AJxftuamy6UnbIuzpgO4IF/Gm86fynrL3wSqs6NIy99CEcLvyH0dV6EK2BqCSYnJApzh5fceEzOTjsaH3uwdbtdecxhKgPpToFAMBMd7zbhTqsH23KjRYoOrUVbYKNlccb0EqSsE8jb7YDTJRDsDisvcPJiGvxPMshv+UAZWDoFMzMSJXtDRuVzOAQu1ztRfjZNjcaGpbBv1U0Z4m6Phpannv8WZ0xnoPdjGCV7Qsj22dD4yANfjvX1XgxTAfBRKysehc0BNNzfAJc7tvVeDFMzPWyeRs4uO5rbM+Iqzqw428S4jpRUgZp6F+zxyXoUok/3RqicLhmIToVNo1qfCGhpdRKW3DQsSaLE55DDmoDgjmVVoK/ygEYZ9is76VD6mwQ3BwNy83P6Xy1S/uQg5YssMVSs0QaU3KtRPoJqKPFIfCLNctY2dj/3aBHq1ej2FduJRErZEYbd6AvZjvp64+X4Qu05OSsoOGpY4tKeR2iuIVIKSKn5s7WBdjVEAL8B/hcaQZTdyGsAAAAASUVORK5CYII=`, // Append base64 data URI
              // //   type: "image/png",
              // //   name: "1.png",
              // // });
              // formData.append("tags", '["1","3"]');
              rStore.user.birthday = 1711699559768;
              rStore.user.avatar =
                "https://cdnb.artstation.com/p/assets/images/images/007/742/713/large/albert-zhou-img-2785.jpg?1508221010" as any;

              try {
                const data = await fetchFn("/user/sign-in-info", {
                  // headers: {
                  //   "Content-Type": "multipart/form-data",
                  // },
                  method: "POST",
                  body: rStore.user,
                });
                console.log(data, "data-rest-final");

                if (data.code !== 200) {
                  Toast.fail(data.message);
                  return;
                }
                Toast.success(data.message);
                console.log("ok");
                router.push("/screens/me/info/");
              } catch (e: any) {
                Toast.fail(e);
              }
            }}
            // className="bg-red-500 mb-4"
          >
            <AntDesign name="arrowright" size={24} color="black" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TagChoosePage;
