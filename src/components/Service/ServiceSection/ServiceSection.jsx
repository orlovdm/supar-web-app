import React from "react";

const ServiceSection = props => {

    const { service } = props;

    return (
        <>
            <div>
                <div className={'row'}>
                    <div className={'col'}>
                        <span className={'strong'}>Description:</span>
                        <p>{service.description}</p>
                    </div>
                </div>

                <div className={'row'}>
                    <div className={'col'}>
                        <span className={'strong'}>Machine:</span>
                        <p>{service.machine.name}</p>
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
                        <span className={'strong'}>ServiceMan:</span>
                        <p>{service.element.name}</p>
                    </div>
                </div>

                <div className={'row'}>
                    <div className={'col'}>
                        <span className={'strong'}>Rate by MotoHours:</span>
                        <p>{service.motoRate}</p>
                    </div>
                    <div className={'col'}>
                        <span className={'strong'}>Rate by Calendar:</span>
                        <p>{service.calnRate}</p>
                    </div>
                    <div className={'col'}>
                        <span className={'strong'}>Execution Time (min):</span>
                        <p>{service.executionTime}</p>
                    </div>
                </div>

                <div className={'row'}>
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
                </div>

                <div className={'row'}>
                    <div className={'col'}>
                        <span className={'strong'}>Notes:</span>
                        <p>{service.notes}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceSection;