import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {
    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnElement = await repo.getByIdAsync(id);
        return returnElement;
    }
    
    createAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const returnElement = await repo.createAsync(entity);
        return returnElement;
    }

    updateAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const returnElement = await repo.updateAsync(entity);
        return returnElement;
    }

    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnElement = await repo.deleteByIdAsync(id);
        return returnElement;
    }
}