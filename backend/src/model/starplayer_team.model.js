import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class StarplayerTeam extends Model { }

StarplayerTeam.init(
    {

        starplayerid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'starplayers',
                key: 'starplayerid'
            }
        },

        teamid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'teams',
                key: 'teamid'
            }

        },


    },
    {
        sequelize,
        modelName: "starplayer_team"
    }
);




export default StarplayerTeam;
