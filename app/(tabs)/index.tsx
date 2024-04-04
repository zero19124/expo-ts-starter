import { Button, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import Landing from "../screens/landing";

export default function TabOneScreen() {
  // const randomWidth = useSharedValue(10);
  const router = useRouter();
  // const config = {
  //   duration: 500,
  //   easing: Easing.bezier(0.5, 0.01, 0, 1),
  // };

  // const style = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(randomWidth.value, config),
  //   };
  // });
  // return <Landing />;
  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          { width: 100, height: 80, backgroundColor: "black", margin: 30 },
          style,
        ]}
      /> */}
      <View className="w-100 h-100 bg-red-500"></View>
      <Button
        title="toggle"
        onPress={() => {
          router.push("/screens/landing/");
          // randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
