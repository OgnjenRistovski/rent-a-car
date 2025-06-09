import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating,} from '@mui/material';
import { useState } from 'react';
import UndoIcon from '@mui/icons-material/Undo';

function VracanjeAutomobila({automobil, rezervisiVozilo, dodajOcenu}){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    

    const handleClose = () => {
        setOpen(false);
      };

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleClick = () => {
        if(value != null ){
          automobil.ocene.push(parseInt(value))
          dodajOcenu(automobil.ocene);  
        }

        rezervisiVozilo();
        handleClose();
      };

    return(
        <>
            <Button sx={{pl:4, pr:4}} startIcon={<UndoIcon/>} variant="contained" color="warning" onClick={handleClickOpen}>Vrati</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ocenite vozilo</DialogTitle>

                <DialogContent>
                    <Rating onChange={handleChange}/>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClick}>Potvrdi</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default VracanjeAutomobila