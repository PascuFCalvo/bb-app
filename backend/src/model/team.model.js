import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class Team extends Model { }

Team.init(
    {
        teamid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        userid: {
            type: DataTypes.UUID,
            allowNull: false,
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
