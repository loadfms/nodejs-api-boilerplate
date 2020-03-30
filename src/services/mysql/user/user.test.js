/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const userModule = require('./user')({ connection, errorHandler })

const create = () => userModule.save('teste@email.com', '123456')

beforeEach(() => {
    connection.query('TRUNCATE tb_user')
});

test('Criacao de usuario', async () => {
    const result = await create()
    expect(result.user.email).toBe('teste@email.com')
})

test('Atualizacao de usuario', async () => {
    await create()
    const result = await userModule.update(1, 'nova senha')
    expect(result.user.id).toBe(1)
})

test('Exclusao de usuario', async () => {
    await create()
    const result = await userModule.del(1)
    expect(result.message).toBe('Usuario removido com sucesso')
})

test('Listagem de usuario', async () => {
    await create()
    await create()
    const result = await userModule.all()
    expect(result.users.length).toBe(2)
})

afterAll(async done => {
    connection.query('TRUNCATE tb_user')
    connection.end()
    done()
})