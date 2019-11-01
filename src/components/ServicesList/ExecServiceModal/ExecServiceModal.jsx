import React from "react";
import style from "./Modal.module.css"
import {
    Modal,
    Input,
    TextArea,
} from '@storaensods/seeds-react';
import { Field, reduxForm } from "redux-form";
import MyInput from "../../common/FormControls/MyInput";
import MyTextarea from "../../common/FormControls/MyTextarea";

const ExecServiceModal = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <ExecuteServiceForm service={props.service} {...props} />
    )
};

let ExecuteServiceForm = (props) => {

    return (
        <div>
            {
                props.service &&
                <Modal actions={[
                    { label: 'Run', type: 'positive', onClick: props.onExecute },
                    { label: 'Cancel', type: 'secondary', onClick: props.onCancel },
                ]}
                    onClose={props.onCancel}
                    active={props.active}
                    type={'attention'}
                    title={'Execute service'}
                >
                    <div className={style.serviceModalContent}>
                        <h4>Executing service # {props.service.id}</h4>
                        <div className={'container-fluid'}>
                            <div className={'row mb-1'}>
                                <MyInput name={'FIO'} label={'Executor:'} value={''} />
                                {/*<Input label={'Executor:'}/>*/}
                            </div>

                            {props.service.measurements.length !== 0 &&
                                <Measurements measurements={props.service.measurements} />}

                            <div className={'row'}>
                                <MyTextarea name={'message'} label={'Description:'} value={''} />
                                {/*<TextArea label={'Description:'}/>*/}
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}
//ExecuteServiceForm = reduxForm({form: 'executeService'})(ExecuteServiceForm);

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
                <MyInput name={`measurements.${id}.${i}`} placeholder={'P' + i} />
                {/*<Input placeholder={'P' + i}/>*/}
            </div>
        );
    }
    return inputs
}


export default ExecServiceModal;