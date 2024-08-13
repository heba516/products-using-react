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