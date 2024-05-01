import { Routes, Route, Navigate } from "react-router-dom";
import FormRegister from "../../components/formRegister/formRegister.jsx";
import Menu from "../menu/Menu";
import LoginForm from "../../components/formLogin/FormLogin.jsx";
import MainCoachView from "../mainCoachView/mainCoachView";
import MainComisarienView from "../mainComisarienView/mainComisarienView";

const body = () => {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/mainCoachView" element={<MainCoachView />} />
            <Route path="/mainComisarienView" element={<MainComisarienView />} />


        </Routes>
    );
}

export default body;