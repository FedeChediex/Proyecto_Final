import { Router } from 'express';
import { UserService } from '../services/userService.js';

const router = Router()
const userService = new UserService()

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    const user = await userService.GetUser();

    return res.status(200).json(user);
});

router.get('/:id', async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const user = await userService.GetUserById(id)
    return res.status(200).json(user)
})

router.post('', async (req, res) => {
    console.log('Post')
    const user = await userService.AddUser(req.body)
    return res.status(200).json(user)
})

router.delete('/:id', async (req, res) => {
    console.log('Delete')
    const user = await userService.DeleteUser(req.params.id)
    return res.status(200).json(user)
})

router.put('/:id', async (req, res) => {
    console.log('Put')
    const user = userService.UpdateUser(req.params.id, req.body)
    return res.status(200).json(user)
})
export default router
