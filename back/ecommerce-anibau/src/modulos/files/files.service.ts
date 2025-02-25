import { Injectable } from "@nestjs/common";
import { FilesRepository } from "./files.repository";

@Injectable()
export class FilesService{
    constructor(private readonly filesRepository: FilesRepository){}

    //* POST/FILES/UPLOADIMAGE/:ID
    async uploadImage(id:string, file:Express.Multer.File){
        return this.filesRepository.uploadImage(id, file)
    }
}