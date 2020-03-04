import * as React from 'react';
import {IconButton, TableCell, TextField} from "@material-ui/core";
import {AddCircle} from '@material-ui/icons'
import {useStyles} from "./App";


const ProsConsInput : React.FC<{addItemHandler: (s: string, isCons: boolean)=>void, isCons: boolean}> =({addItemHandler, isCons})=>{
    const [itemValue, setItemValue] = React.useState('');
    const classes = useStyles();
    const handler = () => {
        addItemHandler(itemValue, isCons);
        setItemValue('');
    };
    return (
        <TableCell>
            <div className={classes.inputWrapper}>
                <TextField
                    label='add new one'
                    value={itemValue}
                    onChange={(e)=>
                        setItemValue(e.currentTarget.value)}
                />

                <IconButton size='small' onClick={handler} disabled={!itemValue} >
                    <AddCircle style={{ fontSize: 30 }} />
                </IconButton>
            </div>

        </TableCell>)
};


export default ProsConsInput
