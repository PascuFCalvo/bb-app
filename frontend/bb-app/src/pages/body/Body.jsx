import { Routes, Route, Navigate } from "react-router-dom";
import FormRegister from "../../components/formRegister/FormRegister";
import Menu from "../menu/Menu";
import LoginForm from "../../components/formLogin/FormLogin";
import MainView from "../mainView/mainView";

const body = () => {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/mainView" element={<MainView />} />
        </Routes>
    );
}

export default body;