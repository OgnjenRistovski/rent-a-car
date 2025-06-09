//npm install react-router-dom
//npm install @mui/material @emotion/react @emotion/styled
//npm install @mui/icons-material
//npm install date
//npm install @mui/x-date-pickers
//npm install dayjs
//npm install date-fns
//npm install path-browserify
import React from 'react';
import ReactDOM from 'react-dom/client';
import dataJSON from './automobili.json'
import TabelaAutomobila from './TabelaAutomobila';
import DodajAutomobil from './DodajAutomobil';
import NajboljeOcenjeni from './NajboljeOcenjeni';
import { BrowserRouter, Routes, Route, Link as RouterLink} from "react-router-dom" 
import { Box, Typography } from "@mui/material"
import { Button } from "@mui/material"
import { Divider } from "@mui/material";

export default function Rute(){
    if(JSON.parse(localStorage.getItem('automobili')).length == 0){
        localStorage.setItem('automobili', JSON.stringify(dataJSON));
    }
    
    /*localStorage.clear()*/
    //localStorage.setItem('automobili', JSON.stringify(dataJSON));

    return(
        <Box>
            <Box sx={{m:1, display:'flex', justifyContent:'center'}}>
                <Typography variant="h3" >RENT-A-CAR</Typography>
            </Box>
            <BrowserRouter>
                <Box sx={{m:1, display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" sx={{m:1}}>
                        <RouterLink style={{color:'white', textDecoration:'none'}} to="/TabelaAutomobila">Vozila</RouterLink><br/>
                    </Button>

                    <Button variant="contained" sx={{m:1}}>
                        <RouterLink style={{color:'white', textDecoration:'none'}} to="/DodajAutomobil">Dodaj Vozilo</RouterLink><br/>
                    </Button>

                    <Button variant="contained" sx={{m:1}}>
                        <RouterLink style={{color:'white', textDecoration:'none'}} to="/NajboljeOcenjeni">Top 3 Vozila</RouterLink><br/>
                    </Button>
                </Box>
                <Divider/>
                <Routes>
                    <Route path="/TabelaAutomobila" element={<TabelaAutomobila/>}></Route>
                    <Route path="/DodajAutomobil" element={<DodajAutomobil/>}></Route>
                    <Route path="/NajboljeOcenjeni" element={<NajboljeOcenjeni/>}></Route>
                </Routes>
            </BrowserRouter>
        </Box>
    )
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Rute/>
);

