export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publisher?: string;
        publishedDate?: string;
        description?: string;
        imageLinks?: {
            thumbnail: string;
        };
    };
};
