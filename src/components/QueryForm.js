import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberTrades } from './numberTrades';
import { tickers } from './tickers';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import MetalsTable from './MetalsTable.js';
import FinancialsTable from './FinancialsTable';
const formStyle = {
    display: 'flex'
}


function QueryForm() {

    const [industryInput, setIndustryInput] = useState();
    const industryOptions = [
        { id: 1, label: 'METALS AND OTHERS' },
        { id: 2, label: 'FINANCIALS' }
    ];
    const [commodityOptions, setCommodityOptions] = useState();

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

    const [loading, setLoading] = useState(false);
    const [positionsError, setPositionsError] = useState(false);
    const [changesError, setChangesError] = useState(false);
    const [poiError, setPoiError] = useState(false);
    const [notError, setNotError] = useState(false);

    const [positionsLoading, setPositionsLoading] = useState(false);
    const [changesLoading, setChangesLoading] = useState(false);
    const [poiLoading, setPoiLoading] = useState(false);
    const [notLoading, setNotLoading] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        setPositionsData();
        setChangesData();
        setPercentOIData();
        setNumOfTradersData();
        setPositionsError(false);
        setChangesError(false);
        setPoiError(false);
        setNotError(false);
        setPositionsLoading(false);
        setChangesLoading(false);
        setPoiLoading(false);
        setNotLoading(false);

        getApiData();
    }

    function getApiData() {
        setPositionsLoading(true);
        setChangesLoading(true);
        setPoiLoading(true);
        setNotLoading(true);

        setTimeout(function () {
            //your code to be executed after 1 second


            // get changes data
            axios.get(
                `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_ALL/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
            )
                .then(res => {
                    setPositionsData(res.data.dataset_data.data)
                    setPositionsLoading(false);
                })
                .catch(err => {
                    setPositionsError(true);
                    setPositionsLoading(false);
                    console.log(err)
                });

            // get changes data
            axios.get(
                `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_CHG/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
            )
                .then(res => {
                    setChangesData(res.data.dataset_data.data)
                    setChangesLoading(false);
                })
                .catch(err => {
                    setChangesError(true);
                    setChangesLoading(false);
                    console.log(err)
                });

            // get percent of interest data
            axios.get(
                `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_ALL_OI/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
            )
                .then(res => {
                    setPercentOIData(res.data.dataset_data.data)
                    setPoiLoading(false);
                })
                .catch(err => {
                    setPoiError(true);
                    setPoiLoading(false);
                    console.log(err)
                });

            // get number of traders data
            axios.get(
                `https://data.nasdaq.com/api/v3/datasets/CFTC/${commodityInput.comId}_FO_ALL_NT/data.json?start_date=${startDate}&end_date=${endDate}&api_key=G7XE3KtbFRSk-jPHsBYi`
            )
                .then(res => {
                    setNumOfTradersData(res.data.dataset_data.data)
                    setNotLoading(false);
                })
                .catch(err => {
                    setNotError(true);
                    setNotLoading(false);
                    console.log(err)
                });
            setLoading(false)
        }, 3000);


    }

    const handleIndustryChange = (e, val) => {
        setPositionsData();
        setChangesData();
        setPercentOIData();
        setNumOfTradersData();
        setCommodityInput();
        setIndustryInput(val?.label);
        if (val?.label === 'METALS AND OTHERS') {
            setCommodityOptions(
                [
                    {
                        id: 1, label: 'GOLD', comId: '088691', oldDate: '2006-06-13', newDate: 'Today', name: "Commitment of Traders - GOLD (CMX) - Futures and Options (088691)",
                        description: "Commitment of Traders - GOLD (CMX) - Futures and Options<br><br>Contract Market Code: 088691<br><br>Units: CONTRACTS OF 100 TROY OUNCES",
                    },
                    {
                        id: 2, label: 'SILVER', comId: '084691', oldDate: '2006-06-13', newDate: 'Today', name: "Commitment of Traders - SILVER (CMX) - Futures and Options (084691)",
                        description: "Commitment of Traders - SILVER (CMX) - Futures and Options<br><br>Contract Market Code: 084691<br><br>Units: CONTRACTS OF 5,000 TROY OUNCES",
                    },
                    { id: 3, label: 'COPPER', comId: '085692', oldDate: '2006-06-13', newDate: 'Today' },
                ]
            )
        }
        if (val?.label === 'FINANCIALS') {
            setCommodityOptions(
                [
                    { id: 1, label: 'CAD', comId: '090741', oldDate: '2006-06-13', newDate: 'Today' },
                    { id: 2, label: 'EURO FX', comId: '099741', oldDate: '2006-06-13', newDate: 'Today' },
                    { id: 3, label: 'DIJA-10', comId: '124601', oldDate: '2006-06-13', newDate: '2014-12-16' }, //no data - 2006-06-13 to 2014-12-16
                    { id: 3, label: 'DIJA-100', comId: '124606', oldDate: '2018-01-16', newDate: 'Today' },
                    { id: 4, label: 'S&P 500', comId: '138741', oldDate: '2006-06-13', newDate: '2021-09-14' }, //no data - 2006-06-13 to 2021-09-14
                    { id: 5, label: 'NASDAQ-100', comId: '209741', oldDate: '2006-06-13', newDate: '2015-06-16' }, //no data - 2006-06-13 to 2015-06-16
                    { id: 6, label: 'USD INDEX', comId: '098662', oldDate: '2006-06-13', newDate: 'Today' },
                    { id: 7, label: 'VIX FUTURES', comId: '1170E1', oldDate: '2006-08-29', newDate: 'Today' },
                ]
            )
        }
        if (val === undefined) {
            setCommodityOptions([])
        }

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper style={{ margin: '20px', padding: '20px' }}>

                <form onSubmit={onSubmit} style={formStyle} >
                    <Autocomplete
                        disablePortal
                        id="industry-input"
                        options={industryOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Industry" />}
                        onChange={handleIndustryChange}
                        disableClearable={true}
                    />
                    <Autocomplete
                        disablePortal
                        disabled={!commodityOptions}
                        id="commodity-input"
                        options={commodityOptions ? commodityOptions : []}
                        inputValue={commodityInput ? commodityInput.label : ''}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Commodity" />}
                        onChange={(e, value) => {
                            // console.log(value)
                            setPositionsData();
                            setChangesData();
                            setPercentOIData();
                            setNumOfTradersData();
                            setCommodityInput(value);
                        }}
                        disableClearable={true}
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
            </ Paper>
            {
                loading ? (
                    <Paper style={{ margin: '20px', padding: '20px' }}>
                        <CircularProgress />
                    </Paper>
                ) : (
                    <>
                        {
                            industryInput === 'METALS AND OTHERS' && (positionsData || changesData || percentOIData || numOfTradersData) ? (
                                <>
                                    <MetalsTable metalName={commodityInput?.label} metalType={'Positions'} data={positionsData}
                                        errorState={positionsError} loading={positionsLoading} />
                                    <MetalsTable metalName={commodityInput?.label} metalType={'Changes'} data={changesData}
                                        errorState={changesError} loading={changesLoading} />
                                    <MetalsTable metalName={commodityInput?.label} metalType={'Percent of Open Interest'} data={percentOIData}
                                        errorState={poiError} loading={poiLoading} />
                                    <MetalsTable metalName={commodityInput?.label} metalType={'Number Of Traders'} data={numOfTradersData}
                                        errorState={notError} loading={notLoading} />
                                </>
                            ) : (
                                <>
                                    {
                                        industryInput === 'METALS AND OTHERS' && (positionsError && changesError && poiError && notError) ?
                                            <Paper style={{ margin: '20px', padding: '20px' }}>
                                                <Alert severity="error">Error Occured. Please Try Again</Alert>
                                            </Paper> : ''
                                    }
                                </>
                            )
                        }

                        {
                            industryInput === 'FINANCIALS' && (positionsData || changesData || percentOIData || numOfTradersData) ? (
                                <>
                                    <FinancialsTable name={commodityInput?.label} type={'Positions'} data={positionsData}
                                        errorState={positionsError} loading={positionsLoading} />
                                    <FinancialsTable name={commodityInput?.label} type={'Changes'} data={changesData}
                                        errorState={changesError} loading={changesLoading} />
                                    <FinancialsTable name={commodityInput?.label} type={'Percent of Open Interest'} data={percentOIData}
                                        errorState={poiError} loading={poiLoading} />
                                    <FinancialsTable name={commodityInput?.label} type={'Number Of Traders'} data={numOfTradersData}
                                        errorState={notError} loading={notLoading} />
                                </>
                            ) : (
                                <>
                                    {
                                        industryInput === 'FINANCIALS' && (positionsError && changesError && poiError && notError) ?
                                            <Paper style={{ margin: '20px', padding: '20px' }}>
                                                <Alert severity="error">Error Occured. Please Try Again</Alert>

                                            </Paper> : ''
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
        </LocalizationProvider >
    );
}

export default QueryForm;
