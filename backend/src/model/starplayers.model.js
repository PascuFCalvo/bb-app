import { INTEGER, Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Starplayer extends Model { }

Starplayer.init(
    {
        starplayerid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        starplayername: {
            type: DataTypes.STRING,
            allowNull: false
        },



    },
    {
        sequelize,
        modelName: "starplayer"
    }
);


console.log(Starplayer === sequelize.models.starplayer);

export default Starplayer;