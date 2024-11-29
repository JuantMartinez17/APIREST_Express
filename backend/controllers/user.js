import { UsersModel } from '../models/user.js';
import { validateUser, validatePartialUser } from '../schemas/users.js'
import p from 'picocolors';

export class UsersController{
    static async getAll(req, res) {
        try{
            const users = await UsersModel.getAll()
            if (!users || users.length === 0) {
                return res.status(404).json({ error: 'Users not found' });
            }
            res.status(200).json(users)
        }catch (error) {
            console.error(p.red(`Error fetching users: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const userId = Number(id);
          
            const { error, user } = await UsersModel.getById({ id: userId });
          
            if (error) {
            return res.status(error.code).json({ message: error.message });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(p.red(`Error fetching user: ${error.message}`));
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async create (req, res) {
        const validation = validateUser(req.body)
        if (!validation.success) {
            return res.status(400).json({ error: 'Invalid user data. Zod validation failed' })
        }
        try {
            const { error, user } = await UsersModel.create({ input: validation.data })
            if (error) {
                return res.status(error.code).json({ message: error.message })
            }
            res.status(201).json(user)
        } catch (error) {
            console.error(p.red(`Error creating user: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    static async update (req, res) {
        const validation = validatePartialUser(req.body)
        if (!validation) {
            return res.status(400).json({ error: 'Invalid user update data' })
        }
        try { 
            const { id } = req.params
            const { error } = await UsersModel.update({ id, input: validation.data })
            if (error) {
                return res.status(500).json({ message: error.message })
            }
            const user = await UsersModel.getById({ id })
            res.status(200).json(user)
        }catch (error) {
            console.error(p.red(`Error updating user: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    static async delete (req, res) {
        try {
            const { id } = req.params
            const userId = Number(id)
            const deleted = await MovieModel.delete(id)
            if (!deleted) {
                return res.stauts(404).json({ error: 'User not found' })
            }
            res.status(200).json({ message: 'User deleted succesfully' })
        }catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}