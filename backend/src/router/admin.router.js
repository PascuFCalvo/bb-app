import express from 'express';

import addStarPlayer from '../controller/addStarPlayer.js';
import addPosicional from '../controller/addPosicional.js';
import addHabilidad from '../controller/addHabilidad.js';

const router = express.Router();

router.post('/starplayers', addStarPlayer);
router.post('/posicionales', addPosicional);
router.post('/habilidades', addHabilidad) 

export default router;


