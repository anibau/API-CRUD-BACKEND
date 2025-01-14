import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "../Products/product.entity";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream'

@Injectable()
export class FilesRepository{
    constructor(@InjectRepository(Products) private productRepository: Repository<Products>){}

    //* POST/FILES/UPLOADIMAGE/:ID
    async uploadImage(id:string, file:Express.Multer.File){
        const product= await this.productRepository.findOne({where:{id: id}});
        if(!product){
            throw new NotFoundException(`Error: el producto con id ${id} no fue encontrado`)
        }
         // Subir imagen a Cloudinary
        const Result: UploadApiResponse= await new Promise((resolve, reject)=>{
            const upload= v2.uploader.upload_stream(
                {resource_type:'auto'},
                (error, result)=>{
                    if(error){
                        reject(error)
                    } else{resolve(result as UploadApiResponse)}
                }
            );
            toStream(file.buffer).pipe(upload);
        });
        if(!Result){
            throw new BadRequestException('error al cargar la imagen')
        }
        product.imgUrl=Result.url;
        await this.productRepository.save(product);
        return { message: 'Imagen actualizada exitosamente', url: Result.url };
    }
}