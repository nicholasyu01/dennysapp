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
import Typography from '@mui/material/Typography';


function MetalsTable(props) {
    const { metalName, metalType, columns, data } = props;


    return (
        <>
            <Paper style={{ width: '100%' }}>
                <Typography variant='h5'>
                    {metalName} - {metalType}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns?.map((col) => {
                                        return (
                                            <TableCell>{col}</TableCell>
                                        )
                                    })
                                }
                                {/* <TableCell>Date</TableCell>
                                <TableCell align="right">Total Traders</TableCell>
                                <TableCell align="right">Producer/Merchant/Processor/User Longs</TableCell>
                                <TableCell align="right">Producer/Merchant/Processor/User Shorts</TableCell>
                                <TableCell align="right">Swap Dealer Longs</TableCell>
                                <TableCell align="right">Swap Dealer Shorts</TableCell>
                                <TableCell align="right">Swap Dealer Spreads</TableCell>
                                <TableCell align="right">Money Manager Longs</TableCell>
                                <TableCell align="right">Money Manager Shorts</TableCell>
                                <TableCell align="right">Money Manager Spreads</TableCell>
                                <TableCell align="right">Other Reportable Longs</TableCell>
                                <TableCell align="right">Other Reportable Shorts</TableCell>
                                <TableCell align="right">Other Reportable Spreads</TableCell>
                                <TableCell align="right">Total Reportable Longs</TableCell>
                                <TableCell align="right">Total Reportable Shorts</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => {
                                console.log(row)
                                return (
                                    <>
                                        <TableRow
                                            key={row[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row[0]}
                                            </TableCell>
                                            {/* <TableCell align="right">{row[1]}</TableCell> */}
                                            <TableCell align="left">{row[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[2] - row[3]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>

                                            <TableCell align="left">{row[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[4] - row[5]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            {/* <TableCell align="right">{row[6]}</TableCell> */}
                                            <TableCell align="left">{row[7].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[8].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[7] - row[8]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            {/* <TableCell align="right">{row[9]}</TableCell> */}
                                            <TableCell align="left">{row[10].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[11].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[10] - row[11]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            {/* <TableCell align="right">{row[12]}</TableCell> */}
                                            {/* <TableCell align="right">{row[13]}</TableCell>
                                            <TableCell align="right">{row[14]}</TableCell>
                                            <TableCell align="right">{row[15]}</TableCell>
                                            <TableCell align="right">{row[16]}</TableCell> */}
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

export default MetalsTable;
