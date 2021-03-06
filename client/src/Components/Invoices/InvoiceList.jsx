import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    TableBody,
    Button
} from '@material-ui/core';
import {
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import { getInvoices } from '../../store/actions/invoiceActions';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: '2rem',
            width: '100%',
        },
        container: {            
            maxHeight: 440,
        },
    }),
);

const columns = [
    { id: 'invoiceNumber', label: 'Invoice Numbers', minWidth: 50 },
    { id: 'documentNumber', label: 'Document Number', minWidth: 50 },
    {
        id: 'type',
        label: 'Type',
        minWidth: 50,
        align: 'right',
    },
    {
        id: 'netDueDt',
        label: 'Net due dt',
        minWidth: 130,
        align: 'right',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'docDate',
        label: 'Doc. Date',
        minWidth: 130,
        align: 'right',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'pstngDate',
        label: 'Pstng Date',
        minWidth: 130,
        align: 'right',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'amtInLocCur',
        label: 'Amt in loc.cur.',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'vendorCode',
        label: 'Vendor Code',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'vendorName',
        label: 'Vendor Name',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'vendorType',
        label: 'Vendor type',
        minWidth: 100,
        align: 'left',
    },
];

const InvoiceList = ({ invoices, getInvoices }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getInvoices();
    }, [])

    const handleChangePage = (event, newPage) => {
        getInvoices(page+1,rowsPerPage);
        setPage(newPage+1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices && invoices.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && new Date(value) instanceof Date ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

const mapStateToProps = (state) => {
    console.log(state)
    return ({
        invoices: state.invoice.valid.invoices,
        total: state.invoice.valid.total
    })
};

export default connect(mapStateToProps, { getInvoices })(InvoiceList);
