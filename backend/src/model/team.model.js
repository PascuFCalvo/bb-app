import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Team extends Model { }

Team.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        teamowner: {
            type: DataTypes.STRING,
            allowNull: false
        },

        teamname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamrace: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamvalue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    },
    {
        sequelize,
        modelName: "team"
    }
);

console.log(Team === sequelize.models.user);

export default Team;
