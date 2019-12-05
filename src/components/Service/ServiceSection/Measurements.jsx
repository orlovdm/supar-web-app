import React from "react";
import { Divider } from "@storaensods/seeds-react";

const Measurements = props => {

    const { measurements } = props;

    return (
        <div>
            <h6 className={'se-section-title'}>Measurements:</h6>
            {measurements.map(m =>
                <div key={m.measurementId}>
                    <div className={'row'}>
                        <div className={'col'}>
                            <span className={'strong'}>Measurement:</span>
                            <p>{m.measurementName}</p>
                        </div>
                        <div className={'col'}>
                            <span className={'strong'}>Min Value:</span>
                            <p>{m.minValue}</p>
                        </div>
                        <div className={'col'}>
                            <span className={'strong'}>Max Value:</span>
                            <p>{m.maxValue}</p>
                        </div>
                        <div className={'col'}>
                            <span className={'strong'}>Number of Points:</span>
                            <p>{m.numPoints}</p>
                        </div>
                    </div>
                    <Divider />
                </div>)}
        </div>
    )
}

export default Measurements;