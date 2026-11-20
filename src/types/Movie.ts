export type MovieSummary = {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
};

export type MovieInfo = {
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Response: string;
    Error?: string;
};
