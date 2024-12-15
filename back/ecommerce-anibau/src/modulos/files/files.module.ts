import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesRepository } from "./files.repository";
import { FilesController } from "./files.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "../Products/product.entity";
import { configCloudinary } from "../../config/cloudinary";

@Module({
    imports:[TypeOrmModule.forFeature([Products])],
    providers:[FilesService, FilesRepository, configCloudinary],
    controllers:[FilesController]
})
export class FilesModule{}
