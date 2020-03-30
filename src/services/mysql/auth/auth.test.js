/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const userModule = require('./../user/user')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })

const create = () => userModule.save('teste@email.com', '123456')

beforeEach(() => {
    connection.query('TRUNCATE tb_user')
});

test('Login de usuario', async () => {
    await create()
    const result = await authModule.authenticate('teste@email.com', '123456')

    expect(result.token.length).toBeGreaterThan(0)
})

test('Erro de login de usuario', async () => {
    await create()
    try{
        const promise = await authModule.authenticate('teste@email.com', '1234567')
    } catch(err){
        expect(err.error).toBe('Falha ao localizar o usuario')
    }
})

afterAll(async done => {
    connection.query('TRUNCATE tb_user')
    connection.end()
    done()
})