import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './CreateUserDto';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>){}
 
  async getUser(): Promise<Users[]> {
    const users= await this.userRepository.find({select:['id', 'name', 'email', 'phone', 'country', 'address', 'city', 'isAdmin'] ,relations:{orders:true}});
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
    const {password, orders, isAdmin,...restUser}= user;
    // Un arreglo (array) de órdenes de compra (Orders) relacionadas con ese usuario.
    // Cada orden debe incluir solo los campos id y date.
    const ordenes= user.orders.map((order)=>({
      id:order.id,
      date:order.date
    }))
    return {...restUser, orders:ordenes}    
   
  }

  async updateUser(id: string, dataUser: CreateUserDto): Promise<string>{
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
      throw new NotFoundException(`usuario con id ${id} no encontrado`)
    }
    await this.userRepository.remove(user);
    return `el usuario con id ${id} fue eliminado exitosamente`
  }
  //solicitud GET con QUERY PARAMS Y PAGINACION
  async getUserbyQueries(page: number=1, limit: number=5) {
    const initialIndex = (page - 1) * limit;
    const lastIndex = initialIndex + limit;
    const users= await this.userRepository.find();

    return users.slice(initialIndex, lastIndex);
  }
}
