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
        }, 2000);


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
                        id: 1, label: 'GOLD 088691', comId: '088691', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - GOLD (CMX) - Futures and Options (088691)",
                        description: "Commitment of Traders - GOLD (CMX) - Futures and Options Contract Market Code: 088691 Units: CONTRACTS OF 100 TROY OUNCES",
                    },
                    {
                        id: 2, label: 'SILVER 084691', comId: '084691', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - SILVER (CMX) - Futures and Options (084691)",
                        description: "Commitment of Traders - SILVER (CMX) - Futures and Options Contract Market Code: 084691 Units: CONTRACTS OF 5,000 TROY OUNCES",
                    },
                    {
                        id: 3, label: 'COPPER 085692', comId: '085692', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - COPPER- #1 (CMX) - Futures and Options (085692)",
                        description: "Commitment of Traders - COPPER- #1 (CMX) - Futures and Options Contract Market Code: 085692 Units: CONTRACTS OF 25,000 POUNDS",
                    },
                ]
            )
        }
        if (val?.label === 'FINANCIALS') {
            setCommodityOptions(
                [
                    {
                        id: 1, label: 'CAD 090741', comId: '090741', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - CANADIAN DOLLAR (CME) - Futures and Options (090741)",
                        description: "Commitment of Traders - CANADIAN DOLLAR (CME) - Futures and Options Contract Market Code: 090741 Units: CONTRACTS OF CAD 100,000",
                    },
                    {
                        id: 2, label: 'EURO FX 099741', comId: '099741', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - EURO FX (CME) - Futures and Options (099741)",
                        description: "Commitment of Traders - EURO FX (CME) - Futures and Options Contract Market Code: 099741 Units: CONTRACTS OF EUR 125,000",
                    },
                    {
                        id: 3, label: 'DJIA $10 124601', comId: '124601', oldDate: '2006-06-13', newDate: '2014-12-16', name: "Commitment of Traders - DOW JONES INDUSTRIAL AVERAGE (CBT) - Futures and Options (124601)",
                        description: "Commitment of Traders - DOW JONES INDUSTRIAL AVERAGE (CBT) - Futures and Options Contract Market Code:124601 Units:$10 X DJIA INDEX",
                    }, //no data - 2006-06-13 to 2014-12-16
                    {
                        id: 3, label: 'DOW JONES REAL ESTATE $100 124606', comId: '124606', oldDate: '2018-01-16', newDate: endDate, name: "Commitment of Traders - DOW JONES U.S. REAL ESTATE IDX (CBT) - Futures and Options (124606)",
                        description: "Commitment of Traders - DOW JONES U.S. REAL ESTATE IDX (CBT) - Futures and Options Contract Market Code: 124606 Units: $100 X DJ US REAL ESTATE INDEX",
                    },
                    {
                        id: 4, label: 'S&P 500 138741', comId: '138741', oldDate: '2006-06-13', newDate: '2021-09-14', name: "Commitment of Traders - S&P 500 STOCK INDEX (CME) - Futures and Options (138741)",
                        description: "Commitment of Traders - S&P 500 STOCK INDEX (CME) - Futures and Options Contract Market Code: 138741 Units: S&P 500 INDEX X $250.00",
                    }, //no data - 2006-06-13 to 2021-09-14
                    {
                        id: 5, label: 'NASDAQ-100 209741', comId: '209741', oldDate: '2006-06-13', newDate: '2015-06-16', name: "Commitment of Traders - NASDAQ-100 STOCK INDEX (CME) - Futures and Options (209741)",
                        description: "Commitment of Traders - NASDAQ-100 STOCK INDEX (CME) - Futures and Options Contract Market Code:209741 Units:NASDAQ 100 INDEX X $100",
                    }, //no data - 2006-06-13 to 2015-06-16
                    {
                        id: 6, label: 'USD INDEX 098662', comId: '098662', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - USD INDEX (ICUS) - Futures and Options (098662)",
                        description: "Commitment of Traders - USD INDEX (ICUS) - Futures and Options Contract Market Code: 098662 Units: U.S. DOLLAR INDEX X $1000",
                    },
                    {
                        id: 7, label: 'VIX FUTURES 1170E1', comId: '1170E1', oldDate: '2006-08-29', newDate: endDate, name: "Commitment of Traders - VIX FUTURES (E) - Futures and Options (1170E1)",
                        description: "Commitment of Traders - VIX FUTURES (E) - Futures and Options Contract Market Code: 1170E1 Units: $1000 X INDEX",
                    },
                    {
                        id: 8, label: 'BRITITSH POUNDS 096742', comId: '096742', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - BRITISH POUND (CME) - Futures and Options (096742)",
                        description: "Commitment of Traders - BRITISH POUND (CME) - Futures and Options Contract Market Code: 096742 Units: CONTRACTS OF GBP 62,500",
                    },
                    {
                        id: 9, label: 'RUSSELL E-MINI 239742', comId: '239742', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - RUSSELL E-MINI (CME) - Futures and Options (239742)",
                        description: "Commitment of Traders - RUSSELL E-MINI (CME) - Futures and Options Contract Market Code: 239742 Units: RUSSEL 2000 INDEX X $50",
                    },
                    {
                        id: 9, label: 'JAPANESE YEN (CME) 097741', comId: '097741', oldDate: '2006-06-13', newDate: endDate, name: "Commitment of Traders - JAPANESE YEN (CME) - Futures and Options (239742)",
                        description: "Commitment of Traders - JAPANESE YEN (CME) - Futures and Options Contract Market Code: 097741 Units: CONTRACTS OF JPY 12,500,000",
                    },
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
                            console.log(value)
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
                                    <Paper style={{ margin: '20px' }}>
                                        {/* <Typography variant='h5'>
                                            {commodityInput?.name}
                                        </Typography> */}
                                        <Typography variant='h5'>
                                            {commodityInput?.description}
                                        </Typography>
                                        <Typography variant='h6'>
                                            Oldest Date: {commodityInput?.oldDate}
                                        </Typography>
                                        <Typography variant='h6'>
                                            Newest Date: {commodityInput?.newDate}
                                        </Typography>
                                    </Paper>
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
                                    <Paper style={{ margin: '20px' }}>
                                        {/* <Typography variant='h5'>
                                            {commodityInput?.name}
                                        </Typography> */}
                                        <Typography variant='h5'>
                                            {commodityInput?.description}
                                        </Typography>
                                        <Typography variant='h6'>
                                            Oldest Date: {commodityInput?.oldDate}
                                        </Typography>
                                        <Typography variant='h6'>
                                            Newest Date: {commodityInput?.newDate}
                                        </Typography>
                                    </Paper>
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
