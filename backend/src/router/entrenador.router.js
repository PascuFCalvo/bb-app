import express from 'express';
import Team from '../model/team.model.js';
import Player from '../model/player.model.js';
import Starplayer from '../model/starplayers.model.js';
import User from '../model/user.model.js';
import Posicional from '../model/posicionales.model.js';
import Habilidad from '../model/habilidades.model.js';


const router = express.Router();

//ver todos los equipos

router.get('/equipos', async (req, res) => {
    const equipos = await Team.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: equipos
    });
});

//ver un equipo por id de usuario

router.get('/equipos/:userid', async (req, res) => {
    const userid = req.params.userid;
    const user = await User.findByPk(userid);
    if (user) {
        console.log(user);
        let userTeam = await Team.findOne({
            where: {
                userId: userid
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            body: userTeam
        });
    }
    else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "equipo no encontrado"
        });
    }

});

//ver todos los jugadores de un equipo por id de equipo

router.get('/jugadores/:teamid', async (req, res) => {
    const teamid = req.params.teamid;
    const team = await Team.findByPk(teamid);

    if (team) {
        const jugadores = await Player.findAll({
            where: {
                teamId: teamid
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            body: jugadores
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "jugadores no encontrados"
        });
    }
});

//obventer la id de una habilidad por su nombre

router.get('/habilidad/:habilidadname', async (req, res) => {
    const habilidadname = req.params.habilidadname;
    console.log(habilidadname);
    const habilidad = await Habilidad.findOne({
        where: {
            habilidadname: habilidadname
        }
    });
    if (habilidad) {
        res.status(200).json({
            ok: true,
            status: 200,
            body: habilidad
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Habilidad no encontrada"
        });
    }
});

//ver el posicional de un jugador por id de posicional

router.get('/posicional/:posicionalid', async (req, res) => {
    const posicionalid = req.params.posicionalid;
    const posicional = await Posicional.findByPk(posicionalid);
    if (posicional) {
        res.status(200).json({
            ok: true,
            status: 200,
            body: posicional
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Posicional no encontrado"
        });
    }
});

//traer todas las hablididades
router.get('/habilidades', async (req, res) => {
    const habilidades = await Habilidad.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: habilidades
    });
});

//ver el nombre de una habilidad por id de habilidad

router.get('/habilidad/:habilidadid', async (req, res) => {
    console.log("ID solicitado:", req.params.habilidadid);
    const habilidadid = req.params.habilidadid;
    const habilidad = await Habilidad.findByPk(habilidadid);
    if (habilidad) {
        console.log("Habilidad encontrada:", habilidad);
        res.status(200).json({
            ok: true,
            status: 200,
            body: habilidad
        });
    } else {
        console.log("No se encontró la habilidad con ID:", habilidadid);
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Habilidad no encontrada"
        });
    }
});

//ver un jugador por id

router.get('/jugadores/:id', async (req, res) => {
    const id = req.params.id;
    const jugador = await Player.findByPk(id);
    if (jugador) {
        res.status(200).json({
            ok: true,
            status: 200,
            body: jugador
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Jugador no encontrado"
        });
    }
});

//ver todos los starplayers

router.get('/starplayers', async (req, res) => {
    const starplayers = await Starplayer.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: starplayers
    });
});

//ver un starplayer por id

router.get('/starplayers/:id', async (req, res) => {
    const id = req.params.id;
    const starplayer = await Starplayer.findByPk(id);
    if (starplayer) {
        res.status(200).json({
            ok: true,
            status: 200,
            body: starplayer
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Starplayer no encontrado"
        });
    }
});

//ver todos los jugadores cambiando las ids por los nombres de las habilidades y posicionales

router.get('/jugadores', async (req, res) => {
    const jugadores = await Player.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: jugadores
    });
});

//ver el equipo al que pertence un jugador por su teamid

router.get('/jugadores/equipo/:teamid', async (req, res) => {
    const teamid = req.params.teamid;
    const jugador = await Team.findOne({
        where: {
            teamId: teamid
        }
    });
    if (jugador) {
        res.status(200).json({
            ok: true,
            status: 200,
            body: jugador
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Jugador no encontrado"
        });
    }
});

// ver el nombre del entrenador de un equipo por su userid

router.get('/entrenador/equipo/:userid', async (req, res) => {
    const userid = req.params.userid;
    const entrenador = await User.findByPk(userid);
    if (entrenador) {
        res.status(200).json({
            ok: true,
            status: 200,
            body: entrenador
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Entrenador no encontrado"
        });
    }
});

//editar un jugador y guardarlo en la base de datos

router.put('/jugadores/:id', async (req, res) => {
    const id = req.params.id;
    const jugador = await Player.findByPk(id);
    if (jugador) {
        const { playername, playerma, playerst, playerag, playerav, playervalue, playerpa, dorsal, habilidadSubida1, habilidadSubida2, habilidadSubida3 } = req.body;
        jugador.dorsal = dorsal;
        jugador.habilidadSubida1 = habilidadSubida1;
        jugador.habilidadSubida2 = habilidadSubida2;
        jugador.habilidadSubida3 = habilidadSubida3;
        jugador.playername = playername;
        jugador.playerpa = playerpa;
        jugador.playerma = playerma;
        jugador.playerst = playerst;
        jugador.playerag = playerag;
        jugador.playerav = playerav;
        jugador.playervalue = playervalue;
        jugador.updated = true
        await jugador.save();
        res.status(200).json({
            ok: true,
            status: 200,
            body: jugador
        });
    } else {
        res.status(404).json({
            ok: false,
            status: 404,
            message: "Jugador no encontrado"
        });
    }
});



export default router;


