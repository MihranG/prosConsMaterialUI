import React, {useEffect, useState, FC} from 'react';
import './App.css';
import {api} from './Api';

import ProsConsInput from "./ProsConsInput";
import ItemsContainer from "./ItemsContainer";
import Loading from "./Loading";

import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: 414
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttonsWrapper: {
    alignSelf: 'center',
    flex: 1
  },
  itemText: {
    flex: 2,
    maxWidth: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis'

  }
});


const App:FC<{}> = ()=>{
  const classes = useStyles();

  const [{pros, cons}, setProsCons] = useState<{pros: string[], cons: string[] }>({
    pros: [],
    cons: [],
  });
  const [touched, setTouched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{
    setIsLoading(true);
    api.getProsCons().then(data => {
      setProsCons(data)
    }).catch(()=>{
        console.error('there was something was')
      }
    ).finally(()=>{
        setIsLoading(false);
      }
    )
  },[]);

  useEffect(()=>{
    if(touched && (pros.length || cons.length)){
      api.updateProsCons({pros, cons}).then(_=>{
      });
    }
  },[ pros, cons, touched]);

  const addProsConsHandler = (value:string, isCons:boolean) =>{
    if(isCons){
      setProsCons({cons: [...cons, value], pros});
    }else{
      setProsCons({pros: [...pros, value], cons});
    }
    if(!touched){
      setTouched(true)
    }
  };


  const saveProsConsHandler = (id:number, isCons: boolean, newValue: string) =>{
    if(!touched){
      setTouched(true)
    }
    if(isCons){
      setProsCons({pros, cons: cons.map((con, index)=>{
          if(index === id){
            return newValue
          }else{
            return con
          }
        })})
    }else{
      setProsCons({cons, pros: pros.map((pro, index)=>{
          if(index === id){
            return newValue
          }else{
            return pro
          }
        })})
    }
  }

  const deleteProsConsHandler = (id: number,isCons:boolean) => {
    if(!touched){
      setTouched(true)
    }
    if(isCons){
      setProsCons({
        cons: cons.filter((con,index)=>index !== id),
        pros
      })
    }else{
      setProsCons({
        pros: pros.filter((con,index)=>index !== id),
        cons
      })
    }
  };

  return <div className="App">
    <Container maxWidth='md'>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant='h4' color='textPrimary'>
                  Pros
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant='h4' color='textPrimary'>
                  Cons
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <ProsConsInput addItemHandler={addProsConsHandler} isCons={false}/>
              <ProsConsInput addItemHandler={addProsConsHandler} isCons={true}/>
            </TableRow>
                  <TableRow>
                          {isLoading ?
                             <Loading/>
                              : <ItemsContainer
                                  items={pros}
                                  deleteProsConsHandler={deleteProsConsHandler}
                                  saveProsConsHandler={saveProsConsHandler}
                                  isCons={false}
                                />
                          }
                          {isLoading ?
                             <Loading isCons />
                              : <ItemsContainer
                                  items={cons}
                                  deleteProsConsHandler={deleteProsConsHandler}
                                  saveProsConsHandler={saveProsConsHandler}
                                  isCons={true}
                              />
                          }
                   </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>;
};

export default App;
