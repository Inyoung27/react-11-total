import { Link, Outlet } from "react-router";

function MainLayout () {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/todo">Todo</Link>
        <Link to="/coin">Coin</Link>
        <Link to="/board">Board</Link>
        <Link to="/product">Product</Link>
        <Link to="/book">Book</Link>
        <Link to="/movie">Movie</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MainLayout;