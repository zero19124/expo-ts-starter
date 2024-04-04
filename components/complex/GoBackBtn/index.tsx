import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

const GoBackBtn = (props: TouchableOpacityProps) => {
  const { themeColor } = useTheme();

  return (
    <TouchableOpacity {...props}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={36}
        color={themeColor.white}
      />
    </TouchableOpacity>
  );
};
export default GoBackBtn;
