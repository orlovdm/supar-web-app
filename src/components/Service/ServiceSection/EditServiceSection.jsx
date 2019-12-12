import React from "react";
import { Field, reduxForm } from "redux-form";
import { required, valueBetween } from "../../common/FormControls/validators";
import { RenderInput } from "../../common/FormControls/FormControls";
import { ListMachines, ListServiceMan } from "../../common/Lists/Lists";

let EditServiceSection = props => {

    const { service, handleCancel, handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className={'row mb-1'}>
                    {/* <div className={'col'}>
                        <span className={'strong'}>Description:</span>
                        <p>{service.description}</p>
                    </div> */}
                    <div className={'col'}>
                        <div className={'se-textarea-container'}>
                            <label htmlFor={'description'}>Description:</label>
                            <Field name={'description'} component={'textarea'} className={'se-textarea se-textarea--md '} validate={[required]} />
                        </div>
                    </div>
                </div>

                <div className={'row mb-1'}>
                    <div className={'col'}>
                        {/* <span className={'strong'}>Machine:</span>
                        <p>{service.machine.name}</p> */}
                        <Field name={'machine'} component={ListMachines} validate={[required]} />
                    </div>
                    <div className={'col'}>
                        <span className={'strong'}>Module:</span>
                        <p>{service.module.name}</p>
                    </div>
                    <div className={'col'}>
                        <span className={'strong'}>Element:</span>
                        <p>{service.element.name}</p>
                    </div>
                    <div className={'col'}>
                        {/* <span className={'strong'}>ServiceMan:</span>
                        <p>{service.element.name}</p> */}
                        <Field name={'serviceMan'} component={ListServiceMan} validate={[required]} />
                    </div>
                </div>

                <div className={'row mb-1'}>
                    <div className={'col'}>
                        {/* <span className={'strong'}>Rate by MotoHours:</span>
                        <p>{service.motoRate}</p> */}
                        <label htmlFor={'motoRate'}>Rate by MotoHours:</label>
                        <Field name={'motoRate'} component={RenderInput} validate={[required]} />
                    </div>
                    <div className={'col'}>
                        {/* <span className={'strong'}>Rate by Calendar:</span>
                        <p>{service.calnRate}</p> */}
                        <label htmlFor={'calnRate'}>Rate by Calendar:</label>
                        <Field name={'calnRate'} component={RenderInput} validate={[required]} />
                    </div>
                    <div className={'col'}>
                        {/* <span className={'strong'}>Execution Time (min):</span>
                        <p>{service.executionTime}</p> */}
                        <label htmlFor={'execTime'}>Execution Time:</label>
                        <Field name={'execTime'} component={RenderInput} validate={[required]} />
                    </div>
                </div>

                {/* <div className={'row'}>
                    <div className={'col'}>
                        <span className={'strong'}>Last Execution Day:</span>
                        <p>{service.lastDate}</p>
                    </div>
                    <div className={'col'}>
                        <span className={'strong'}>Last Execution MotoHours:</span>
                        <p>{service.lastMotoHours}</p>
                    </div>
                    <div className={'col'}>
                        <span className={'strong'}>Next Execution Day:</span>
                        <p>{service.nextDate}</p>
                    </div>
                </div> */}

                <div className={'row mb-3'}>
                    {/* <div className={'col'}>
                        <span className={'strong'}>Notes:</span>
                        <p>{service.notes}</p>
                    </div> */}
                    <div className={'col'}>
                        <div className={'se-textarea-container'}>
                            <label htmlFor={'notes'}>Notes:</label>
                            <Field name={'notes'} component={'textarea'} className={'se-textarea se-textarea--md '} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

// EditServiceSection = reduxForm({form: 'editService'})(EditServiceSection);

export default reduxForm({ form: 'editService' })(EditServiceSection);
// EditServiceSection;