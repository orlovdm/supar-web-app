import React from "react";
import CarouselSection from "../common/Carousel/Carousel";
import ServiceSection from "./ServiceSection/ServiceSection";
import ExecutionSection from "./ExecutionsSection/ExecutionsSection";
import ChartSection from "./ChartSection/ChartSection";

const Service = props => {

    const { service, executions, measurementsLog } = props;
    // debugger;
    return (
        <div className={'content'}>
            <div className={'content-block'}>
                <h3 className={'se-section-title'}>{`Service ${service.id}`}</h3>

                <div className={'row'}>
                    <div className={'col'}>
                        {service.id &&
                            <ServiceSection service={service} />}
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