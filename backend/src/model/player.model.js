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
            type: DataTypes.INTEGER,
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

        dorsal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        playervalue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        playerma: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        playerpa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        playerpa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        playerst: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        playerag: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        playerav: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        updated: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }





    },
    {
        sequelize,
        modelName: "player"
    }
);


console.log(Player === sequelize.models.user);

export default Player;
