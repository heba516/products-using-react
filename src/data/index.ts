import {v4 as uuid} from "uuid";
import { Input, Products } from "../interfaces";

export const productList: Products[] = [
    {
        id: uuid(),
        title: "Nike",
        description: "Nike Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png",
        price: "500000",
        colors: ["blue-800", "red-600", "green-600"],
        category: {
            name: "Shoses",
            imgUrl:"https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        }
    },
    {
        id: uuid(),
        title: "Adidas",
        description: "Adidas Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        imgUrl: "https://assets.adidas.com/images/w_940,f_auto,q_auto/4b0ee1fa06f64b92945fae8c01714c15_9366/GW6424_01_standard.jpg",
        price: "300000",
        colors: ["blue-800", "red-600", "green-600"],
        category: {
            name: "Shoses",
            imgUrl:"https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        }
    },
    {
        id: uuid(),
        title: "Kalenji",
        description: "Kalenji Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. amet, consectetur adipisicing elit.",
        imgUrl: "https://contents.mediadecathlon.com/p2393865/59e9499e49d170903fb3c71ddaf67c3a/p2393865.jpg?format=auto&quality=70&f=2520x0",
        price: "700000",
        colors: ["blue-800", "red-600", "green-600"],
        category: {
            name: "Shoses",
            imgUrl:"https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        }
    },
    {
        id: uuid(),
        title: "Nike",
        description: "Nike Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png",
        price: "500000",
        colors: ["blue-800", "red-600", "green-600"],
        category: {
            name: "Shoses",
            imgUrl:"https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        }
    },
    {
        id: uuid(),
        title: "Adidas",
        description: "Adidas Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        imgUrl: "https://assets.adidas.com/images/w_940,f_auto,q_auto/4b0ee1fa06f64b92945fae8c01714c15_9366/GW6424_01_standard.jpg",
        price: "300000",
        colors: ["blue-800", "red-600", "green-600"],
        category: {
            name: "Shoses",
            imgUrl:"https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        }
    },
    {
        id: uuid(),
        title: "Kalenji",
        description: "Kalenji Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. amet, consectetur adipisicing elit.",
        imgUrl: "https://contents.mediadecathlon.com/p2393865/59e9499e49d170903fb3c71ddaf67c3a/p2393865.jpg?format=auto&quality=70&f=2520x0",
        price: "700000",
        colors: ["blue-800", "red-600", "green-600"],
        category: {
            name: "Shoses",
            imgUrl:"https://upload.wikimedia.org/wikipedia/en/9/9e/Lil_Nas_X_Satan_Shoes.png"
        }
    },
]


export const formInputs: Input[] = [
    {
        id: "title",
        name: "title",
        label: "Product Title",
        type: "text",
    },
    {
        id: "description",
        name: "description",
        label: "Product Description",
        type: "text"
    },
    {
        id: "img",
        name: "imgUrl",
        label: "Product Image Url",
        type: "text"
    },
    {
        id: "price",
        name: "price",
        label: "Product Price",
        type: "text"
    },
]

export const colors = ["#ff00b1","#2563EB","#84D2C5","#A31ACB", "#3C2A21", "#1F8A70", "#ff9441", "#FF0032", "#ffafe6", "#e762ff"];