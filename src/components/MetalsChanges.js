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
    "Open Interest - Change",
    "Producer/Merchant/Processor/User Longs - Change",
    "Producer/Merchant/Processor/User Shorts - Change",
    "Swap Dealer Longs - Change",
    "Swap Dealer Shorts - Change",
    "Swap Dealer Spreads - Change",
    "Money Manager Longs - Change",
    "Money Manager Shorts - Change",
    "Money Manager Spreads - Change",
    "Other Reportable Longs - Change",
    "Other Reportable Shorts - Change",
    "Other Reportable Spreads - Change",
    "Total Reportable Longs - Change",
    "Total Reportable Shorts - Change",
    "Non Reportable Longs - Change",
    "Non Reportable Shorts - Change"
];

const data = [
    [
        "2022-03-29",
        -60327.0,
        -11706.0,
        -27032.0,
        -5858.0,
        772.0,
        -9499.0,
        -2504.0,
        1361.0,
        3517.0,
        874.0,
        255.0,
        -30501.0,
        -55677.0,
        -61126.0,
        -4650.0,
        800.0
    ]
];

function MetalsChanges(props) {
    const { } = props;

    return (
        <>
            <Paper style={{ width: '100%' }}>
                Gold - Changes
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

export default MetalsChanges;
