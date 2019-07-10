import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw"
  },
  paper: {
    height: 80,
    width: 180,
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    padding: "0.5rem"
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const valueStyle = { color: "#210bbf" };

export default function UserDetails({ user, onReposClick }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              <span>Name: </span>
              <br />
              <span style={valueStyle}>{user.name}</span>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <span>Joined: </span>
              <br />
              <span style={valueStyle}>
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <span>Repos count: </span>
              <br />
              <span style={valueStyle}>{user.public_repos}</span>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <span>Location: </span>
              <br />
              <span style={valueStyle}>{user.location}</span>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
