import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberTrades } from './numberTrades';
import { tickers } from './tickers';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import Metals from './Metals';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const metalsColumns = [
    "Date",
    // "Open Interest",
    "Producer Longs",
    "Producer Shorts",
    "Producer Difference",
    "Swap Dealer Longs",
    "Swap Dealer Shorts",
    "Swap Difference",
    // "Swap Dealer Spreads",
    "Money Manager Longs",
    "Money Manager Shorts",
    "Money Difference",
    // "Money Manager Spreads",
    "Other Reportable Longs",
    "Other Reportable Shorts",
    "Other Difference",
    // "Other Reportable Spreads",
    // "Total Reportable Longs",
    // "Total Reportable Shorts",
    // "Non Reportable Longs",
    // "Non Reportable Shorts"
]

const financialsColumns = [
    "Date",
    // "Open Interest",
    "Dealer Longs",
    "Dealer Shorts",
    "Dealer Differnece",
    // "Dealer Spreads", // offsets from metals therefore columns not compatable
    "Asset Manager Longs",
    "Asset Manager Shorts",
    // "Asset Manager Spreads",
    "Leveraged Funds Longs",
    "Leveraged Funds Shorts",
    // "Leveraged Funds Spreads",
    "Other Reportable Longs",
    "Other Reportable Shorts",
    // "Other Reportable Spreads",
    // "Total Reportable Longs",
    // "Total Reportable Shorts",
    // "Non Reportable Longs",
    // "Non Reportable Shorts"
]

function MuiDashboard() {
    const [industryInput, setIndustryInput] = useState();
    const industryOptions = [
        { id: 1, label: 'METALS AND OTHERS' },
        { id: 2, label: 'FINANCIALS' }
    ];
    const [commodityOptions, setCommodityOptions] = useState();


    const handleIndustryChange = (e, val) => {
        setIndustryInput(val);
        if (val.label === 'METALS AND OTHERS') {
            setCommodityOptions(
                [
                    { id: 1, label: 'GOLD', comId: '088691' },
                    { id: 2, label: 'SILVER', comId: '084691' },
                    { id: 3, label: 'COPPER', comId: '085692' }
                ]
            )
        }
        if (val.label === 'FINANCIALS') {
            setCommodityOptions(
                [
                    { id: 1, label: 'CAD', comId: '090741' },
                    { id: 2, label: 'EURO FX', comId: '099741' },
                    { id: 3, label: 'DIJA', comId: '12460' },
                    { id: 4, label: 'S&P 500', comId: '138741' },
                    { id: 5, label: 'NASDAQ-100', comId: '20974' },
                    { id: 6, label: 'USD INDEX 098662', comId: '098662' },
                    { id: 7, label: 'VIX FUTURES 1170E1 ', comId: '1170E1' },
                ]
            )
        }

    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {/* <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <Autocomplete
                    disablePortal
                    id="industry-input"
                    options={industryOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Industry" />}
                    onChange={handleIndustryChange}
                />
            </Box>
            <Box
                sx={{
                    width: 300,
                }}
            >
                {/* <List component="nav">
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Metals" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Financials" />
                    </ListItemButton>
                </List> */}
            </Box>
            <Metals commodityOptions={commodityOptions} />
        </>
    );
}

export default MuiDashboard;
