import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSiteName } from "@utils/common";

const getInitialTheme = () => {
  const siteName = getSiteName();
  return `${siteName}-light`;
};

const themeStore = create(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      toggleTheme: () =>
        set((state) => {
          const siteName = getSiteName();
          const [_, mode] = state.theme.split("-");
          return {
            theme: `${siteName}-${mode === "light" ? "dark" : "light"}`,
          };
        }),
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: "theme-data",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export default themeStore;
