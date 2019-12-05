import React from "react";
import { LineChart } from "../../common/Chart/Chart";

// import { Chart } from "@storaensods/seeds-react";


const ChartSection = props => {

    const { service, data } = props;

    return (
        <>
            {service.measurements.map(m => (
                <div key={m.measurementId} className={'col'}>
                    {console.log(data.filter(x => x.measurement.id === m.measurementId)
                        .map(x => ({ date: x.date, point: x.point, value: x.value }))
                        .filter(x => x.point <= m.numPoints))}
                    <LineChart
                        data={data.filter(x => x.measurement.id === m.measurementId)
                            .map(x => ({ date: x.date, point: x.point, value: x.value }))
                            .filter(x => x.point <= m.numPoints)}
                        name={m.measurementName}
                        id={'chart-' + m.measurementId}
                    />
                </div>
            ))}
        </>
    )
}

export default ChartSection;

// legend
//                             timeSeries
//                             title={m.measurementName}
//                             type={'line'}
//                             width={600}
//                             xKey={'date'}
//                             yKey={'value'}
//                             dim3