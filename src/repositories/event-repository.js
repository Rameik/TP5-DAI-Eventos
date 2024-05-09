import config from './../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool } = pkg;

export default class EventRepository {
    getAllAsync = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM events E INNER JOIN event_locations EL on E.id_event_location = EL.id INNER JOIN locations L on EL.id_location = L.id`;
            const result = await client.query(sql);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getEventByName = async (name) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM events where name like $1`;
            const values = [name];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getEventByCategory = async (category) => { //falta seguir
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM events as E INNER JOIN where name like $1`;
            const values = [category];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
}
