import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberTrades } from './numberTrades';
import { tickers } from './tickers';
// import { CFTC_metadata } from './CFTC_metadata';
import { DetailsList, } from '@fluentui/react/lib/DetailsList';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { TextField } from '@fluentui/react/lib/TextField';
import { List } from '@fluentui/react/lib/List';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';

import { getRTL } from '@fluentui/react/lib/Utilities';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from '@fluentui/react/lib/Styling';
// import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;


const classNames = mergeStyleSets({
    itemCell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            minHeight: 54,
            padding: 10,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${semanticColors.bodyDivider}`,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight },
            },
        },
    ],
    itemImage: {
        flexShrink: 0,
    },
    itemContent: {
        marginLeft: 10,
        overflow: 'hidden',
        flexGrow: 1,
    },
    itemName: [
        fonts.xLarge,
        {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    ],
    itemIndex: {
        fontSize: fonts.small.fontSize,
        color: palette.neutralTertiary,
        marginBottom: 10,
    },
    chevron: {
        alignSelf: 'center',
        marginLeft: 10,
        color: palette.neutralTertiary,
        fontSize: fonts.large.fontSize,
        flexShrink: 0,
    },
});

function Dashboard() {
    const [data, setData] = useState(numberTrades);
    const [items, setItems] = useState([{
        key: 1,
        name: 2,
        value: 3,
    }]);
    const [cftcData, setCftcData] = useState();


    const columns = [
        { key: '1', name: 'Date', fieldName: 'a', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '2', name: 'Total Traders', fieldName: 'b', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '3', name: 'Producer/Merchant/Processor/User Longs', fieldName: 'c', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '4', name: 'Producer/Merchant/Processor/User Shorts', fieldName: 'd', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '5', name: 'Swap Dealer Longs', fieldName: 'e', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '6', name: 'Swap Dealer Shorts', fieldName: 'f', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '7', name: 'Swap Dealer Spreads', fieldName: 'g', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '8', name: 'Money Manager Longs', fieldName: 'h', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '9', name: 'Money Manager Shorts', fieldName: 'i', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '10', name: 'Money Manager Spreads', fieldName: 'j', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '11', name: 'Other Reportable Longs', fieldName: 'k', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '12', name: 'Other Reportable Shorts', fieldName: 'l', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '13', name: 'Other Reportable Spreads', fieldName: 'm', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '14', name: 'Total Reportable Longs', fieldName: 'n', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: '15', name: 'Total Reportable Shorts', fieldName: 'o', minWidth: 100, maxWidth: 200, isResizable: true },

    ];

    useEffect(() => {
        var t = []
        for (var i in numberTrades.dataset.data[0]) {
            t.push({
                key: numberTrades.dataset.data[0][i],
                name: numberTrades.dataset.data[0][i],
                value: numberTrades.dataset.data[0][i],
                test: 'test'
            });
        }
        setItems(t)

        axios.get(
            // "https://data.nasdaq.com/api/v3/datasets/CFTC/085692_FO_ALL_NT?start_date=2022-03-15&end_date=2022-03-29&api_key=G7XE3KtbFRSk-jPHsBYi"
        )
            .then(res => {
                setCftcData(res)
            })
            .catch(err => {
                console.log(err)
            });

        // axios.get(
        //     "./CFTC_metadata.json"
        // )
        //     .then(res => {

        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
        console.log(data)
    }, []);

    const onRenderCell = (item, index) => {
        return (
            <div className={classNames.itemCell} data-is-focusable={true}>
                <div className={classNames.itemContent}>
                    <div className={classNames.itemName}>{item.name}</div>
                    <div className={classNames.itemIndex}>{`Item ${index}`}</div>
                    <div>{item.description}</div>
                </div>
            </div>
        );
    };



    return (
        <div style={{ display: 'flex' }}>
            <div>
                <List items={tickers}
                    onRenderCell={onRenderCell}
                />
            </div>

            {/* <div>{JSON.stringify(numberTrades)}</div> */}
            <DetailsList
                compact={true}
                items={[{
                    key: 1,
                    a: numberTrades.dataset.data[0][0],
                    b: numberTrades.dataset.data[0][1],
                    c: numberTrades.dataset.data[0][2],
                    d: numberTrades.dataset.data[0][3],
                    e: numberTrades.dataset.data[0][4],
                    f: numberTrades.dataset.data[0][5],
                    g: numberTrades.dataset.data[0][6],
                    h: numberTrades.dataset.data[0][7],
                    i: numberTrades.dataset.data[0][8],
                    j: numberTrades.dataset.data[0][9],
                    k: numberTrades.dataset.data[0][10],
                    l: numberTrades.dataset.data[0][11],
                    m: numberTrades.dataset.data[0][12],
                    n: numberTrades.dataset.data[0][13],
                    o: numberTrades.dataset.data[0][14],
                }]}
                columns={columns}
            // setKey="set"
            // layoutMode={DetailsListLayoutMode.justified}
            // selection={this._selection}
            // selectionPreservedOnEmptyClick={true}
            // onItemInvoked={this._onItemInvoked}
            // ariaLabelForSelectionColumn="Toggle selection"
            // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            // checkButtonAriaLabel="select row"
            />
        </div>
    );
}

export default Dashboard;
