import React from "react";

export const RenderInput = ({ input, meta, ...props }) => {

    const { type, label } = props
    const hasError = meta.touched && meta.error;

    return (
        <div className={'se-input-container'}>
            <label htmlFor={input.name}>{label}</label>
            <input {...input} type={type} className={'se-input se-input--md' + (hasError && ' se-input--invalid')} {...props} />
            <small className="se-form-help se-form-help--invalid">{hasError && meta.error}</small>
        </div>
    )
}
