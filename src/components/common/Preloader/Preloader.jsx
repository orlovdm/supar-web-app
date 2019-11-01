import React from "react";
import preloader from "../../../assets/Images/preloader.svg";
import style from "./Preloader.module.css"

const Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} alt={'Loading...'}/>
        </div>
    )
}

export default Preloader;