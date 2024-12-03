import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Categories } from "./categories.entity";

@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService:CategoriesService){}
    @Get()
    @HttpCode(HttpStatus.OK)
    async getCategories(){
        try{
            return this.categoriesService.getCategories();
        }catch{
            throw new BadRequestException('Error al obtener las categorias')
        }
    }

    @Get('seeder')
    @HttpCode(HttpStatus.OK)
    async addCategoryJSON(){
        return this.categoriesService.addCategoriesJSON()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addCategories(@Body() categorie: Partial<Categories>): Promise<Categories>{
        try{
            return this.categoriesService.addCategories(categorie)
        }catch{
            throw new BadRequestException('Error al crear la categoria')

        }
    }
}