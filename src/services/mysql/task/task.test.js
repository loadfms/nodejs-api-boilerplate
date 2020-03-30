/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const taskModule = require('./task')({ connection, errorHandler })

const create = () => taskModule.save('service-test')

beforeEach(() => {
    connection.query('TRUNCATE tb_task')
});

test('Criacao de servico', async () => {
    const result = await create()
    expect(result.task.name).toBe('service-test')
})

test('Atualizacao de servico', async () => {
    await create()
    const result = await taskModule.update(1, 'service-test-updated')
    expect(result.task.name).toBe('service-test-updated')
})

test('Exclusao de servico', async () => {
    await create()
    const result = await taskModule.del(1)
    expect(result.message).toBe('Categoria removida com sucesso')
})

test('Listagem de servico', async () => {
    await create()
    await create()
    const result = await taskModule.all()
    expect(result.tasks.length).toBe(2)
})

afterAll(async done => {
    connection.query('TRUNCATE tb_task')
    connection.end()
    done()
})