import React from "react";
import "./leftSideBar.css";
import Logo from "../../assets/images/petreobowl.png";
import { useNavigate } from "react-router-dom";

function LeftSideBar() {

    const navigate = useNavigate();
    return (


        <div className="leftSideBar">
            <div className="leftSideBarLogo">
                <img className="leftSideBarLogoImage" src={Logo} alt="logo" />
            </div>
            <div className="leftSideBarMenu">
                <ul className="leftSideBarMenuList">
                    <button className="buttonNavBar">inicio</button>
                    <button className="buttonNavBar">equipos</button>
                    <button className="buttonNavBar" onClick={() => navigate("/tablePlayers")}>jugadores</button>
                    <button className="buttonNavBar">partidos</button>
                    <button className="buttonNavBar">estadisticas</button>
                </ul>
            </div>
        </div>

    );
}

export default LeftSideBar;
