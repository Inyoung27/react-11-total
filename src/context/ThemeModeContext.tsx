import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeModeContextType = {
    mode: ThemeMode;
    toggleTheme: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | null>(null);

export function ThemeModeProvider({ children }: {children: ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", mode);
    },[mode]);

    const toggleTheme = () => {
        setMode(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error("useThemeMode는 ThemeModeProvider 안에서만 쓸 수 있어요.");
    }
    return context;
}