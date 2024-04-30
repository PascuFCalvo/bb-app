import { INTEGER, Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Starplayer extends Model { }

Starplayer.init(
    {
        starplayerid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        starplayername: {
            type: DataTypes.STRING,
            allowNull: false
        },

        teamid: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'teams',
                key: 'teamid'
            }

        },

    },
    {
        sequelize,
        modelName: "starplayer"
    }
);


console.log(Starplayer === sequelize.models.starplayer);

export default Starplayer;
