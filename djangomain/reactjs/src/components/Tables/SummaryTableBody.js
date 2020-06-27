import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const summaryTableBody = (props) => {
    return (
        <TableBody>
            {props.bodyInfo.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.change}</TableCell>
                    <TableCell>{row.changePercent}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default summaryTableBody;
