import Posicional from '../model/posicionales.model.js'

const addPosicional = async (req, res) => {
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
}

export default addPosicional;
