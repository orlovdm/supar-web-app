import React from "react";
import style from "./Administration.module.css";
import {VerticalMenu, VerticalMenuItem, Divider} from '@storaensods/seeds-react';
import Users from "./Users/Users";
import UsersContainer from "./Users/UsersContainer";

const Administration = (props) => {
    return (
        <main className={'container-fluide'}>
            <div className={'row'}>
                <div className={'col-2 ' + style.sidebar}>
                    <VerticalMenu color={'light'}>
                        <VerticalMenuItem label={'Users'} isActive={true} />
                        <Divider/>
                        <VerticalMenuItem label={'Machines'}/>
                        <VerticalMenuItem label={'Modules'}/>
                        <VerticalMenuItem label={'Elements'}/>
                        <VerticalMenuItem label={'Services'}/>
                        <VerticalMenuItem label={'Measurements'}/>
                    </VerticalMenu>
                </div>
                <div className={'col-10 ' + style.content}>
                    <UsersContainer/>
                </div>
            </div>
        </main>
    )
}

export default Administration;