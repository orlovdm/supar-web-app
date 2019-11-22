import React, { useState } from "react";
import { Link } from 'react-router-dom'
import {
    DataTable,
    Button,
    Pagination,
    Tile,
    Icon
} from '@storaensods/seeds-react';
import ExecServiceModal from "./ExecServiceModal/ExecServiceModal";

const ServicesList = props => {

    const { services, selectedService, setSelectedService, totalCount, pageSize, page, onPageChanged, onExecButtonClick } = props;

    let [execMode, setExecMode] = useState(false);

    const handleCancel = () => {
        setExecMode(false);
    }

    const handleSubmit = values => {
        onExecButtonClick(values);
        setExecMode(false);
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
                    { key: 'id', header: 'ID' },
                    { key: 'element', header: 'Element' },
                    { key: 'module', header: 'Module' },
                    { key: 'machine', header: 'Machine' },
                    { key: 'serviceMan', header: 'ServiceMan' },
                    { key: 'description', header: 'Description' },
                    { key: 'overdue', header: 'Overdue, days' },
                    { key: 'executionTime', header: 'Execution Time, min' },
                    { key: 'files', header: '', sorting: false }
                ]}
                data={services.map(s => {
                    return {
                        ...s,
                        description: <Link to={`/Service/${s.id}`}>{s.description}</Link>,
                        files: s.files && <Icon>folder_open</Icon>
                    }
                })}
                rowOnClick={(e) => {
                    setSelectedService(e);
                    setExecMode(true);
                }}
            />

            <div className={'pagination-container'}>
                <Pagination pageCount={Math.ceil(totalCount / pageSize)}
                    initialPage={page - 1}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={2}
                    handlePageClick={(e) => {
                        onPageChanged(e.selected + 1)
                    }}
                />
            </div>

            {selectedService &&
                <ExecServiceModal onSubmit={handleSubmit} handleCancel={handleCancel} show={execMode} service={selectedService} />}
        </div>
    )
}

export default ServicesList;