import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import RezervacijaAutomobila from './RezervacijaAutomobila';
import VracanjeAutomobila from './VracanjeAutomobila';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';


function RedAutomobil({automobil, obrisiAutomobil, snimiIzmene, onOcena, onRezervacija}){
    var[izmena, setIzmena] = useState(false)
    var[model, setModel] = useState(automobil.model)
    var[godiste, setGodiste] = useState(automobil.godiste)
    var[cena, setCena] = useState(automobil.cena)
    var[klima, setKlima] = useState(automobil.klima)
    var[dostupnost, setDostupnost] = useState(automobil.dostupnost)
    var[ocene, setOcene] = useState(automobil.ocene)
    

    const TableCellB = styled(TableCell)`
    &.MuiTableCell-root {
      border: 2px solid ;
    }
  `;

    const handleKlima = (e) => {
        setKlima(e.target.checked)
    }

    const rezervisiVozilo = () => {
        setDostupnost(!dostupnost)
    }

    const rezervisiVoziloRez = (id) => {
        setDostupnost(!dostupnost)
        onRezervacija(id)
    }

    const dodajOcenu = (noveOcene) => {
        setOcene(noveOcene)
        onOcena(automobil.id)
    }

    function izracunajProsek(niz) {
        const suma = niz.reduce((acc, val) => acc + val, 0);
        return niz.length ? suma / niz.length : 0;
      }

    return (
        <TableRow hover sx={{':hover': {boxShadow: 1}}} key={automobil.id}>
            <TableCellB>
                {izmena ? <TextField variant="outlined" value={model} onChange={e => (setModel(e.target.value))}/> : model}
            </TableCellB>

            <TableCellB align="center">
                {izmena ? <TextField variant="outlined" inputProps={{ min: 0}} type="number" value={godiste} onChange={e => (setGodiste(e.target.value))}/> : godiste}
            </TableCellB>

            <TableCellB align="center">
                {izmena ? <TextField variant="outlined" inputProps={{ min: 0}} type="number" value={cena} onChange={e => (setCena(e.target.value))}/> : cena+"€"}
            </TableCellB>

            <TableCellB align="center" >
                {izmena ? <Checkbox variant="outlined" checked={klima} onChange={handleKlima}/> : klima ? "Da" : "Ne"}
            </TableCellB>

            <TableCellB align="center">
                {dostupnost ? "Da" : "Ne"}
            </TableCellB>

            <TableCellB align="center">
                    <Rating sx={{mr:4}} value={parseFloat(izracunajProsek(ocene).toFixed(2))} precision={0.5} readOnly/>
            </TableCellB>

            <TableCellB align="center">
                {
                !izmena ? <Button startIcon={<EditIcon/>} variant="contained" color="primary" sx={{m:1}} onClick={() => (setIzmena(true))}>Izmeni</Button>
                :
                <Button startIcon={<CheckIcon/>} sx={{m:1}} variant="contained" color="success" onClick={() => {snimiIzmene({
                        id:automobil.id,
                        model:model,
                        godiste:godiste,
                        cena:cena,
                        klima:klima,
                        dostupnost:dostupnost,
                        ocene:ocene
                    })
                 setIzmena(false)}}>Snimi izmene</Button>}

                {
                dostupnost ? <RezervacijaAutomobila automobil={automobil} cena={automobil.cena} rezervisiVozilo={rezervisiVoziloRez}></RezervacijaAutomobila>
                :
                <VracanjeAutomobila automobil={automobil} rezervisiVozilo={rezervisiVozilo} dodajOcenu={dodajOcenu} ></VracanjeAutomobila>}
                <Button startIcon={<DeleteIcon/>} sx={{m:1}} variant="contained" color="error" onClick={e => (obrisiAutomobil(automobil.id))}>Obrisi</Button>
            </TableCellB>
        </TableRow>
    )
}

export default RedAutomobil