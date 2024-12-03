import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { CategoriesRepository } from "./categories.repository";
import { Products } from "../Products/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Categories, Products])],
    providers:[CategoriesService, CategoriesRepository],
    controllers:[CategoriesController]
})
export class CategoriesModule{}