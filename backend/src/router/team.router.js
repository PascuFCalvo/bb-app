import express from 'express';
import Team from '../model/team.model.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const dataTeams = req.body;
        console.log(dataTeams);
        await Team.sync();
        await Team.create({
            teamowner: dataTeams.teamowner,
            teamname: dataTeams.teamname,
            teamrace: dataTeams.teamrace,
            teamvalue: dataTeams.teamvalue
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Equipo crado correctamente",
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear el equipo",
            details: error.message
        });
    }
});
export default router;
