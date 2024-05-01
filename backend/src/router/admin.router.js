import express from 'express';
import Starplayer from '../model/starplayers.model.js';
import Posicional from '../model/posicionales.model.js';
import Habilidad from '../model/habilidades.model.js';

const router = express.Router();


//añadir un starplayer

router.post('/starplayers', async (req, res) => {
    try {
        const dataStarplayer = req.body;
        console.log(dataStarplayer);
        await Starplayer.create({
            starplayername: dataStarplayer.starplayername,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Starplayer agregado correctamente",
        });
    } catch (error) {
        console.error('Error al agregar el starplayer:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al agregar el starplayer",
            details: error.message
        });
    }
});

//añadir un posicional

router.post('/posicionales', async (req, res) => {
    try {
        const dataPosicional = req.body;

        await Posicional.create({
            posicionalteam: dataPosicional.posicionalteam,
            posicionalname: dataPosicional.posicionalname,
            posicionalmin: dataPosicional.posicionalmin,
            posicionalmax: dataPosicional.posicionalmax,
            posicionalcost: dataPosicional.posicionalcost,
            posicionalma: dataPosicional.posicionalma,
            posicionalst: dataPosicional.posicionalst,
            posicionalag: dataPosicional.posicionalag,
            posicionalpa: dataPosicional.posicionalpa,
            posicionalav: dataPosicional.posicionalav,
            posicionalskills: dataPosicional.posicionalskills,
            posicionalPrimary: dataPosicional.posicionalPrimary,
            posicionalAss: dataPosicional.posicionalAss,

        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "posicional agregado correctamente",
        });
    } catch (error) {
        console.error('Error al agregar el posicional:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al agregar el posicional",
            details: error.message
        });
    }
});

// añadir una habilidad

router.post('/habilidades', async (req, res) => {
    try {
        const dataHabilidad = req.body;

        await Habilidad.create({
            habilidadname: dataHabilidad.habilidadname,
            habilidadtipo: dataHabilidad.habilidadtipo,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "habilidad agregada correctamente",
        });
    } catch (error) {
        console.error('Error al agregar la habilidad:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al agregar la habilidad",
            details: error.message
        });
    }
});

export default router;


