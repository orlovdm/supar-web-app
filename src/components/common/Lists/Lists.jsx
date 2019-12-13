import React, { useState, useEffect } from "react";
import { MachinesAPI, ServiceManAPI } from "./../../../Api/api";
import {
    Select,
} from '@storaensods/seeds-react';

export const ListMachines = props => {

    const { input, meta: { touched, error }, ...restProps } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await MachinesAPI.getMachines();
            result.status === 200
                ? setData(result.data.machines.map(x => ({ value: x.id, label: x.name })))
                : console.warn(`${result.status} - ${result.statusText}`);
        }
        fetchData();
    }, []);

    const hasError = touched && error;

    return (
        <div className={'se-form-group'}>
            <div className={'se-input-container'}>
                <label>Machine:</label>
                <Select options={data}
                    onChange={value => input.onChange(value)}
                    onBlur={() => input.onBlur(input.value)}
                    value={input.value}
                    {...restProps}
                />
            </div>
            <small className="se-form-help se-form-help--invalid">{hasError && error}</small>
        </div>
    );
}

export const ListServiceMan = props => {
    const { input, meta: { touched, error }, ...restProps } = props;
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

    const hasError = touched && error;

    return (
        <div className={'se-form-group'}>
            <div className={'se-input-container'}>
                <label>ServiceMan:</label>
                <Select options={data}
                    onChange={value => input.onChange(value)}
                    onBlur={() => input.onBlur(input.value)}
                    value={input.value}
                    {...restProps}
                />
            </div>
            <small className="se-form-help se-form-help--invalid">{hasError && error}</small>
        </div>
    );
}