import UserRepository from '../repositories/user-repository.js';

export default class UserService {
    postRegisterUser = async (firstName, lastName, user, pass) => {
        const repo = new UserRepository();
        const returnArray = await repo.postRegisterUser(firstName, lastName, user, pass);
        return returnArray;
    }
    postLoginUser = async (user, pass) => {
        const repo = new UserRepository();
        const returnArray = await repo.postLoginUser(user, pass);
        return returnArray;
    }
}