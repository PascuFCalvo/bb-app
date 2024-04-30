import User from './src/model/user.model.js';
import Team from './src/model/team.model.js';
import Player from './src/model/player.model.js';
import Starplayer from './src/model/starplayers.model.js';
import Posicional from './src/model/posicionales.model.js';

const createAssociations = () => {

    User.hasOne(Team, { foreignKey: 'userid' }); // Indica que User tiene un Team asociado
    Team.belongsTo(User, { foreignKey: 'userid' });

    Team.hasMany(Player, { foreignKey: 'teamid' });
    Player.belongsTo(Team, { foreignKey: 'teamid' });

    Team.hasMany(Starplayer, { foreignKey: 'teamid' });
    Starplayer.belongsTo(Team, { foreignKey: 'teamid' });

    Team.hasMany(Posicional, { foreignKey: 'teamid' });
    Posicional.belongsTo(Team, { foreignKey: 'teamid' });


};

export default createAssociations;
