import React from "react";

const ExecutionSection = props => {

    const { service, executions } = props;
    // debugger
    return (
        <div className={'mb-3'}>
            <h6 className={'se-section-title'}>Last 5 Executions:</h6>

            <table className={'se-table border-bottom'}>
                <thead className={'se-table-head'}>
                    <tr >
                        <th rowSpan={2}>Execution Date</th>
                        <th rowSpan={2}>MotoHours</th>
                        <th rowSpan={2}>Executor</th>
                        {service.measurements.map(m => <th key={m.measurementId} colSpan={m.numPoints}>{m.measurementName}</th>)}
                        <th rowSpan={2}>Notes</th>
                    </tr>
                    <tr>
                        {service.measurements.map(m => [...Array(m.numPoints)].map((_, i) => i).map(i => <th key={i}>P-{i + 1}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {executions.map(ex =>
                        <tr key={ex.id} className={'se-table-item'}>
                            <td>{ex.date}</td>
                            <td>{ex.motoHours}</td>
                            <td>{ex.executor}</td>
                            {ex.measurements && ex.measurements.length > 0 && ex.measurements.map(m => <td key={m.id}>{m.value}</td>)}
                            <td>{ex.notes}</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ExecutionSection;

{/* .map(name => <th key={name}>{name}</th>) */ }
{/* unicue(ex.measurements.map(x => x.measurementName))).map(n => <th key={n}>{n}</th>) */ }
{/* {unicue(
                            [].concat(...executions.map(x => x.measurements.map(m => m.measurementName)))
                        ).map(name => <th key={name}>{name}</th>)} */}