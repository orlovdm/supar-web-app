import React from "react";
import style from "./Modal.module.css"
import {
    Modal,
    Input,
    TextArea,
} from '@storaensods/seeds-react';
import { Field, reduxForm } from "redux-form";

let ExecServiceModal = props => {

    const { handleCancel, handleSubmit, show, service } = props;

    return (
        <form onSubmit={handleSubmit}>
            {/* <Modal actions={[
                { label: 'Run', type: 'positive', onClick: handleSubmit },
                { label: 'Cancel', type: 'secondary', onClick: handleCancel },
            ]}
                onClose={handleCancel}
                active={show}
                type="attention"
                title="Execute Service"> */}

                <div className={style.serviceModalContent}>
                    {service && <h4>Executing service # {service.id}</h4>}
                    <div className={'container-fluid'}>
                        <div className={'row mb-1'}>
                            <Field name={'FIO'} component={Input} label={'Executor:'} type={'text'} />
                        </div>

                        {service && service.measurements.length !== 0 && <Measurements measurements={service.measurements} />}

                        <div className={'row'}>
                            <Field name={'message'} component={TextArea} label={'Description:'} />
                        </div>
                    </div>
                </div>

            {/* </Modal> */}
        </form>
    )
}

ExecServiceModal = reduxForm({ form: 'executeService' })(ExecServiceModal);

const Measurements = ({ measurements }) => {
    return (
        <div>
            {measurements.map(m => {
                return (
                    <div className={'row mb-1'} key={m.id}>
                        <label className={'col-2'}>{m.name}</label>
                        <MeasurementPointsInputs id={m.id} numPoints={m.numPoints} />
                    </div>
                )
            })}
        </div>
    )
};

const MeasurementPointsInputs = ({ id, numPoints }) => {
    let inputs = [];
    for (let i = 1; i <= numPoints; i++) {
        inputs.push(
            <div className={'col-2'} key={id + '-' + i}>
                <Field name={`measurements.${id}.${i}`} component={Input} type={'text'} placeholder={'P' + i} />
            </div>
        );
    }
    return inputs
}


export default ExecServiceModal;