import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CategoriesService } from "./cetegories.service";
import { Categories } from "./categories.entity";

@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService:CategoriesService){}
    @Get()
    @HttpCode(HttpStatus.OK)
    getCategories(){
        try{
            return this.categoriesService.getCategories();
        }catch{
            throw new BadRequestException('Error al obtener las categorias')
        }
    }
    @Post('seeder')
    @HttpCode(HttpStatus.CREATED)
    async addCategories(@Body() categorie): Promise<Categories>{
        try{
            return this.categoriesService.addCategories(categorie)
        }catch{
            throw new BadRequestException('Error al crear la categoria')

        }
    }
}