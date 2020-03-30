const sha1 = require('sha1')

const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT id, email FROM tb_user WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os usuarios', reject)
                        return false
                    }

                    resolve({ users: result })
                })
            })
        },
        save: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('INSERT INTO tb_user (email, password) VALUES (?, ?)', [email, sha1(password)], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o usuario ${email}`, reject)
                        return false
                    }

                    resolve({ user: { email: email, id: result.insertId } })
                })
            })
        },
        update: (id, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_user set password = ? WHERE id = ?', [sha1(password), id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o usuario id:${id}`, reject)
                        return false
                    }

                    resolve({ user: { id: id } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_user set active = 0 WHERE id = ?', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o usuario`, reject)
                        return false
                    }

                    resolve({ message: 'Usuario removido com sucesso' })
                })
            })
         },
    }
}

module.exports = users