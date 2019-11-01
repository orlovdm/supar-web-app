import React from "react";
import {
    Tile
} from '@storaensods/seeds-react';

const NorAuthorized = (props) => {
    return (
        <Tile color="yellow">
            <h3>
                Not Authoruzed
            </h3>
            <p>
                Sorry, but You are not Authorized to view this contect.
            </p>
        </Tile>
)
}

export default NorAuthorized