import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './product.entity';
import { Repository } from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { ProductDto } from './product.dto';
import * as data from '../../Utils/data.json'

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Products) private productRepository: Repository<Products>,
  @InjectRepository(Categories) private categoriesRepository: Repository <Categories>
){}
  //* GET/PRODUCTS/
  async getProducts(page:number, limit:number) {
    const initialIndex= (page-1)*limit;
    const lastIndex= initialIndex+limit;
    
    const products= await this.productRepository.find({relations:{category:true}});
    if(!products){
      throw new BadRequestException('no se encontraron productos')
    }
    return products.slice(initialIndex, lastIndex)
  }
  //* GET/SEEDER
  async addProductJSON(){
    for(const obj of data){
      const product= await this.productRepository.findOne({where:{name: obj.name}});
      if(!product){
        let category= await this.categoriesRepository.findOne({where:{name:obj.categories}});
        if(!category){
          category= this.categoriesRepository.create({name:obj.categories});
          await this.categoriesRepository.save(category)
        }
        const newProduct= this.productRepository.create({...obj, category});
        await this.productRepository.save(newProduct)
      } else{throw new BadRequestException(`The product ${obj.name} already exist`)}
    }; return 'productos cargados'
  }
  //* GET/PRODUCTS/:ID
  async getProductbyId(id:string){
    const product= await this.productRepository.findOne({
      where:{id: id}, relations: {category:true}
    });
    if(!product){
      throw new NotFoundException(`error al obtener el producto por id ${id}`)
    }
    return product
  }
  //* POST/PRODUCTS
  async createProduct(product: ProductDto):Promise<Products> {
    //desestructur para obtener category 
    const {categories: categName, ...restProduct}= product;
    if (!categName) {
      throw new NotFoundException('Debes especificar una "categories" para el producto.');
    }
    //enconcontrar category en su rpositorio o crearlo
    let category= await this.categoriesRepository.findOne({where:{name:categName}});
    if(!category){
      category= this.categoriesRepository.create({name:categName});
      await this.categoriesRepository.save(category)
    }
    //enconcontrar producto por nombre en su repositorio o crearlo
    const nameproduct= await this.productRepository.findOne({where:{name: restProduct.name}});
    if(nameproduct){
      throw new NotFoundException(`el producto ${restProduct.name} ya existe`)
    }
    const newProduct=  this.productRepository.create({...restProduct, category});
    if(!newProduct){
      throw new BadRequestException('error al crear el producto')
    }
    await this.productRepository.save(newProduct)
    return newProduct
  }
  //* PUT/PRODUCTS
  async updateProduct(id:string, data:ProductDto){
    //busqueda de producto por id
    try{

      const product= await this.productRepository.findOne({where:{id:id}, relations:{category:true}});
      if (!product) {
        throw new NotFoundException(`el producto ${id} no existe`);
      };
      //verificar si categorie existe o sino crearla
      const {categories:categName, ...restProduct }= data;
      if(categName){
        let category= await this.categoriesRepository.findOne({where: {name:categName}});
        if(!category){
          category= this.categoriesRepository.create({name: categName});
          await this.categoriesRepository.save(category)
        };
        //asociar la nueva categoria al producto
        product.category= category;
      }
      //actualizar las propiedades del producto
      Object.assign(product, restProduct)
      //guaradar el producto actualizado
      await this.productRepository.save(product);
      return `producto con id ${id} actualizado exitosamente`;
    }catch(error){
      throw new NotFoundException('error al actualizar '+ error)
    }
  }
  //* DELETE/PRODUCTS
  async deleteProduct(id:string){
    //encontramos el producto por id
    const product= await this.productRepository.findOne({where:{id:id}});
    if(!product){
      throw new NotFoundException(`error: producto con id ${id} no encontrado`)
    }
    //removemos el producto de la base de datos
    this.productRepository.remove(product);
    return `el producto con id ${id} fue eliminado exitosamente`;
  }
}
