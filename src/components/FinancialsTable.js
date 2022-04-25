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

const financialsColumns = [
    "Date",
    // "Open Interest",
    "Dealer Longs",
    "Dealer Shorts",
    "Dealer Differnece",
    // "Dealer Spreads", // offsets from metals therefore columns not compatable
    "Asset Manager Longs",
    "Asset Manager Shorts",
    "Asset Differnece",
    // "Asset Manager Spreads",
    "Leveraged Funds Longs",
    "Leveraged Funds Shorts",
    "Leveraged Difference",
    // "Leveraged Funds Spreads",
    "Other Reportable Longs",
    "Other Reportable Shorts",
    "Other Differnece",
    // "Other Reportable Spreads",
    // "Total Reportable Longs",
    // "Total Reportable Shorts",
    // "Non Reportable Longs",
    // "Non Reportable Shorts"
]

function FinancialsTable(props) {
    const { name, type, columns, data } = props;

    return (
        <>
            <Paper style={{ width: '100%' }}>
                <Typography variant='h5'>
                    {name} - {type}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {
                                    financialsColumns?.map((col) => {
                                        return (
                                            <TableCell>{col}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => {
                                // console.log(row)
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

                                            <TableCell align="left">{row[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[5] - row[6]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            {/* <TableCell align="right">{row[6]}</TableCell> */}
                                            <TableCell align="left">{row[8].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[9].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[8] - row[9]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            {/* <TableCell align="right">{row[9]}</TableCell> */}
                                            <TableCell align="left">{row[11].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{row[12]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            <TableCell align="left">{(Number(row[11] - row[12]).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
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

export default FinancialsTable;
