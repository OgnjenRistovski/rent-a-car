import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import placeholder from './placeholder.jpg'
import Slide from '@mui/material/Slide';
import Rating from '@mui/material/Rating';
import { forwardRef } from 'react';


function NajboljeOcenjeni(){
    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    var topRated = []
    const data = JSON.parse(localStorage.getItem('automobili'));


    const izracunajProsek = (niz) => {
        const suma = niz.reduce((acc, val) => acc + val, 0);
        return niz.length ? suma / niz.length : 0;
      }

    const top3Vozila = () => {
        const prosecneOcene = data.map((d) => {
            const prosecnaOcena = parseFloat(izracunajProsek(d.ocene).toFixed(2));
            return { ...d, prosecnaOcena };
        });
      
        prosecneOcene.sort((a, b) => b.prosecnaOcena - a.prosecnaOcena);
        topRated = (prosecneOcene.slice(0, 3))
      };

      top3Vozila()

    return(
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Stack direction="row" sx={{m:1, p:1, display:"flex", alignItems:"center", justifyContent:"center"}}>
                {topRated.map(tR => {
                    return(
                    <Paper key={tR.id} elevation={10} sx={{m:3}}>
                        <Card hover sx={{ width: 325, border:2, ':hover': {boxShadow: 20,}}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={placeholder}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                {tR.model}
                                </Typography>
                                <Typography variant="body1">
                                    Godiste: {tR.godiste} <br/> Cena: {tR.cena}€ <br/> Klima: {tR.klima ? "Da" : "Ne"} <br/> Dostupnost: {tR.dostupnost ? <Typography sx={{display:"inline-block",color:"lime"}}>Da</Typography> : <Typography sx={{display:"inline-block",color:"red"}}>Ne</Typography>} <br/> Ocena: {tR.prosecnaOcena}
                                </Typography>
                                <Rating sx={{mt:1}} value={tR.prosecnaOcena} precision={0.5} readOnly/>
                            </CardContent>
                        </Card>
                    </Paper>
                )})}
            </Stack>
        </Slide>
    )

}

export default NajboljeOcenjeni