import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../Auth/auth.guard";

@Controller('files')
export class FilesController{
    constructor(private readonly filesService: FilesService){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(AuthGuard)
    async uploadImage(@Param('id') id: string, @UploadedFile( new ParseFilePipe({ validators:[
        new MaxFileSizeValidator({ maxSize:200000, message:'el archivo debe ser menor a 200k'
        }),
        new FileTypeValidator({ fileType:/(jpeg|jpg|png|webp)$/})
    ]})) file:Express.Multer.File){
        try{
            return this.filesService.uploadImage(id, file)
        }catch{
            throw new BadRequestException(`Error: el producto/imagen con id ${id} no se pudo actualizar`)
        }
    }
}