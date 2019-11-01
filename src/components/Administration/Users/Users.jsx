import React, {useState} from "react";
import {
    DataTable,
    Button,
    ButtonGroup
} from '@storaensods/seeds-react';

const Users = (props) => {

    return (
        <>
            <DataTable columns={[
                {key: 'UserID', header: 'Login',},
                {key: 'UserName', header: 'Name'},
                {key: 'UserDesc', header: 'Description'},
                {
                    key: 'Role', header: 'Role', content: (value) => {
                        switch (value) {
                            case 1:
                                return 'Administrator'
                            case 2:
                                return 'Foreman'
                            case 3:
                                return 'Maintenance'
                            case 4:
                                return 'Operator'
                            default:
                                return ''
                        }
                    }
                },
                {key: 'machines', header: 'Machines'},
                {key: 'IsActive', header: 'Active', type: 'boolean'},
                {
                    key: 'actions',
                    header: '',
                    sorting: false
                }
            ]}
                       data={props.users.map(u => {
                           return {
                               ...u,
                               actions: <>
                                   <Button icon={'delete'} onClick={() => (console.log('DELETE:', u.UserID))}/>     {/*TODO: удалить запись к указаным ID*/}
                               </>
                           }
                       })}
                       rowOnClick={(item, row) => (console.log(row, item))} /*TODO: Вынести в state свойство activeRow и менять его по щелчку на строке*/
            />
        </>
    )
}

export default Users;