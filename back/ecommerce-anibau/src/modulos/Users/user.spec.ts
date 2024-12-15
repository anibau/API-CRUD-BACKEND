import { Test, TestingModule } from "@nestjs/testing";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { Users } from "./user.entity";
import { CreateUserDto } from "./CreateUserDto";

describe('pruebas unitarias UserService', ()=>{
    let userService:UsersService;
    let mockUser:Users;
    let mockUserRepository:Partial<UsersRepository>;
    let dataUser:CreateUserDto;
    let module: TestingModule;
    

    beforeEach(async()=>{
        mockUser={
            id: '11hj',
            name: 'sample1',
            address: 'calle sample 1',
            email: 'sample@mail.com',
            password: 'Sampleeee1',
            phone: 12346895,
            country: 'peruana',
            city: 'lima',
            isAdmin: false,
            orders: []
        }


         mockUserRepository={
            // getUser:():Promise<Users[]>=>Promise.resolve([mockUser]),
            getUser: jest.fn().mockImplementation(()=>Promise.resolve([mockUser])),
            getUserbyId: jest.fn((id:string)=>{
                if(id==='11hj'){return Promise.resolve({
                    id: '11hj',
                    name: 'sample1',
                    address: 'calle sample 1',
                    email: 'sample@mail.com',
                    phone: 12346895,
                    country: 'peruana',
                    city: 'lima',
                    orders: []
                })} else{ return Promise.reject(new Error(`el usuario con id ${id} no existe`))}}
            ),
            deleteUser: jest.fn((id:string)=> id==='11hj'? Promise.resolve(`el usuario con id ${id} fue eliminado exitosamente`): Promise.reject(new Error(`usuario con id ${id} no encontrado`))),
           
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            updateUser: jest.fn((id:string, dataUser: CreateUserDto)=> id==='11hj'? Promise.resolve(`usuario con id ${id} actualizado correctamente`): Promise.reject(new Error(`usuario con id ${id} no encontrado`)))
        }

        module= await Test.createTestingModule({
            providers: [UsersService, {provide:UsersRepository, useValue:mockUserRepository}]
        }).compile();
        userService= module.get<UsersService>(UsersService);
    });
    afterAll(async()=>{
        await module.close()
    })

    it('create an instance', ()=>{
        expect(userService).toBeDefined()
    })
    it('getUser() retorna array', async()=>{
        const users=  await userService.getUsers();
        expect(users).toBeInstanceOf(Array)
        expect(users).toHaveLength(1)
    })
    it('getUser() retorna error al no encontrar usuarios', async()=>{
        (mockUserRepository.getUser as jest.Mock).mockImplementationOnce(()=>Promise.reject(new Error('no se encontraron usuarios')));
        await expect(userService.getUsers()).rejects.toThrow('no se encontraron usuarios')
    })
    it('getUserbyId() retorna un user', async()=>{
        const user= await userService.getUserbyId('11hj');
        expect(user).toBeDefined()
        expect(user).not.toHaveProperty('password')
        expect(user).not.toHaveProperty('isAdmin')
        expect(user).toBeInstanceOf(Object)
        expect(user.id).toBe('11hj')
        expect(user.name).toBe('sample1')
    })
    it('getUserbyId() retorna un ERROR AL no encontrar user', async()=>{
        await expect(userService.getUserbyId('11hkkkk')).rejects.toThrow('el usuario con id 11hkkkk no existe');
    })
    it('deleteUser()retorna error al no encontrar usuario', async()=>{
        const userDelete= await userService.deleteUser('11hj');
        expect(userDelete).toBe('el usuario con id 11hj fue eliminado exitosamente')
    })
    it('deleteUser() retorna error al no encontrar usuario', async()=>{
        await expect(userService.deleteUser('11kkk')).rejects.toThrow('usuario con id 11kkk no encontrado')
    })
    it('updateUser()retorna error al no encontrar usuario', async()=>{
        dataUser={
            name: 'update 1',
            address: 'calle update 1',
            password: 'update123',
            confirmPassword: 'update123',
            email: 'update@mail.com',
            phone: 12346788,
            isAdmin:false,
            country: 'peruana',
            city: 'lima',
        }
        const userUpdate= await userService.updateUser('11hj', dataUser);
        expect(userUpdate).toBe('usuario con id 11hj actualizado correctamente')
    })
    it('updateUser() retorna error al no encontrar usuario', async()=>{
        await expect(userService.updateUser('11kkk', dataUser)).rejects.toThrow('usuario con id 11kkk no encontrado')
    })
})
