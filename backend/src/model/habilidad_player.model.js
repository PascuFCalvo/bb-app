import { INTEGER, Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class HabilidadPlayer extends Model { }

HabilidadPlayer.init(
    {

        habilidadid: {
            type: DataTypes.INTEGER,
            allowNull: null,
            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },

        playerid: {
            type: DataTypes.UUID,
            allowNull: null,
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
