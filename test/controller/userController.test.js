// Blibliotecas
const request = require('supertest');
const sinon = require('sinon');
const mocha = require('mocha');
// Aplicação - importando o app da raiz do projeto
const app = require('../../app');
const userService = require('../../service/userService');

let expect;
before(async () => {
  // Importa chai dinamicamente por ser ESM
  const chai = await import('chai');
  expect = chai.expect;
});

// Testes
describe('User Controller', () => {
    describe('POST /register', () => {
        it('Deve registrar um novo usuário', async () => {
            const resposta = await request(app)
                .post('/register')
                .send({ username: 'novoUsuario', password: 'senha123' });
            expect(resposta.status).to.equal(201);
        });

        it('Deve registrar um novo usuário - Mock', async () => {

            const mock = sinon.stub(userService, 'registerUser').returns({ user: { username: 'novoUsuario', password: 'senha123' } });
            const resposta = await request(app)
                .post('/register')
                .send({ username: 'novoUsuario', password: 'senha123' });
            expect(resposta.status).to.equal(201);
            // Verifica se o stub (mock) foi chamado uma vez
            expect(mock.calledOnce).to.be.true; 
        });

        it('Deve tentar registrar um usuário existente', async () => {
            // Testes sem mock
            await request(app)
                .post('/register')
                .send({ username: 'usuarioExistente', password: 'senha123' });
            const resposta = await request(app)
                .post('/register')
                .send({ username: 'usuarioExistente', password: 'senha123' });
            expect(resposta.status).to.equal(409);
            expect(resposta.body).to.have.property('error', 'Usuário já existe.');
        });

        it('Deve tentar registrar um usuário existente - mock', async () => {
            // Testes com mock
            // Cria um mock que simula a situação de "usuário já existe"
            const mock = sinon.stub(userService, 'registerUser').returns({ error: 'Usuário já existe.' });

            const resposta = await request(app)
                .post('/register')
                .send({ username: 'mockUser', password: 'senha123' });

            // Verifica se o status da resposta é 409 (Conflito)
            expect(resposta.status).to.equal(409);
            // Verifica se a resposta possui a propriedade de erro correta
            expect(resposta.body).to.have.property('error', 'Usuário já existe.');
            // Verifica se o stub (mock) foi chamado uma vez
            expect(mock.calledOnce).to.be.true; 
        
        });
    });
});