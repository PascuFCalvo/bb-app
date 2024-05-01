import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Posicional extends Model { }

Posicional.init(
    {
        posicionalid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        posicionalteam: {
            type: DataTypes.STRING,
            allowNull: false
        },

        posicionalname: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },

        posicionalmin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        posicionalmax: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        posicionalcost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        posicionalma: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


        posicionalst: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        posicionalag: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        posicionalpa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        posicionalav: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        posicionalskills: {
            type: DataTypes.STRING,
            allowNull: false
        },

        posicionalPrimary: {
            type: DataTypes.STRING,
            allowNull: false
        },

        posicionalAss: {
            type: DataTypes.STRING,
            allowNull: false
        },





    },
    {
        sequelize,
        modelName: "posicional"
    }
);


console.log(Posicional === sequelize.models.posicional);

export default Posicional;
