import React, { useState, useEffect } from "react";
import { MachinesAPI, ServiceManAPI, ModulesAPI, ElementsAPI } from "./../../../Api/api";
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

export const ListModules = props => {

    const { input, meta: { touched, error }, machine, ...restProps } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await ModulesAPI.getModules(machine);
            result.status === 200
                ? setData(result.data.items.map(x => ({ value: x.id, label: x.name })))
                : console.warn(`${result.status} - ${result.statusText}`);
        }
        fetchData();
    }, []);

    const hasError = touched && error;

    return (
        <div className={'se-form-group'}>
            <div className={'se-input-container'}>
                <label>Module:</label>
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

export const ListElements = props => {

    const { input, meta: { touched, error }, module, ...restProps } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await ElementsAPI.getElements(module);
            result.status === 200
                ? setData(result.data.items.map(x => ({ value: x.id, label: x.name })))
                : console.warn(`${result.status} - ${result.statusText}`);
        }
        fetchData();
    }, []);

    const hasError = touched && error;

    return (
        <div className={'se-form-group'}>
            <div className={'se-input-container'}>
                <label>Element:</label>
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