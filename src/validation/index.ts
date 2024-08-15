/**
 * 
 * @param product - product obj to check validation
 * @returns errors object
 */

export const productValidation = (product: {title: string, description: string, imgUrl: string, price: string})=> {
    const errors: {title: string, description: string, imgUrl: string, price: string}= {
        title: "",
        description: "",
        imgUrl: "",
        price: "",
    }

    const imgRegEx = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imgUrl);
    if(!product.title.trim() || product.title.length <= 3 || product.title.length >50) {
        errors.title = "Product title must be between 4 and 50 characters";
    }
    if(!product.description.trim() || product.description.length <= 10 || product.description.length >900) {
        errors.description = "Product description must be between 10 and 900 characters";
    }

    if(!product.imgUrl.trim() || !imgRegEx) {
        errors.imgUrl = "Not valid image url";
    }

    if(!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Not valid price";
    }
    return errors;
}