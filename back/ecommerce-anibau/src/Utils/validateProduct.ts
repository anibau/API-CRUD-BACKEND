
export function validateProduct(data): boolean{
    const validateP= 
    data.name !== undefined &&
    data.price !== undefined &&
    data.description !== undefined &&
    data.stock !== undefined &&
    data.categories !== undefined ;
     return validateP
}