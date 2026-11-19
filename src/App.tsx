import { RouterProvider } from "react-router";
import router from "./router/AppRouter.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext.tsx";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./styles/theme.ts";

function ThemeApp() {
    const {mode} = useThemeMode();

    return (
        <ThemeProvider theme={mode === "dark" ? DarkTheme : LightTheme}>
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

function App() {
    return (
        <ThemeModeProvider>
            <ThemeApp />
        </ThemeModeProvider>
    );
}

export default App;
