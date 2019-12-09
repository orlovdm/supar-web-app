import React, { useState } from "react";
import { Link } from 'react-router-dom'
import {
    DataTable,
    Pagination,
    Icon
} from '@storaensods/seeds-react';
import ExecServiceModal from "./ExecServiceModal/ExecServiceModal";
import Loto from "./../common/Loto/Loto"

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
                    { key: 'isLoto', header: 'LOTO', sorting: false },
                    { key: 'description', header: 'Description', sorting: false },
                    { key: 'files', header: '', sorting: false, width: "50px", },
                    { key: 'overdue', header: 'Overdue, days' },
                    { key: 'executionTime', header: 'Execution Time, min' },
                ]}
                data={services.map(s => {
                    return {
                        ...s,
                        description: <Link to={`/Service/${s.id}`}>{s.description}</Link>,
                        files: s.files && <Icon>folder_open</Icon>,
                        isLoto: s.isLoto ? <Loto /> : null
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