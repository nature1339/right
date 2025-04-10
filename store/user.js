import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      userInfo: {
        accessToken: "",
        refreshToken: "",
        userid: "",
      },
      isLoading: true,
      setIsLoading: (isLoading) => {
        set(() => ({
          isLoading,
        }));
      },
      setUser: (accessToken, refreshToken, userid) =>
        set(() => ({
          userInfo: {
            accessToken,
            refreshToken,
            userid,
          },
        })),

      clearUser: () =>
        set(() => ({
          userInfo: {
            accessToken: "",
            refreshToken: "",
            userid: "",
          },
        })),
    }),
    {
      name: "user-store", // localStorage에 저장될 키 이름
      partialize: (state) => ({ userInfo: state.userInfo }), // 저장할 상태 선택
      onRehydrateStorage: () => (state) => {
        state.setIsLoading(false);
      },
    }
  )
);

export default userStore;
