import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  StyleProp,
  Text,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
interface InputViewProp extends TouchableOpacityProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  text: string;
  selected?: boolean;
}
const InputView = (props: InputViewProp) => {
  const {
    icon,
    suffixIcon,
    wrapperStyle,
    selected = false,
    text,
    ...rest
  } = props;
  const { themeColor } = useTheme();
  const selectedStyle = { borderWidth: 2, borderColor: themeColor.white };
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: themeColor.grey,
          borderRadius: 8,
          padding: 16,
        },
        wrapperStyle,
        selected ? selectedStyle : {},
      ]}
      {...(rest as TouchableOpacityProps)}
    >
      {icon}
      <Text
        style={{
          marginHorizontal: 16,
          fontSize: 20,
          color: themeColor.white,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
      {suffixIcon}
    </TouchableOpacity>
  );
};
export default InputView;
