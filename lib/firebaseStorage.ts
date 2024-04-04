import { initializeApp, getApp, getApps } from "@firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "@firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCqG6Cz411YoSKOn5M7AH9AwZmZ2xVa11I",
  authDomain: "soon-backend-3121a.firebaseapp.com",
  projectId: "soon-backend-3121a",
  storageBucket: "soon-backend-3121a.appspot.com",
  messagingSenderId: "93645944856",
  appId: "1:93645944856:web:791307d1a44a7a2ca76b6d",
  measurementId: "G-YBT4Z4HZKB",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
// get all files 
const listFiles = async () => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};
export {
  listFiles,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  uploadToFirebase,
};
