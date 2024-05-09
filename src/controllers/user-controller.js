import {Router} from 'express';
import UserService from './../services/user-service.js'

export const router = Router();
const svc = new UserService(); 