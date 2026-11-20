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
import BookDetail from "../pages/BookDetail.tsx";
import BookSearch from "../pages/BookSearch.tsx";
import MovieDetail from "../pages/MovieDetail.tsx";
import MovieSearch from "../pages/MovieSearch.tsx";

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
            { path: "board/:id", element: <BoardDetail /> },
            { path: "product/:id", element: <ProductDetail /> },
            { path: "book/search", element: <BookSearch /> },
            { path: "book/detail/:id", element: <BookDetail /> },
            { path: "movie/search", element: <MovieSearch /> },
            { path: "movie/detail/:id", element: <MovieDetail /> },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;