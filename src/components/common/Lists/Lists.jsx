import React, { useState, useEffect } from "react";
import { MachinesAPI, ServiceManAPI } from "./../../../Api/api";
import {
    Select,
} from '@storaensods/seeds-react';

export const ListMachines = props => {

    const { selectedValue, handleChange } = props;

    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await MachinesAPI.getMachines();
            result.status === 200
                ? setMachines(result.data.machines.map(x => ({ value: x.id, label: x.name })))
                : console.warn(`${result.status} - ${result.statusText}`);
        }
        fetchData();
    }, []);

    return (
        <div className={'se-form-group'}>
            <div className={'se-input-container'}>
                <label>Machine:</label>
                <Select options={machines} onChange={handleChange} value={machines.filter(x => x.value === selectedValue)} />
            </div>
        </div>
    );
}

export const ListServiceMan = props => {
    const { selectedValue, handleChange } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await ServiceManAPI.getAllServiceMans();
            result.status === 200
                ? setData(result.data.map(x => ({ value: x.ServiceMan, label: x.ServiceMan })))
                : console.warn(`${result.status} - ${result.statusText}`);
        }
        fetchData();
    }, []);

    return (
        <div className={'se-form-group'}>
            <div className={'se-input-container'}>
                <label>ServiceMan:</label>
                <Select options={data} onChange={handleChange} value={data.filter(x => x.value === selectedValue)} />
            </div>
        </div>
    );
}