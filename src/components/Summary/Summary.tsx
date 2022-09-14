import React from 'react';
import {Typography} from "@material-tailwind/react";

type Props = {
    summary: string|null
}

function Summary(props: Props) {
    return (
        <div className="mx-2 text-left">
            <Typography className='text-black font-normal'>
                {props.summary ?? 'None Summary'}
            </Typography>
        </div>
    );
}

export default Summary;
