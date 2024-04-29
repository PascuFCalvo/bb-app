import { Sequelize } from "sequelize";


const sequelize = new Sequelize("bb", "root", "karanas3689", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida exitosamente.');
    sequelize.sync({ force: true })
      .then(() => {
        console.log('La base de datos y los modelos están sincronizados y las tablas fueron recreadas.');
      });
  })
  .catch(error => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

export default sequelize;