import { TextProps } from "@/components/Themed";
import { useTheme } from "@/hooks/useTheme";
import { darkTheme } from "@/theme/dark";
import { Text } from "react-native";
interface BrandTextProp extends TextProps {
  text?: string;
}
const BrandText = (props: BrandTextProp) => {
  const { themeColor } = useTheme();

  const { children, ...rest } = props;
  return (
    <Text
      style={{
        fontSize: 32,
        color: themeColor.primary,
        fontWeight: "bold",
        marginBottom: 16,
      }}
      {...rest}
    >
      {children}
    </Text>
  );
};
export default BrandText;
