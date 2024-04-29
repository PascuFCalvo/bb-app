import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Player extends Model { }

Player.init(
    {
        playerid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        playername: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        sequelize,
        modelName: "player"
    }
);


console.log(Player === sequelize.models.user);

export default Player;
