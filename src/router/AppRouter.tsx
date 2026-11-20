import  { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import Todo from "../pages/Todo.tsx";
import Coin from "../pages/Coin.tsx";
import Movie from "../pages/Movie.tsx";
import Book from "../pages/Book.tsx";
import Board from "../pages/Board.tsx";
import Product from "../pages/Product.tsx";
import ProductDetail from "../pages/ProductDetail.tsx";
import BoardDetail from "../pages/BoardDetail.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "todo", element: <Todo /> },
            { path: "coin", element: <Coin /> },
            { path: "board", element: <Board /> },
            { path: "product", element: <Product /> },
            { path: "book", element: <Book /> },
            { path: "movie", element: <Movie /> },
            { path: "board", element: <Board /> },
            { path: "board/:id", element: <BoardDetail /> },
            { path: "product", element: <Product /> },
            { path: "product/:id", element: <ProductDetail /> },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;