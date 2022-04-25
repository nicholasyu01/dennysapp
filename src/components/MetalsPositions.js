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
    "Open Interest",
    "Producer/Merchant/Processor/User Longs",
    "Producer/Merchant/Processor/User Shorts",
    "Swap Dealer Longs",
    "Swap Dealer Shorts",
    "Swap Dealer Spreads",
    "Money Manager Longs",
    "Money Manager Shorts",
    "Money Manager Spreads",
    "Other Reportable Longs",
    "Other Reportable Shorts",
    "Other Reportable Spreads",
    "Total Reportable Longs",
    "Total Reportable Shorts",
    "Non Reportable Longs",
    "Non Reportable Shorts"
];

const data = [
    [
        "2022-04-05",
        745645.0,
        38564.0,
        95566.0,
        83413.0,
        325029.0,
        56460.0,
        170238.0,
        47567.0,
        46576.0,
        175766.0,
        32705.0,
        117676.0,
        688694.0,
        721579.0,
        56951.0,
        24066.0
    ],
];

function MetalsPositions(props) {
    const { } = props;

    return (
        <>
            <Paper style={{ width: '100%' }}>
                Gold - Positions
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

export default MetalsPositions;
