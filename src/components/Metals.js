import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberTrades } from './numberTrades';
import { tickers } from './tickers';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import MetalsTable from './MetalsTable.js';
import FinancialsTable from './FinancialsTable';

const column_names = [
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

function Metals(props) {
    const { commodityOptions, industryInput } = props;
    const [positionsData, setPositionsData] = useState();
    const [changesData, setChangesData] = useState();
    const [percentOIData, setPercentOIData] = useState();
    const [numOfTradersData, setNumOfTradersData] = useState();

    const [commodityInput, setCommodityInput] = useState();

    const [startDate, setStartDate] = useState(
        new Date(new Date().setDate(new Date().getDate() - 60)).toISOString().slice(0, 10)
    );
    const [endDate, setEndDate] = useState(
        new Date(new Date()).toISOString().slice(0, 10)
    );

    const metalsOptions = [
        { id: 1, label: 'GOLD', comId: '088691' },
        { id: 2, label: 'SILVER', comId: '084691' },
        { id: 3, label: 'COPPER', comId: '085692' }
    ];

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(startDate)
        // console.log(endDate)

        getApiData()
    }

    function getApiData() {
        // get positions data
        axios.get(
            `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_ALL/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
        )
            .then(res => {
                setPositionsData(res.data.dataset_data.data)
            })
            .catch(err => {
                console.log(err)
            });

        setTimeout(function () {
            //your code to be executed after 1 second
        }, 1000);
        // get changes data
        axios.get(
            `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_CHG/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
        )
            .then(res => {
                setChangesData(res.data.dataset_data.data)
            })
            .catch(err => {
                console.log(err)
            });
        setTimeout(function () {
            //your code to be executed after 1 second
        }, 1000);

        // get percent of interest data
        axios.get(
            `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_ALL_OI/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
        )
            .then(res => {
                setPercentOIData(res.data.dataset_data.data)
            })
            .catch(err => {
                console.log(err)
            });
        setTimeout(function () {
            //your code to be executed after 1 second
        }, 1000);

        // get number of traders data
        axios.get(
            `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_ALL_NT/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
        )
            .then(res => {
                setNumOfTradersData(res.data.dataset_data.data)
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={onSubmit} >
                    <Autocomplete
                        disablePortal
                        disabled={!commodityOptions}
                        id="commodity-input"
                        options={commodityOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Commodity" />}
                        onChange={(e, value) => {
                            // console.log(value)
                            setCommodityInput(value)
                        }}
                    />
                    <DatePicker
                        disablePortal
                        label="Start Date"
                        inputFormat="MM/dd/yyyy"
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(new Date(e).toISOString().slice(0, 10))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        disablePortal
                        label="End Date"
                        inputFormat="MM/dd/yyyy"
                        value={endDate}
                        onChange={(e) => {
                            setEndDate(new Date(e).toISOString().slice(0, 10))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button disabled={!commodityInput} type="submit" variant="contained">Submit</Button>

                </form>
                {
                    industryInput === 'METALS AND OTHERS' && positionsData ? (
                        <>
                            <MetalsTable metalName={commodityInput.label} metalType={'Positions'} columns={column_names} data={positionsData} />
                            <MetalsTable metalName={commodityInput.label} metalType={'Changes'} columns={column_names} data={changesData} />
                            <MetalsTable metalName={commodityInput.label} metalType={'Percent of Open Interest'} columns={column_names} data={percentOIData} />
                            <MetalsTable metalName={commodityInput.label} metalType={'Number Of Traders'} columns={column_names} data={numOfTradersData} />
                        </>
                    ) : (
                        ''
                    )
                }

                {
                    industryInput === 'FINANCIALS' && positionsData ? (
                        <>
                            <FinancialsTable name={commodityInput.label} type={'Positions'} columns={column_names} data={positionsData} />
                            <FinancialsTable name={commodityInput.label} type={'Changes'} columns={column_names} data={changesData} />
                            <FinancialsTable name={commodityInput.label} type={'Percent of Open Interest'} columns={column_names} data={percentOIData} />
                            <FinancialsTable name={commodityInput.label} type={'Number Of Traders'} columns={column_names} data={numOfTradersData} />
                        </>
                    ) : (
                        ''
                    )
                }


                {/* <MetalsPositions />
                <MetalsChanges />
                <MetalsPercentOI />
                <MetalsNumTrades /> */}

            </Box>
        </LocalizationProvider >
    );
}

export default Metals;
