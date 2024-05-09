import UserRepository from '../repositories/user-repository.js';

export default class UserService {
    getAllAsync = async () => {
        const repo = new UserRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
}