import React from "react";
import "./NavigationBar.css"
import {NavLink} from "react-router-dom";

const NavigationBar = (props) => {
    return (
        <div className={'se-navigation-bar'}>
            <NavLink className={'se-tab-item se-tab-item--blue'}
                     to={'/Home'}
                     activeClassName={'se-tab-item--blue-active'}>Home</NavLink>
            <NavLink className={'se-tab-item se-tab-item--blue'}
                     to={'/ServicesList'}
                     activeClassName={'se-tab-item--blue-active'}>Services List</NavLink>
            <NavLink className={'se-tab-item se-tab-item--blue'}
                     to={'/FindService'}
                     activeClassName={'se-tab-item--blue-active'}>Find Services</NavLink>
            <NavLink className={'se-tab-item se-tab-item--blue'}
                     to={'/MotoHours'}
                     activeClassName={'se-tab-item--blue-active'}>Moto Hours</NavLink>
            {props.isAdmin &&
            <NavLink className={'se-tab-item se-tab-item--blue'}
                     to={'/Administration'}
                     activeClassName={'se-tab-item--blue-active'}>Administration</NavLink>}
        </div>
    )
}

export default NavigationBar;