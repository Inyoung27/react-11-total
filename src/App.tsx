import { RouterProvider } from "react-router";
import router from "./router/AppRouter.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";

function App() {
    return (
        <>
            <GlobalStyle />
            <RouterProvider router={router} />;
        </>
    );
}

export default App;
