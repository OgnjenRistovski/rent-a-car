import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RedoIcon from '@mui/icons-material/Redo';



function RezervacijaAutomobila({automobil, cena, rezervisiVozilo}){
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [provera, setProvera] = useState(false);
    const [ukupno, setUkupno] = useState(null);
    const inputRef = useRef(null);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleIzracunaj = () => {
      if (!startDate || !endDate) {
        alert('Morate izabrati oba datuma.');
        return;
      }

      if((new Date().getTime() - startDate.getTime()) > 0 || (new Date().getTime() - endDate.getTime()) > 0 || (endDate.getTime() - startDate.getTime()) < 0){
        alert('Izaberite validan datum.');
        return;
      }
  
      setProvera(true)
      const dayDifference = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const ukupnaCena = cena * (dayDifference+1);
      setUkupno(ukupnaCena) 
    };
  
  
    const handleConfirm = () => {
      rezervisiVozilo(automobil.id);
      handleClose();
    };
  
    return (
      <>
        <Button startIcon={<RedoIcon/>} variant="contained" color="secondary" onClick={handleClickOpen}>Rezervisi</Button>

        <Dialog open={open} onClose={handleClose}>

          <DialogTitle>Rezervisanje vozila {automobil.model}</DialogTitle>

          <DialogContent>
            <DialogContentText>Izaberite datume preuzimanja i vraćanja vozila za proračun cene iznajmljivanja.</DialogContentText>
            <DialogContentText sx={{fontWeight:"bold"}}>Cena po danu: {cena}€</DialogContentText>
            <DialogContentText sx={{fontWeight:"bold"}}>Ukupna cena: {ukupno}€</DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <DatePicker value={startDate} label="Datum preuzimanja" onChange={(newValue) => {setStartDate(newValue);}}/>
                <DatePicker value={endDate} label="Datum vraćanja" onChange={(newValue) => {setEndDate(newValue);}} />
              </DialogContent>
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleConfirm} disabled={provera ? false : true}>Potvrdi</Button>
            <Button onClick={handleIzracunaj}>Izračunaj cenu </Button>
            <Button onClick={handleClose}>Odustani</Button>
          </DialogActions>

        </Dialog>
      </>
    );
}

export default RezervacijaAutomobila