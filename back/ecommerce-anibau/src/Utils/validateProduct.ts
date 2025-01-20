import { ProductDto } from "src/modulos/Products/product.dto";

export function validateProduct(data:ProductDto): boolean{
    const validateP= 
    data.name !== undefined &&
    data.price !== undefined &&
    data.description !== undefined &&
    data.stock !== undefined &&
    data.categories !== undefined ;
     return validateP
}