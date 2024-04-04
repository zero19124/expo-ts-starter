import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewProps,
  TouchableOpacityProps,
} from "react-native";
import { useColorScheme } from "nativewind";
import { darkTheme } from "@/theme/dark";
import { cn } from "@/lib/utils";
import classNames from "classnames";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

export type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "default";
export type ButtonSize = "large" | "small" | "mini" | "normal";

export interface ButtonProps extends Pick<ViewProps, "style" | "testID"> {
  className?: string;
  onPress: any;
  /**
   * 类型，可选值为 primary success warning danger
   * @default default
   */
  children: string | React.ReactNode;
  type?: ButtonType;
  /**
   * 尺寸，可选值为 large small mini
   * @default normal
   */
  size?: ButtonSize;
  /**
   * 按钮颜色，支持传入 linear-gradient 渐变色
   */
  color?: string;
  /**
   * 左侧图标名称或自定义图标组件
   */
  icon?: React.ReactNode;
  /**
   * 图标展示位置，可选值为 right
   * @default left
   */
  iconPosition?: "left" | "right";
  /**
   * 是否为朴素按钮
   */
  plain?: boolean;
  /**
   * 是否为方形按钮
   */
  square?: boolean;
  /**
   * 是否为圆形按钮
   */
  round?: boolean;
  /**
   * 是否禁用按钮
   */
  disabled?: boolean;
  /**
   * 是否显示为加载状态
   */
  loading?: boolean;
  /**
   * 加载状态提示文字
   */
  loadingText?: string;
  /**
   * 加载图标类型
   */
  loadingType?: any;
  /**
   * 加载图标大小
   */
  loadingSize?: number;
  textStyle?: StyleProp<TextStyle>;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, textStyle, style, ...rest } = props;
  const { themeColor } = useTheme();

  return (
    <TouchableOpacity
      className={cn("justify-center items-center", className)}
      style={{
        backgroundColor: themeColor.primary,
        borderRadius: 8,
        paddingVertical: 17,
        ...(style as any),
      }}
      {...rest}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: themeColor.black,
          fontSize: 20,
          ...(textStyle as Object),
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
