import { FilesRepository } from "./files.repository";
export declare class FilesService {
    private readonly filesRepository;
    constructor(filesRepository: FilesRepository);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        url: string;
    }>;
}
