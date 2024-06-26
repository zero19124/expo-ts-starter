import React, { FC, memo } from "react";
import { View, Text } from "react-native";
import Circular from "./Circular";
import Spinner from "./Spinner";
import type { LoadingProps } from "./type";
import { createStyle } from "./style";

const Loading: FC<LoadingProps> = (props) => {
  const styles = createStyle();

  const {
    children,
    size = 30,
    type = "circular",
    vertical,
    textColor,
    textSize,
    style,
    color = "#c8c9cc",
    ...rest
  } = props;

  return (
    <View
      style={[
        { flexDirection: vertical ? "column" : "row", alignItems: "center" },
        style,
      ]}
      {...rest}
    >
      {type === "circular" ? (
        <Circular color={color} size={size} />
      ) : (
        <Spinner color={color} size={size} />
      )}
      {children && (
        <Text
          style={[
            vertical ? styles.verticalText : styles.text,
            { color: color ?? textColor, fontSize: textSize },
          ]}
        >
          {children}
        </Text>
      )}
    </View>
  );
};

export default memo(Loading);
