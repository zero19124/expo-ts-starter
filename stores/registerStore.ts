import { TImagePickerResult } from "@/hooks/useImagePicker";
import { create } from "zustand";
// 定义状态类型
interface UserData {
  nickname?: string;
  code?: string;
  email?: string;
  password?: string;
  birthday?: string;
  gender?: number;
  want?: number;
  avatar?: TImagePickerResult;
  tags?: string[];
}
interface BearState {
  user?: UserData;
  setUser: (user: UserData) => void;
  cleanUser: () => void;
}

// 创建并导出 useBearStore hook
const useBearStore = create<BearState>((set) => ({
  user: {
    email: "",
    password: "",
    code: "",
    confirmPassword: "",

    // email: "evan@soonapp.ai",
    // password: "qQ12345678_",
    // code: "123456",
  },
  cleanUser: () => {
    set((state) => ({
      ...state,
      user: {}, // Merge new user data with existing user data
    }));
  },
  setUser: (user: UserData) =>
    set((state) => ({
      ...state,
      user: { ...(state.user || {}), ...user }, // Merge new user data with existing user data
    })),
}));

export default useBearStore;
