import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Icon,
  Popover,
  Switch,
  Button,
  LinearProgress,
  Divider
} from '@material-ui/core';
import { 
  createStyles, 
  makeStyles, 
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { getStats } from '../../store/actions/statsActions';


const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
        padding: '0.5rem',
        fontFamily: 'roboto'
    },
    invoice: {
        backgroundColor: '#3f51b5'
    },
    vendors: {
        backgroundColor: '#009688'
    },
    files: {
        backgroundColor: '#0d47a1'
    },
    amount: {
        backgroundColor: '#00695c'
    }
  }),
);

 function Stats({stats, getStats}) {

    useEffect(()=> {
        getStats();
    }, [])

    console.log('stats', stats)
    const classes = useStyles();
    return (
        <>
            {stats && stats.isLoaded===true?
                <Container maxWidth="sm">
                    <Paper className={classes.paper} elevation={3}>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemAvatar><Avatar className={classes.invoice}><Icon>dehaze</Icon></Avatar></ListItemAvatar>
                                <ListItemText primary={(stats.stats && stats.stats.invoiceCount )? stats.stats.invoiceCount:null} secondary="Total Invoices"/>
                                <IconButton>
                                    <Icon>open_in_new</Icon>
                                </IconButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemAvatar><Avatar className={classes.vendors}><Icon>topic</Icon></Avatar></ListItemAvatar>
                                <ListItemText primary={(stats.stats && stats.stats.vendorsCount )? stats.stats.vendorsCount:null} secondary="Total Vendors Registered"/>
                                <IconButton>
                                    <Icon>open_in_new</Icon>
                                </IconButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemAvatar><Avatar className={classes.files}><Icon>storage</Icon></Avatar></ListItemAvatar>
                                <ListItemText primary={(stats.stats && stats.stats.filesCount )? stats.stats.filesCount:null} secondary="Total Files Uploaded"/>
                                <IconButton>
                                    <Icon>open_in_new</Icon>
                                </IconButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemAvatar><Avatar className={classes.amount} ><Icon>attach_money</Icon></Avatar></ListItemAvatar>
                                <ListItemText primary={(stats.stats && stats.stats.invoiceAmount )? stats.stats.invoiceAmount:null} secondary="Total Amount in local Currency"/>
                                <IconButton>
                                    <Icon>open_in_new</Icon>
                                </IconButton>
                            </ListItem>
                        </List>
                        <Divider />
                    </Paper>
                </Container>
            :null}
        </>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return ({
        auth: state.auth,
        stats: state.stats
      })
};

export default connect(mapStateToProps, {getStats})(Stats);