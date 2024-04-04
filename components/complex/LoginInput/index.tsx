import { useTheme } from "@/hooks/useTheme";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
interface LoginInputProp extends TextInputProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const LoginInput = (props: LoginInputProp) => {
  const { wrapperStyle, textStyle, ...rest } = props;
  const { themeColor } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.grey,
          borderRadius: 8,
        },
        wrapperStyle,
      ]}
    >
      <TextInput
        style={{
          paddingVertical: 15,
          padding: 12,
          fontSize: 24,
          ...(textStyle as any),
        }}
        {...rest}
      />
    </View>
  );
};
export default LoginInput;
