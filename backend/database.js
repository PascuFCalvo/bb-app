import { Sequelize } from "sequelize";


const sequelize = new Sequelize("bb", "root", "karanas3689", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

export default sequelize;