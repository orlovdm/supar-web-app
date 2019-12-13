import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card } from '@storaensods/seeds-react';
import { Field, reduxForm } from "redux-form";
import { ListMachines, ListServiceMan } from "./../common/Lists/Lists";

const Home = props => {

    const [url, setUrl] = useState(null);

    const handleSubmit = (values) => {
        // console.log('Values:', values);
        const urlParams = [];
        values.machine && urlParams.push(`machines=${values.machine.value}`);
        values.serviceMan && urlParams.push(`serviceMan=${values.serviceMan.value}`);
        let _url = '/ServicesList';
        if (urlParams.length > 0) {
            _url += '?' + urlParams.join('&');
        }
        console.log('url:', _url)
        setUrl(_url);
    }

    return (
        <>
            {url ?
                <Redirect to={url} /> :
                <div style={{ 'width': '400px', 'margin': '0 auto' }}>
                    <HomeForm {...props} onSubmit={handleSubmit} />
                </div>}
        </>
    )
}

export default Home;

let HomeForm = props => {
    const { handleSubmit, } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Card actions={[{ label: 'Ok', onClick: handleSubmit }]} title={'Please, select Machine and ServiceMan'} overflow={'visible'}>
                <Field name='machine' component={ListMachines} />
                <Field name='serviceMan' component={ListServiceMan} />
            </Card>
        </form>
    );
}

HomeForm = reduxForm({ form: 'HomeForm' })(HomeForm);