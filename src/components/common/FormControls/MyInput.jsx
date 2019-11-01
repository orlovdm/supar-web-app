import React, {useState, useEffect} from "react";
import {Input} from '@storaensods/seeds-react';
import MyControl from "./MyControl";

const MyInput = (props) => {

    const {label, placeholder, name, value} = props;

    let [val, setVal] = useState(value);

    useEffect( () => setVal(value), [value]);

    const onInputChange = (e) => {
        setVal(e.currentTarget.value);
    }
    return <Input label={label} name={name} value={val} placeholder={placeholder} onChange={onInputChange} />
}

export default MyInput;