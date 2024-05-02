import Habilidad from "../model/habilidades.model.js";

const addHabilidad = async (req, res) => {
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
}

export default addHabilidad;