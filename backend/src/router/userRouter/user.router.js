import express from 'express';
import User from '../../model/user.model.js';

const router = express.Router();

//traer todos los usuarios
router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: users
    });
});

//traer un usuario
router.get('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const user = await User.findByPk(userId);
    res.status(200).json({
        ok: true,
        status: 200,
        body: user
    });


});

//crear un usuario
router.post('/users', async (req, res) => {
    try {
        const dataUsers = req.body;
        console.log(dataUsers);
        await User.sync();
        await User.create({
            username: dataUsers.username,
            email: dataUsers.email,
            password: dataUsers.password
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Usuario creado correctamente",
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear el usuario",
            details: error.message
        });
    }
});



//actualizar un usuario
router.put('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const user = req.body;
    const userToUpdate = await User.update({
        username: user.username,
        email: user.email,
        password: user.password
    }, {
        where: {
            id: userId
        }
    });

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Usuario actualizado correctamente"
    });
});

//eliminar un usuario
router.delete('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const user = await User.destroy({
        where: {
            id: userId
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Usuario eliminado correctamente"
    });
});

export default router;
