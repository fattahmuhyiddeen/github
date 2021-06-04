import { useState } from 'react';
import {
  Grid, Switch,
} from '@material-ui/core';

export default (props) => {
  const { hook } = props;
  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <>
      <h3>Admin View</h3>
      <Grid component="label" container alignItems="center" justify="flex-end" spacing={1}>
        <Grid item style={{ color: !isShowDetail ? 'magenta' : 'grey' }}>Hide Detail</Grid>
        <Grid item>
          <Switch checked={isShowDetail} onChange={(e) => setIsShowDetail(e.target.checked)} />
        </Grid>
        <Grid item style={{ color: isShowDetail ? 'magenta' : 'grey' }}>Show Detail</Grid>
      </Grid>
      <div className="result">
        {hook.history?.map((r) => {
          const display = { timestamp: r.timestamp, parameters: {} };
          if (r.language) display.parameters.language = r.language;
          if (r.topic) display.parameters.topic = r.topic;
          if (!isShowDetail) {
            display.data = r.data.map((d) => d.html_url);
          } else {
            display.data = r.data;
          }
          return <pre>{JSON.stringify(display, undefined, 2)}</pre>;
        })}
      </div>
    </>
  );
};
