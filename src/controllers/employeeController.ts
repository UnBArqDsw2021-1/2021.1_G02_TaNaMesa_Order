import database from "../db";

const create = async (request, response) => {
    try {
        const fieldsToValidate = ['cpf', 'name', 'occupation']
        for (let field of fieldsToValidate) {
            if (!request.body.employee[field]) {
                return response.status(400).json({
                    success: false,
                    message: `O campo ${field} é obrigatório.`
                });
            }
        }
        return response.json({
            success: true,
            employee: await database.employee.create(request.body.employee)
        });
    } catch (error) {
        console.log('ERROR --> ', error);
        return response.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
            error: error.toString()
        });
    }
}

const getAll = async (request, response) => {
    try {
        return response.json({
            success: true,
            employees: await database.employee.findAll()
        });
    } catch (error) {
        console.log('ERROR ---> ', error);
        return response.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
            error: error.toString()
        });
    }
}

const getOne = async (request, response) => {
    try {
        return response.json({
            success: true,
            employee: await database.employee.findByPk(request.params.cpf)
        });
    } catch (error) {
        console.log('ERROR ---> ', error);
        return response.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
            error: error.toString()
        });
    }
}

const edit = async (request, response) => {
    try {
        await database.employee.update(request.body.employee, { where: { cpf: request.params.cpf } })
        return response.json({
            success: true
        });
    } catch (error) {
        console.log('ERROR ---> ', error);
        return response.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
            error: error.toString()
        });
    }
}

const destroy = async (request, response) => {
    try {
        await database.employee.destroy({ where: { cpf: request.params.cpf } })
        return response.json({
            success: true
        });
    } catch (error) {
        console.log('ERROR ---> ', error);
        return response.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
            error: error.toString()
        });
    }
}

export default { create, getAll, getOne, edit, destroy }