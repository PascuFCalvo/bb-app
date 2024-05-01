import User from './src/model/user.model.js';
import Team from './src/model/team.model.js';
import Player from './src/model/player.model.js';
import Starplayer from './src/model/starplayers.model.js';
import StarplayerTeam from './src/model/starplayer_team.model.js';
import Posicional from './src/model/posicionales.model.js';
import PosicionalTeam from './src/model/posicional_team.model.js';
import HabilidadPlayer from './src/model/habilidad_player.model.js';

const createAssociations = () => {

    User.hasOne(Team, { foreignKey: 'userid' }); // Indica que User tiene un Team asociado
    Team.belongsTo(User, { foreignKey: 'userid' });

    Team.hasMany(Player, { foreignKey: 'teamid' });
    Player.belongsTo(Team, { foreignKey: 'teamid' });

    Team.hasMany(StarplayerTeam, { foreignKey: 'teamid' });
    StarplayerTeam.belongsTo(Starplayer, { foreignKey: 'starplayerid' });

    Starplayer.hasMany(StarplayerTeam, { foreignKey: 'starplayerid' });
    StarplayerTeam.belongsTo(Team, { foreignKey: 'teamid' });

    Team.hasMany(PosicionalTeam, { foreignKey: 'teamid' });
    PosicionalTeam.belongsTo(Team, { foreignKey: 'teamid' });

    Posicional.hasMany(PosicionalTeam, { foreignKey: 'posicionalid' });
    PosicionalTeam.belongsTo(Posicional, { foreignKey: 'posicionalid' });

    Player.belongsTo(Posicional, { foreignKey: 'posicionalid' });
    Posicional.hasMany(Player, { foreignKey: 'posicionalid' });

    Player.hasMany(HabilidadPlayer, { foreignKey: 'playerid' });
    HabilidadPlayer.belongsTo(Player, { foreignKey: 'playerid' });

    HabilidadPlayer.hasMany(Player, { foreignKey: 'habilidadid' });
    Player.belongsTo(HabilidadPlayer, { foreignKey: 'habilidadid' });

};

export default createAssociations;
