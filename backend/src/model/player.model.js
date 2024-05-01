import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Player extends Model { }

Player.init(
    {
        playerid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        playername: {
            type: DataTypes.STRING,
            allowNull: false
        },

        posicionalid: {
            type: DataTypes.STRING,
            references: {
                model: 'posicionals',
                key: 'posicionalid'
            }
        },

        habilidadSubida1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },

        habilidadSubida2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },

        habilidadSubida3: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },



    },
    {
        sequelize,
        modelName: "player"
    }
);


console.log(Player === sequelize.models.user);

export default Player;
