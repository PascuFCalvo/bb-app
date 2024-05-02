import User from './src/model/user.model.js';
import Team from './src/model/team.model.js';
import Player from './src/model/player.model.js';
import Starplayer from './src/model/starplayers.model.js';
import StarplayerTeam from './src/model/starplayer_team.model.js';
import Posicional from './src/model/posicionales.model.js';
import PosicionalTeam from './src/model/posicional_team.model.js';
import HabilidadPlayer from './src/model/habilidad_player.model.js';
import Habilidad from './src/model/habilidades.model.js';

const createAssociations = () => {
    // User - Team
    User.hasOne(Team, { foreignKey: 'userid' });
    Team.belongsTo(User, { foreignKey: 'userid' });
    // Team - Player
    Team.hasMany(Player, { foreignKey: 'teamid' });
    Player.belongsTo(Team, { foreignKey: 'teamid' });
    // Habilidad - HabilidadPlayer
    Habilidad.hasMany(HabilidadPlayer, { foreignKey: 'habilidadid' });
    HabilidadPlayer.belongsTo(Habilidad, { foreignKey: 'habilidadid' });
    // Player - HabilidadPlayer
    Player.hasMany(HabilidadPlayer, { foreignKey: 'playerid' });
    HabilidadPlayer.belongsTo(Player, { foreignKey: 'playerid' });
    // Posicional - Player
    Posicional.hasMany(Player, { foreignKey: 'posicionalid' });
    Player.belongsTo(Posicional, { foreignKey: 'posicionalid' });
    // Starplayer - StarplayerTeam
    Starplayer.hasMany(StarplayerTeam, { foreignKey: 'starplayerid' });
    StarplayerTeam.belongsTo(Starplayer, { foreignKey: 'starplayerid' });
    // Team - StarplayerTeam
    Team.hasMany(StarplayerTeam, { foreignKey: 'teamid' });
    StarplayerTeam.belongsTo(Team, { foreignKey: 'teamid' });
    // Posicional - PosicionalTeam
    Posicional.hasMany(PosicionalTeam, { foreignKey: 'posicionalid' });
    PosicionalTeam.belongsTo(Posicional, { foreignKey: 'posicionalid' });
    // Team - PosicionalTeam
    Team.hasMany(PosicionalTeam, { foreignKey: 'teamid' });
    PosicionalTeam.belongsTo(Team, { foreignKey: 'teamid' });




};

export default createAssociations;

