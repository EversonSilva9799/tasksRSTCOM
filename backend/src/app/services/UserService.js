const User = require('../models/User');

class UserService {

    checkRequiredParams(fields, requiredFields) {
        let missingParams = [];
        for (const field of requiredFields) {
            if(!fields[field]) {
                const error = `O parâmetro '${field}' é obrigatório`;
                missingParams.push(error);
            }
        }

        if (missingParams.length === 0) {
            missingParams = null;
        }

        return missingParams;
    }

    async getUsers() {
        const users = await User.find().select([ '-password' ]);
        return users;
    }


    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async findById(id) {
        const user = await User.findOne({ _id: id });
        return user;
    }

    async create({ name, email, password }) {
        const user = await User.create({ name, email, password });
        return user;
    }

    async create({ id, name, email, password, picture = null }) {
        const user = await User.updateOne({_id: id},{ name, email, password, picture });
        return user;
    }

}

module.exports = new UserService();