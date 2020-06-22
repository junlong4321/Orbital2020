import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const summaryTableHead = (props) => {
    return (
        <TableHead>
            <TableRow>
                {props.headings.map(heading => (
                        <TableCell key={props.headings.indexOf(heading)}>{heading}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        
    )
}

export default summaryTableHead;