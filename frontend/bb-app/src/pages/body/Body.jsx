import { Routes, Route } from "react-router-dom";
import FormRegister from "../../components/formRegister/formRegister.jsx";
import Menu from "../menu/Menu";
import LoginForm from "../../components/formLogin/FormLogin.jsx";
import MainCoachView from "../mainCoachView/mainCoachView";
import MainComisarienView from "../mainComisarienView/mainComisarienView";
import CoachTeamView from "../coachTeamView/coachTeamView";
import PlayersView from "../playersView/playersView";
import TeamsView from "../teamsView/teamsView";

const body = () => {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/mainCoachView" element={<MainCoachView />} />
            <Route path="/mainComisarienView" element={<MainComisarienView />} />
            <Route path="/coachTeamView" element={<CoachTeamView />} />
            <Route path="/tablePlayers" element={<PlayersView />} />
            <Route path="/tableTeams" element={<TeamsView />} />





        </Routes>
    );
}

export default body;