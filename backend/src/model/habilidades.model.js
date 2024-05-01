import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Habilidad extends Model { }

Habilidad.init(
    {
        habilidadid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        
        habilidadname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        habilidadtipo: {
            type: DataTypes.STRING,
            allowNull: false
        },



    },
    {
        sequelize,
        modelName: "habilidad"
    }
);




export default Habilidad;
