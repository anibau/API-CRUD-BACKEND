import { Repository } from "typeorm";
import { Products } from "../Products/product.entity";
export declare class FilesRepository {
    private productRepository;
    constructor(productRepository: Repository<Products>);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        url: string;
    }>;
}
