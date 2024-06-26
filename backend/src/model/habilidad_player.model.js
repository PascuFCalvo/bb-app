import {  Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class HabilidadPlayer extends Model { }

HabilidadPlayer.init(
    {

        habilidadid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },

        playerid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'players',
                key: 'playerid'
            }

        },


    },
    {
        sequelize,
        modelName: "habilidad_player"
    }
);




export default HabilidadPlayer;
