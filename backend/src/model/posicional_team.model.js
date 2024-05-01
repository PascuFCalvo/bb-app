import { INTEGER, Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

class PosicionalTeam extends Model { }

PosicionalTeam.init(
    {

        posicionalid: {
            type: DataTypes.UUID,
            allowNull: null,
            references: {
                model: 'posicionals',
                key: 'posicionalid'
            }
        },

        teamid: {
            type: DataTypes.UUID,
            allowNull: null,
            references: {
                model: 'teams',
                key: 'teamid'
            }

        },


    },
    {
        sequelize,
        modelName: "posicional_team"
    }
);




export default PosicionalTeam;
