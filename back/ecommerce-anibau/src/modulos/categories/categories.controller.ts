import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CategoriesService } from "./cetegories.service";
//import { Categories } from "./categories.entity";

@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService:CategoriesService){}
    @Get()
    @HttpCode(HttpStatus.OK)
    getCategories(){
        return this.categoriesService.getCategories();
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addCategories(@Body() categorie){
        return this.categoriesService.addCategories(categorie)
    }
}