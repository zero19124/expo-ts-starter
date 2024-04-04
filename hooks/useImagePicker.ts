import * as ImagePicker from "expo-image-picker";
// Use typeof to get the type of ImagePicker.launchImageLibraryAsync
type ImagePickerResultType = typeof ImagePicker.launchImageLibraryAsync;

// Now you can use ImagePickerResultType as the type of your promises
export type TImagePickerResult = {
  uri: string;
  type: "image" | "video" | undefined;
  name: string | null | undefined;
};

export const pickImages = async ({
  startPicking = () => {},
  endPicking = () => {},
  afterUploaded = () => {},
  beforeUploaded = () => {},
  allowsEditing = false,
  allowsMultipleSelection = false,
} = {}) => {
  startPicking();
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing,
    allowsMultipleSelection,
    quality: 1,
  });
  endPicking();
  if (!result.canceled) {
    console.log(result, "result");
    const selectedImages = result?.assets?.map((image) => {
      return {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      };
    });
    console.log(selectedImages.length, "selectedImages.length-v2");

    // setImages(selectedImages);
    // console.log(selectedImages, "selectedImages");
    beforeUploaded();
    afterUploaded();

    return selectedImages;
  }
};
