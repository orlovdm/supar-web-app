import React, { useState } from "react";
import {Redirect} from "react-router-dom";
import { Card } from '@storaensods/seeds-react';
import { ListMachines, ListServiceMan } from "./../common/Lists/Lists";

const Home = () => {

    const [selectedMachine, setSelectedMachine] = useState(null);
    const handleMachineChange = (value, meta) => setSelectedMachine(value);

    const [selectedServiceMan, setSelectedServiceMan] = useState(null);
    const handleServiceManChange = (value, meta) => setSelectedServiceMan(value);

    const [url, setUrl] = useState(null);

    const handleOkClick = () => {

        const urlParams = [];
        selectedMachine && urlParams.push(`machines=${selectedMachine.value}`);
        selectedServiceMan && urlParams.push(`serviceMan=${selectedServiceMan.value}`);
        setUrl(`/ServicesList${urlParams.length > 0 && `?${urlParams.join('&')}`}`);
    }

    return (
        <>
            {url ?
                <Redirect to={url} /> :
                <div style={{ 'width': '400px', 'margin': '0 auto' }}>
                    <Card actions={[{ label: 'Ok', onClick: handleOkClick }]} title={'Please, select Machine and ServiceMan'} overflow={'visible'}>
                        <ListMachines handleChange={handleMachineChange} selectedValue={selectedMachine ? selectedMachine.value : null} />
                        <ListServiceMan handleChange={handleServiceManChange} selectedValue={selectedServiceMan ? selectedServiceMan.value : null} />
                    </Card>
                </div>}
        </>
    )
}

export default Home;