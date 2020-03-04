import * as React from 'react';
import {Button, Card, CardActions, CardContent, TableCell, Typography, TextField, ButtonGroup} from "@material-ui/core";
import {Delete, Save, Edit} from "@material-ui/icons";
import {useStyles} from "./App";

interface IProps {
    items: string[],
    deleteProsConsHandler: (id: number, isCons: boolean)=>void,
    isCons: boolean,
    saveProsConsHandler: (id: number, isCons: boolean, newValue: string)=>void
}

const ItemsContainer : React.FC<IProps> =({items, deleteProsConsHandler, isCons, saveProsConsHandler})=>{
    const classes = useStyles();
    const deleteHandler = (id: number)=>{
        deleteProsConsHandler(id, isCons)
    };

    const [editingId, setEditingId] = React.useState<null | {id: number, isCons: boolean, value: string, touched: boolean}>(null);

    const editHandler = (id: number, isCons: boolean , value: string, isChanged: boolean) => {
      setEditingId({id, isCons, value, touched: isChanged})
    };

    const saveHandler = () =>{
        if(editingId && editingId.touched){
            saveProsConsHandler(editingId.id, editingId.isCons, editingId.value)
        }
        setEditingId(null)
    };

    return (
        <TableCell component="th" scope="row" >
            {items.map((item,index)=>{
                const isInEditingMode = editingId && editingId.isCons === isCons && editingId.id === index;
                return (
                    <Card className={classes.itemWrapper} key={index} variant="outlined">
                        <CardContent className={classes.itemText}>
                            {isInEditingMode ?
                                <TextField
                                    size='medium'
                                    value={editingId?.value}
                                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>)=>
                                                editHandler(index,isCons,e.currentTarget.value, true)}
                                /> :
                                <Typography variant={'h6'} color='textSecondary'>{item}</Typography>}
                        </CardContent>
                        <CardActions className={classes.buttonsWrapper}>
                            <ButtonGroup size="small" aria-label="small outlined button group">

                            {isInEditingMode ?
                                <Button
                                    color="primary"
                                    size="small"
                                    startIcon={<Save />}
                                    disabled={!editingId?.value} onClick={saveHandler}
                                >
                                    Save


                                </Button>
                                :<Button
                                    size="small"
                                    startIcon={<Edit />}

                                    onClick={()=> editHandler(index, isCons, item, false)}
                                >
                                    Edit
                                </Button>}

                                <Button
                                    color="secondary"
                                    onClick={()=> deleteHandler(index)}
                                    startIcon={<Delete />}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Card>)}
            )}
        </TableCell>)
};


export default ItemsContainer
