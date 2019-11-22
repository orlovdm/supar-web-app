import React from "react";
import {
    Tile
} from '@storaensods/seeds-react';

export const NotAuthorized = props => {
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

export const NotFound = props => {
    return (
        <Tile color="yellow">
            <h3>
                404 - Not Found
            </h3>
            <p>
                Sorry, but the requested page was not found.
            </p>
        </Tile>
    )
}