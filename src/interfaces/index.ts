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
    name: string;
    label: string;
    type: string;
}