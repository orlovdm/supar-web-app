import React, {useState, useEffect} from "react";

const MyControl = (props) => {

    const {label, placeholder, name, value, Component} = props;

    let [val, setVal] = useState(value);

    useEffect( () => setVal(value), [value]);

    const onInputChange = (e) => {
        setVal(e.currentTarget.value);
    }

    return (
        <>
            <Component label={label} name={name} value={val} placeholder={placeholder} onChange={onInputChange} />
        </>
    )
}

export default MyControl;