import express from 'express';
import User from '../model/user.model.js';

const router = express.Router();

//traer todos los usuarios
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
    try {
        const dataUsers = req.body;

        await User.sync();

        //comprobar que no exista un usuario con ese mail

        const userComprobacion = await User.findOne({
            where: {
                email: dataUsers.email
            }
        });

        if (userComprobacion) {
            res.status(400).json({
                ok: false,
                status: 400,
                message: "El email ya está en uso"
            });
            alert("El email ya está en uso");
            return;
        }

        await User.create({
            username: dataUsers.username,
            email: dataUsers.email,
            password: dataUsers.password,
            role: dataUsers.role
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
router.put('/:user_id', async (req, res) => {
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
router.delete('/:user_id', async (req, res) => {
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

//login de un usuario

router.post('/login', async (req, res) => {
    const dataUser = req.body;
    console.log("data", dataUser);
    const user = await User.findOne({
        where: {
            email: dataUser.email,
            password: dataUser.password

        }
    });
    if (user) {
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Usuario logueado correctamente",
            user: {
                userid: user.userid,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(401).json({
            ok: false,
            status: 401,
            message: "Usuario o contraseña incorrectos"
        });
    }
}
);

export default router;
