import { Outlet } from "react-router";
import Header from "../components/Header.tsx";

function MainLayout () {
  return (
    <>
      <Header />
        <main>
            <Outlet />
        </main>
    </>
  );
}

export default MainLayout;