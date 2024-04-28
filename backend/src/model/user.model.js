import { Sequelize } from "sequelize";
import { Model } from "sequelize";
import { DataTypes } from "sequelize";

const sequelize = new Sequelize("bb", "root", "karanas3689", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "user"
    }
);

console.log(User === sequelize.models.user);

export default User;

// testear que la bbdd conecta

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.error("Unable to connect to the database:", error);
//     }
// }

// testConnection();

