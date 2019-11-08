import React from "react";
import style from "./Modal.module.css"
import {
    Modal,
    Input,
    TextArea,
} from "@storaensods/seeds-react";
import { Field, reduxForm } from "redux-form";

let ExecServiceModal = props => {

    const { handleCancel, handleSubmit, show, service, reset } = props;

    const cancelClick = () => {
        reset();
        handleCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Modal actions={[
                { label: 'Run', type: 'positive', onClick: handleSubmit },
                { label: 'Cancel', type: 'secondary', onClick: cancelClick },
            ]}
                onClose={cancelClick}
                active={show}
                type="attention"
                title="Execute Service">

                <div className={style.serviceModalContent}>

                    <h4>Executing service # {service.id}</h4>

                    <div className={'container-fluid'}>
                        <div className={'row mb-1'}>
                            <div className="se-input-container">
                                <label htmlFor="FIO" className="se-label se-label--md ">Executor:</label>
                                <Field name={'FIO'} component={'input'} type={'text'} className={'se-input se-input--md'} />
                            </div>
                        </div>

                        {service.measurements.length !== 0 && <Measurements measurements={service.measurements} />}

                        <div className={'row'}>
                            <div className={'se-textarea-container'}>
                                <label htmlFor={'message'} className={'se-label se-label--md '}>Description:</label>
                                <Field name={'message'} component={'textarea'} className={'se-textarea se-textarea--md '} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </form>
    )
}

ExecServiceModal = reduxForm({ form: 'executeService' })(ExecServiceModal);

export default ExecServiceModal;

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
                <Field name={`measurements.${id}.${i}`} component={'input'} type={'text'} placeholder={'P' + i} className={'se-input se-input--md'} />
            </div>
        );
    }
    return inputs
}