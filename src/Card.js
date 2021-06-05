import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent, Typography, Card, Avatar,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <div onClick={() => window.open(data.html_url, '_blank')} className="card-container">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>{data.language}</Typography>
          <Typography variant="h5" component="h2">{data.full_name}</Typography>
          <div className="row">
            <Avatar src={data.owner?.avatar_url} />
            <Typography className={classes.pos} color="textSecondary">{data.owner?.login}</Typography>
          </div>
          <Typography variant="body2" component="p">{data.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
