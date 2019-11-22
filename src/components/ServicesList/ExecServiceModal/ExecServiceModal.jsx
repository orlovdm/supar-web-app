import React from "react";
import style from "./Modal.module.css"
import { Modal } from "@storaensods/seeds-react";
import { Field, reduxForm } from "redux-form";
import { required, valueBetween } from "../../common/FormControls/validators";
import { RenderInput } from "../../common/FormControls/FormControls";

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
                            <Field
                                label={'Executor:'}
                                name={'FIO'}
                                component={RenderInput}
                                type={'text'}
                                validate={[required]}
                            />
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
                        <MeasurementPointsInputs id={m.id} numPoints={m.numPoints} min={m.minValue} max={m.maxValue} />
                    </div>
                )
            })}
        </div>
    )
};

const MeasurementPointsInputs = ({ id, numPoints, min, max }) => {
    let inputs = [];
    let minMaxValue = valueBetween(min, max)
    for (let i = 1; i <= numPoints; i++) {
        inputs.push(
            <div className={'col-2'} key={id + '-' + i}>
                <Field
                    name={`measurements.${id}.${i}`}
                    component={RenderInput}
                    type={'text'}
                    placeholder={'P' + i}
                    validate={[minMaxValue]}
                />
            </div>
        );
    }
    return inputs
}