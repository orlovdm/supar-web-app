import React, {useState} from "react";
import {
    DataTable,
    Button,
    Pagination,
    Tile,
    Icon
} from '@storaensods/seeds-react';
import ExecServiceModal from "./ExecServiceModal/ExecServiceModal";

const ServicesList = (props) => {

    let [execMode, setExecMode] = useState(false);

    const cancelButtonClick = () => {
        setExecMode(false);
    }

    const runButtonClick = () => {
        setExecMode(false);
        props.onExecButtonClick();
    }

    return (
        <div>
            {/*<Tile color={'gray'}>
                <h6>Filter list</h6>
                <Button
                    onClick={props.checkAll}>{props.checkedAll || props.selectedServices.length === props.pageSize ? 'Unselect All' : 'Select All'}</Button>
                <Button onClick={runButtonClick} type={'positive'}
                        disabled={(!props.selectedServices.length)}>Run Selected</Button>
            </Tile>*/}

            <DataTable
                columns={[
                   /* {key: 'isChecked', header: '', type: 'boolean', sorting: false},*/
                    {key: 'id', header: 'ID'},
                    {key: 'element', header: 'Element'},
                    {key: 'module', header: 'Module'},
                    {key: 'machine', header: 'Machine'},
                    {key: 'serviceMan', header: 'ServiceMan'},
                    {key: 'description', header: 'Description'},
                    {key: 'overdue', header: 'Overdue, days'},
                    {key: 'executionTime', header: 'Execution Time, min'},
                    {key: 'files', header: '', sorting: false}
                ]}
                data={props.services.map(s => {
                    return {
                        ...s,
                        files: s.files && <Icon>folder_open</Icon>
                    }
                })}
                rowOnClick={(e) => {
                    props.setSelectedService(e);
                    setExecMode(true);
                }}
            />

            <div className={'pagination-container'}>
                <Pagination pageCount={Math.ceil(props.totalCount / props.pageSize)}
                            initialPage={props.page - 1}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={2}
                            handlePageClick={(e) => {
                                props.onPageChanged(e.selected + 1)
                            }}
                />
            </div>

            <ExecServiceModal active={execMode} onCancel={cancelButtonClick} onExecute={runButtonClick} service={props.selectedService}/>
        </div>
    )
}

export default ServicesList;