export interface Products {
    id?: string | undefined;
    imgUrl: string;
    title: string;
    description: string;
    price: string;
    colors: string[];
    category: {
        name: string;
        imgUrl: string;
    }
}

export interface Input {
    id: string;
    name: "title"|"imgUrl"|"price"|"description";
    label: string;
    type: string;
}

export interface Category {
    id: string;
    name: string;
    imgUrl: string;
}