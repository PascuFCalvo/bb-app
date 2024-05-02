import Starplayer from '../model/starplayers.model.js'; // Import the Starplayer model

const addStarPlayer = async (req, res) => { // Add the missing arrow function syntax and a colon after the function name
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
}

export default addStarPlayer;