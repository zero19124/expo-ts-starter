import { StyleSheet } from "react-native";

export const createStyle = () => {
  return StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      // backgroundColor: theme.overlay_background_color,
      backgroundColor: '"rgba(0, 0, 0, 0.7)"',
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
