import express from 'express';
import Team from '../model/team.model.js';

import addStarPlayer from '../controller/addStarPlayer.js';
import addPosicional from '../controller/addPosicional.js';
import addHabilidad from '../controller/addHabilidad.js';

const router = express.Router();

router.post('/starplayers', addStarPlayer);
router.post('/posicionales', addPosicional);
router.post('/habilidades', addHabilidad)

//traer todos los equipos
router.get('/equipos', async (req, res) => {
    const equipos = await Team.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: equipos
    });
});

export default router;


