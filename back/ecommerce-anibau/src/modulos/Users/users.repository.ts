import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>){}
  // private Users: Users[] = [
  //   {
  //     id: 1,
  //     email: 'nina@mail.com',
  //     name: 'nina',
  //     password: 'nina2000',
  //     address: 'calle falsa 123',
  //     phone: 'string',
  //     country: undefined,
  //     city: 'lima',
  //   },
  //   {
  //     id: 2,
  //     email: 'shushi@mail.com',
  //     name: 'shushi',
  //     password: 'nina2000',
  //     address: 'calle falsa 123',
  //     phone: 'string',
  //     country: undefined,
  //     city: 'lima',
  //   },
  //   {
  //     id: 3,
  //     email: 'locky@mail.com',
  //     name: 'locky',
  //     password: 'nina2000',
  //     address: 'calle falsa 123',
  //     phone: 'string',
  //     country: undefined,
  //     city: 'lima',
  //   },
  //   {
  //     id: 4,
  //     email: 'manchas@mail.com',
  //     name: 'manchas',
  //     password: 'nina2000',
  //     address: 'calle falsa 123',
  //     phone: 'string',
  //     country: undefined,
  //     city: 'lima',
  //   },
  // ];
  async getUser() {
    const users= await this.userRepository.find({relations:{orders:true}});
    if(!users.length){
      throw new NotFoundException('no se encontraron usuarios')
    }
    return users 
  }

  async getUserbyId(id:string){
    //     Cuando se realice una búsqueda por ID (getUserById), debes devolver:
// Los campos básicos del usuario (como id, name, email, etc. menos password).
    const user= await this.userRepository.findOne({where:{id:id}, relations:{orders:true}});
    if(!user){
      throw new NotFoundException(`el usuario con id ${id} no existe`)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, orders, ...restUser}= user;
    // Un arreglo (array) de órdenes de compra (Orders) relacionadas con ese usuario.
    // Cada orden debe incluir solo los campos id y date.
    const ordenes= user.orders.map((order)=>({
      id:order.id,
      date:order.date
    }))
    return {...restUser, ordenes}    
   
  }
  async createUser(user:Partial<Users>) {
    const newUser= this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser
  }
  async updateUser(id: string, dataUser){
    //buscar usuario por id
    const user= await this.userRepository.findOne({where:{id:id}, relations:{orders:true}});
    if(!user){
      throw new NotFoundException(`usuario con id ${id} no encontrado`)
    }
    //asignamos el valor nuevo al uuario y guardamos
    Object.assign(user, dataUser);
    await this.userRepository.save(user);
    return `usuario con id ${id} actualizado correctamente`
  }
  async deleteUser(id:string){
    const user= await this.userRepository.findOne({where:{id:id}});
    if(!user){
      throw new NotFoundException(`ucuario con id ${id} no encontrado`)
    }
    await this.userRepository.remove(user);
    return `el usuario con id ${id} fue eliminado exitosamente`
  }
  //solicitud GET con QUERY PARAMS Y PAGINACION
  async getUserbyQueries(page: number, limit: number) {
    const initialIndex = (page - 1) * limit;
    const lastIndex = initialIndex + limit;
    const users= await this.userRepository.find();

    return users.slice(initialIndex, lastIndex);
  }
}
