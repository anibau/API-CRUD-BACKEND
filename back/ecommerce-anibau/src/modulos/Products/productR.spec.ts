import { Test, TestingModule } from "@nestjs/testing";
import { ProductRepository } from "./product.repository"
import { FindOneOptions, Repository } from "typeorm";
import { Products } from "./product.entity";
import { Categories } from "../categories/categories.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('productRepository testing', ()=>{
    let productRepository:ProductRepository;
    let mockProductRepository: Partial<Repository<Products>>;
    let mockCategoriesRepository: Partial<Repository<Categories>>;
    let mockProduct:Products;
    let module: TestingModule;

    beforeEach(async()=>{
        mockProduct={
            id:'uno', name: 'Producto 1', description:'description1', price:25.20, imgUrl:'imgurl1', stock:20 ,orderDetails:[], category:{
                id: 'uno', name: 'Category 1',
                products: []
            }
        }
        mockProductRepository={
            find: jest.fn().mockImplementation(()=>Promise.resolve([mockProduct])),
            findOne: jest.fn((options: FindOneOptions<Products>)=>{
                const where= options.where as Partial<Products>;
                if(where.id==='uno'){
                    return Promise.resolve({
                        id:'uno', name: 'Producto 1', description:'description1', price:25.20, imgUrl:'imgurl1', stock:20 ,orderDetails:[], category:{
                            id: 'uno', name: 'Category 1',
                            products: []
                        }
                    })
                } return Promise.resolve(null)
            }), 
            remove: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue(mockProduct)
        } 

        mockCategoriesRepository = {
            findOne: jest.fn((options: FindOneOptions<Categories>)=>{
                const where= options.where as Partial<Categories>; 
                if(where.id==='uno'){
                    return Promise.resolve({ id: 'uno', name: 'Category 1' , products:[]})
                } return Promise.resolve(null)
            })
        };

        module = await Test.createTestingModule({
            providers:[ProductRepository, {provide: getRepositoryToken(Products), useValue:mockProductRepository}, {provide:getRepositoryToken(Categories), useValue: mockCategoriesRepository}]
        }).compile();
        productRepository= module.get<ProductRepository>(ProductRepository)
    })
    afterAll(async()=>{
        await module.close()
    })
   
    it('Create an instance', ()=>{
    expect(productRepository).toBeDefined()
    })
    it('getProducts() retorna a array con categorias relacionadas', async()=>{
        const products= await productRepository.getProducts();
        expect(products).toHaveLength(1)
        expect(products).toBeInstanceOf(Array)
        expect(products[0]).toBeInstanceOf(Object)
        expect(products[0]).toHaveProperty('name')
        expect(products[0]).toHaveProperty('category')
    })
    it('getProductbyId() retorna un objeto', async()=>{
        const product= await productRepository.getProductbyId('uno');
        expect(product).toMatchObject({
            id: 'uno',
            name: 'Producto 1',
            category: { id: 'uno', name: 'Category 1' },
        })
    })
    it('getProductbyId() retorna error', async()=>{
        await expect(productRepository.getProductbyId('dos')).rejects.toThrow('error al obtener el producto por id dos')
    })
    it('deleteProduct() retorna mensaje exitoso', async()=>{
        (mockProductRepository.findOne as jest.Mock).mockResolvedValue({id: 'uno',
            name: 'Producto 1'});
        const result= await productRepository.deleteProduct('uno');
        expect (result).toBe('el producto con id uno fue eliminado exitosamente')
        expect(mockProductRepository.remove).toHaveBeenCalledTimes(1)
    })
    it('deleteProduct() retorna mensaje error si no encuentra id', async()=>{
        (mockProductRepository.findOne as jest.Mock).mockResolvedValue(null)
            await expect(productRepository.deleteProduct('dos')).rejects.toThrow('error: producto con id dos no encontrado')
            expect (mockProductRepository.remove).not.toHaveBeenCalled()
    })
    it('updateProduct() retorna mensaje exitosa', async()=>{
        (mockProductRepository.findOne as jest.Mock).mockResolvedValue(mockProduct);
        (mockCategoriesRepository.findOne as jest.Mock).mockResolvedValueOnce({
            id: 'dos',
            name: 'category 2',
            products: [],
        });
        const updateProduct= {
                 name: 'Producto 2', description:'description2', price:27, imgUrl:'imgurl1', stock:50 , categories:'category 2'
            }
        const result= await productRepository.updateProduct('uno', updateProduct);
        expect(mockProductRepository.save).toHaveBeenCalledTimes(1)
        expect(result).toBe('producto con id uno actualizado exitosamente')
    })
    it('updateProduct() no encuentra el id', async()=>{
        (mockProductRepository.findOne as jest.Mock).mockResolvedValue(null);
        (mockCategoriesRepository.findOne as jest.Mock).mockResolvedValue({
            id: 'dos',
            name: 'category 2',
            products: [],
        })
        const updateProduct= {
            name: 'Producto 2', description:'description2', price:27, imgUrl:'imgurl1', stock:50 , categories:'category 2'
       }
        await expect(productRepository.updateProduct('id', updateProduct)).rejects.toThrow('el producto id no existe')
       expect(mockProductRepository.save).not.toHaveBeenCalled()
    })
})