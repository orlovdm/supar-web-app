import React from "react";
import CarouselSection from "../common/Carousel/Carousel";
import ServiceSection from "./ServiceSection/ServiceSection";
import ExecutionSection from "./ExecutionsSection/ExecutionsSection";
import ChartSection from "./ChartSection/ChartSection";
import Measurements from "./Measurements";
import EditServiceSection from "./ServiceSection/EditServiceSection";
import {
    Button
} from '@storaensods/seeds-react';

const Service = props => {

    const { service, executions, measurementsLog, isAdmin, serviceEditMode, onServiceEditButtonClick } = props;
    // debugger;
    return (
        <div className={'content'}>
            <div className={'content-block'}>
                <h3 className={'se-section-title'}>{`Service ${service.id}`}</h3>
                {isAdmin &&
                    <div className={'row mb-3'}>
                        {!serviceEditMode ?
                            <div className={'col'}>
                                <Button size={'sm'} icon={'edit'} onClick={onServiceEditButtonClick}>Edit</Button>
                                <Button size={'sm'} icon={'delete'} type={'negative'}>Delete</Button>
                            </div> :
                            <div className={'col'}>
                                <Button size={'sm'} icon={'save'} type={'positive'}>Save</Button>
                                <Button size={'sm'} icon={'cancel'} type={'negative'}>Cancel</Button>
                            </div>}
                    </div>}

                <div className={'row'}>
                    <div className={'col'}>
                        {service.id &&
                            serviceEditMode
                            ? <EditServiceSection service={service} />
                            : <ServiceSection service={service} />}
                        {service.measurements && service.measurements.length > 0 &&
                            <Measurements measurements={service.measurements} />}
                    </div>
                    <div className={'col'}>
                        {service.files && service.files.length > 0 &&
                            <CarouselSection items={service.files} />}
                    </div>
                </div>

                <div className={'row'}>
                    <div className={'col'}>
                        {executions && executions.length > 0 &&
                            <ExecutionSection service={service} executions={executions} />}
                    </div>
                </div>

                <div className={'row'}>
                    {measurementsLog && measurementsLog.length > 0 &&
                        <ChartSection service={service} data={measurementsLog} />}
                </div>
            </div>
        </div>
    )
}

export default Service;