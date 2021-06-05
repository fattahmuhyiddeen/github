import { useState } from 'react';
import {
  Grid, Switch,
} from '@material-ui/core';

export default (props) => {
  const { hook } = props;
  const [isShowDetail, setIsShowDetail] = useState(false);

  const topTopic = [];
  const topLanguage = [];

  hook.history?.forEach((h) => {
    if (h.parameters?.language) {
      const indexLanguage = topLanguage.findIndex((t) => t.text === h.parameters.language);
      if (indexLanguage !== -1) topLanguage[indexLanguage].value++;
      else topLanguage.push({ text: h.parameters.language, value: 1 });
    }

    if (h.parameters?.topic) {
      const indexTopic = topTopic.findIndex((t) => t.text === h.parameters.topic);
      if (indexTopic !== -1) topTopic[indexTopic].value++;
      else topTopic.push({ text: h.parameters.topic, value: 1 });
    }
  });

  topTopic.sort((a, b) => b.value - a.value);
  topLanguage.sort((a, b) => b.value - a.value);
  return (
    <>
      <h3>Admin View</h3>

      <div className="row">
        <div>
          <div className="small-title"> Total Search:</div>
          <div>
            {hook.history?.length || 0}
            {' '}
            times
          </div>
        </div>
        <div>
          <div className="small-title">Top 5 topics</div>
          {topTopic.slice(0, 5).map((t) => (
            <div className="row">
              <div>{t.text}</div>
              <div>{t.value}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="small-title">Top 5 languages</div>
          {topLanguage.slice(0, 5).map((t) => (
            <div className="row">
              <div>{t.text}</div>
              <div>{t.value}</div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item style={{ color: !isShowDetail ? 'magenta' : 'grey' }}>Hide Detail</Grid>
        <Grid item>
          <Switch checked={isShowDetail} onChange={(e) => setIsShowDetail(e.target.checked)} />
        </Grid>
        <Grid item style={{ color: isShowDetail ? 'magenta' : 'grey' }}>Show Detail</Grid>
      </Grid>
      <div className="result">
        {hook.history?.map((r) => {
          const display = { ...r };
          if (!isShowDetail) display.results = r.results?.map((d) => d.html_url);
          else display.results = r.results;
          return <pre>{JSON.stringify(display, undefined, 2)}</pre>;
        })}
      </div>
    </>
  );
};
