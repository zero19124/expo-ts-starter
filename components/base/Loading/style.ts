import { StyleSheet } from 'react-native';

export const createStyle = () => {
  const textFontSize = 14;
  // const textFontSize = theme.font_size_md;

  return StyleSheet.create({
    text: {
      fontSize: textFontSize,
      marginLeft: 8,
    },
    verticalText: {
      fontSize: textFontSize,
      marginTop: 8,
    },
  });
};
