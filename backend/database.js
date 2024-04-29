import { Sequelize } from "sequelize";


const sequelize = new Sequelize("railway", "root", "IXAwjlCbHCkryULQzETRTaVZXduHudNo", {
  host: "roundhouse.proxy.rlwy.net",
  dialect: "mysql",
  port: 39435
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida exitosamente.');
    sequelize.sync({ force: false })
      .then(() => {
        console.log('La base de datos y los modelos están sincronizados y las tablas fueron recreadas.');
      });
  })
  .catch(error => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

export default sequelize;