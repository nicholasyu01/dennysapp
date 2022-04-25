import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberTrades } from './numberTrades';
import { tickers } from './tickers';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const column_names = [
    "Date",
    "Open Interest - % of OI",
    "Producer/Merchant/Processor/User Longs - % of OI",
    "Producer/Merchant/Processor/User Shorts - % of OI",
    "Swap Dealer Longs - % of OI",
    "Swap Dealer Shorts - % of OI",
    "Swap Dealer Spreads - % of OI",
    "Money Manager Longs - % of OI",
    "Money Manager Shorts - % of OI",
    "Money Manager Spreads - % of OI",
    "Other Reportable Longs - % of OI",
    "Other Reportable Shorts - % of OI",
    "Other Reportable Spreads - % of OI",
    "Total Reportable Longs - % of OI",
    "Total Reportable Shorts - % of OI",
    "Non Reportable Longs - % of OI",
    "Non Reportable Shorts - % of OI"
];

const data = [
    [
        "2022-03-29",
        100.0,
        4.9,
        12.2,
        11.1,
        43.9,
        8.6,
        22.1,
        5.1,
        6.8,
        23.6,
        4.2,
        15.8,
        92.9,
        96.5,
        7.1,
        3.5
    ]
];

function MetalsPercentOI(props) {
    const { } = props;

    return (
        <>
            <Paper style={{ width: '100%' }}>
                Gold - MetalsPercentOI
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {
                                    column_names.map((col) => {
                                        return (
                                            <TableCell align="left">{col}</TableCell>
                                        )
                                    })
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => {
                                console.log(row)
                                return (
                                    <>
                                        <TableRow
                                            key={row[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row[0]}
                                            </TableCell>
                                            <TableCell align="right">{row[1]}</TableCell>
                                            <TableCell align="right">{row[2]}</TableCell>
                                            <TableCell align="right">{row[3]}</TableCell>
                                            <TableCell align="right">{row[4]}</TableCell>
                                            <TableCell align="right">{row[5]}</TableCell>
                                            <TableCell align="right">{row[6]}</TableCell>
                                            <TableCell align="right">{row[7]}</TableCell>
                                            <TableCell align="right">{row[8]}</TableCell>
                                            <TableCell align="right">{row[9]}</TableCell>
                                            <TableCell align="right">{row[10]}</TableCell>
                                            <TableCell align="right">{row[11]}</TableCell>
                                            <TableCell align="right">{row[12]}</TableCell>
                                            <TableCell align="right">{row[13]}</TableCell>
                                            <TableCell align="right">{row[14]}</TableCell>
                                            <TableCell align="right">{row[15]}</TableCell>
                                            <TableCell align="right">{row[16]}</TableCell>
                                        </TableRow>
                                    </>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default MetalsPercentOI;
