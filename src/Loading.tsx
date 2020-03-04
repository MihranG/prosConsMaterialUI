import * as React from 'react';
import {LinearProgress, TableCell} from "@material-ui/core";


const Loading : React.FC<{isCons?: boolean}> = ({isCons})=>{
    return (
        <TableCell>
            <LinearProgress color={isCons? 'secondary': 'primary' } style={{width:'100%'}} />
        </TableCell>
    )
};

export default Loading
