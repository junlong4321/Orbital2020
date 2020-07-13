import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const summaryTableBody = (props) => {
    console.log('summaryTableBody re-rendered');
    return (
        <TableBody>
            {props.bodyInfo.map((row) => {
                const price = parseFloat(row.change);
                console.log(price);
                let isPriceNegative = false;
                if (price < 0) {
                    isPriceNegative = true;
                }

                return (
                    <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell
                            style={
                                isPriceNegative
                                    ? { color: 'red' }
                                    : { color: 'green' }
                            }
                        >
                            {row.change}
                        </TableCell>
                        <TableCell
                            style={
                                isPriceNegative
                                    ? { color: 'red' }
                                    : { color: 'green' }
                            }
                        >
                            {row.changePercent}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export default React.memo(summaryTableBody);
