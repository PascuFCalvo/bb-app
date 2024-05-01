import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Team extends Model { }

Team.init(
    {
        teamid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        userid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'userid'
            }

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


console.log(Team === sequelize.models.team);

export default Team;
