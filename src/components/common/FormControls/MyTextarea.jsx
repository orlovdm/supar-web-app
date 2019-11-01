import React, {useState, useEffect} from "react";
import {TextArea} from '@storaensods/seeds-react';
import MyControl from "./MyControl";

const MyTextarea = (props) => {
    return <MyControl Component={TextArea} {...props} />
}

export default MyTextarea;