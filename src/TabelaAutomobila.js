import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import RedAutomobil from './RedAutomobil';
import Slide from '@mui/material/Slide';

function TabelaAutomobila(){
    var [automobili, setAutomobili] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('automobili'));
        if (data.length > 0) {
        data.sort(function(a,b){
                return a.model.localeCompare(b.model);
        })
         setAutomobili(data)
        }
    }, []);

    useEffect(() => {
        automobili.sort(function(a,b){
            return a.model.localeCompare(b.model);
        })
        localStorage.setItem('automobili', JSON.stringify(automobili));
      }, [automobili]);

    //const fs = require('fs');
    
    const obrisiAutomobil = (id) => {
        automobili = automobili.filter(a => a.id !== id)
        automobili.sort(function(a,b){
            return a.model.localeCompare(b.model);
        })
        setAutomobili(automobili.map(a=>a))
        //fs.writeFile('automobili.json', JSON.stringify(automobili)
    }

    const snimiIzmene = (automobil) => {
            var automobilIndex = automobili.findIndex(a => a.id == automobil.id)
            automobili[automobilIndex] = automobil
            automobili.sort(function(a,b){
                return a.model.localeCompare(b.model);
            })
            setAutomobili(automobili.map(a=>a))
            //fs.writeFile('automobili.json', JSON.stringify(automobili)
    }

    const handleOnOcena = (id) => {
        var automobilIndex = automobili.findIndex(a => a.id == id)
        automobili[automobilIndex].dostupnost = !automobili[automobilIndex].dostupnost
        automobili.sort(function(a,b){
            return a.model.localeCompare(b.model);
        })
        setAutomobili(automobili.map(a=>a))
    }

    const handleRez = (id) => {
        var automobilIndex = automobili.findIndex(a => a.id == id)
        automobili[automobilIndex].dostupnost = !automobili[automobilIndex].dostupnost
        automobili.sort(function(a,b){
            return a.model.localeCompare(b.model);
        })
        setAutomobili(automobili.map(a=>a))
    }

    const TableCellB = styled(TableCell)`
    &.MuiTableCell-root {
      border: 2px solid ;
      font-weight: bolder;
    }
  `;

    return(
    <>
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <Paper elevation={10}>
        <br/><br/>
        <Table sx={{minWidth:650, border:2}} stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCellB >Model</TableCellB>
                    <TableCellB align="center" >Godiste</TableCellB>
                    <TableCellB align="center" >Cena</TableCellB>
                    <TableCellB align="center" >Klima</TableCellB>
                    <TableCellB align="center" >Dostupnost</TableCellB>
                    <TableCellB align="center" >Ocena</TableCellB>
                    <TableCellB align="center" >Akcije</TableCellB>
                </TableRow>
            </TableHead>
        
            <TableBody>
                {automobili.map(a => {
                    return(<RedAutomobil key={a.id} automobil={a} snimiIzmene={snimiIzmene} obrisiAutomobil={obrisiAutomobil} onOcena={handleOnOcena} onRezervacija={handleRez}/>)
                })}
            </TableBody>

        </Table>
    </Paper>
    </Slide>
    </>  
    )
}

export default TabelaAutomobila