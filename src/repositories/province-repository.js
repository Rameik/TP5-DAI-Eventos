import config from './../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool } = pkg;

export default class ProvinceRepository {
    getAllAsync = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getByIdAsync = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces WHERE id=$1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    createAsync = async (entity) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `INSERT INTO provinces(name, full_name, latitude, longitude, display_order) VALUES($1, $2, $3, $4, $5)`;
            const values = [entity.name, entity.fullName, entity.latitude, entity.longitude, entity.displayOrder];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    updateAsync = async (entity) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 where id = $6`;
            const values = [entity.name, entity.fullName, entity.latitude, entity.longitude, entity.displayOrder, entity.id];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    deleteByIdAsync = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE FROM provinces WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
}
