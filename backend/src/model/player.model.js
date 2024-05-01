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

        posicionalid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'posicionals',
                key: 'posicionalid'
            }
        },

        habilidadSubida1: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },

        habilidadSubida2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'habilidads',
                key: 'habilidadid'
            }
        },

        habilidadSubida3: {
            type: DataTypes.INTEGER,
            allowNull: true,

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
