import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/modulos/Auth/auth.guard';
import { RolesGuard } from '../src/modulos/Auth/roles.guard';
// import { UsersRepository } from '../src/modulos/Users/users.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockAuthGuard:CanActivate;
  let mockRoleGuard:CanActivate;

  beforeEach(async () => {
    mockAuthGuard= {canActivate: jest.fn(()=>true)};
    mockRoleGuard= {
      canActivate: jest.fn((context)=>{
        const request= context.switchToHttp().getRequest();
        request.user= {id:'1', roles:['admin']};
        return true
      })
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideGuard(AuthGuard)
    .useValue(mockAuthGuard)
    .overrideGuard(RolesGuard)
    .useValue(mockRoleGuard)
    // .overrideProvider(UsersRepository)
    // .useValue({
    //   updateUser: jest.fn((id)=>`usuario con id ${id} actualizado correctamente`),
    //   deleteUser: jest.fn((id)=>`el usuario con id ${id} fue eliminado exitosamente`)
    // })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })
  afterAll(async()=>{
    await app.close()
    console.log('conexiones cerradas...')
  })

  it('GET/user retorne un array de usuarios y status 200', async() => {
    const req= await request(app.getHttpServer()).get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDFjZGFlNC0wMmRlLTRlODktYTdkMy1lMWVkOTQzY2Q2ZjkiLCJpZCI6IjJkMWNkYWU0LTAyZGUtNGU4OS1hN2QzLWUxZWQ5NDNjZDZmOSIsImVtYWlsIjoic2h1c2hpQG1haWwuY29tIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3MzQxNDUyMjksImV4cCI6MTczNDE0ODgyOX0.zbosOd8IZ_5TIdVBgH5HCDluq21XESWarPjUVXjf0qE')
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Array)
  })
  it('GET/user/:id retorne un objeto de usuarios y status 200', async() => {
    const req= await request(app.getHttpServer()).get('/users/2d1cdae4-02de-4e89-a7d3-e1ed943cd6f9 ')
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
  })
  it('GET/user/:id retorne un mensaje de error al no encontrar el usuario y status 404', async() => {
    const req= await request(app.getHttpServer()).get('/users/2d1cdae4-02de-4e89-a7d3-e1ed943cd6f5')
    expect(req.status).toBe(404)
    expect(req.body.message).toBe('el usuario con id 2d1cdae4-02de-4e89-a7d3-e1ed943cd6f5 no existe')
  })
  it('GET/user/:id retorne un mensaje de error al no encontrar UUID y status 400', async() => {
    const req= await request(app.getHttpServer()).get('/users/123')
    expect(req.status).toBe(400)
    expect(req.body.message).toBe('Validation failed (uuid is expected)')
  })
  it('GET/products retorne un array de products y status 200', async() => {
    const req= await request(app.getHttpServer()).get('/products')
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Array)
  })
  it('GET/products/:id retorne un objeto de usuarios y status 200', async() => {
    const req= await request(app.getHttpServer()).get('/products/0e9d5c39-a75b-4fa5-826a-35ac9af1555f')
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
    expect(req.body).toHaveProperty('category')
  })
  it('PUT/user/:id retorne un ERROR  por UUID y status 400', async()=>{
    const req= await request(app.getHttpServer()).put('/users/1')
    expect(req.status).toBe(400)
    expect(req.body.message).toBe('Validation failed (uuid is expected)')
  })
  it('DELETE/user/:id retorne un ERROR AL no encontrar id y status 404', async()=>{
    const id='2d1cdae4-02de-4e89-a7d3-e1ed943cd1f9'; //cambiar id
    const req= await request(app.getHttpServer()).delete(`/users/${id}`)
    expect(req.status).toBe(404)
    expect(req.body.message).toBe(`usuario con id ${id} no encontrado`)
  })
});
