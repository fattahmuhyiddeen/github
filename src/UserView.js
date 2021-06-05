import {
  TablePagination, Select, MenuItem, TextField, FormControl, InputLabel, Button,
  CircularProgress, Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import config from './config';

const useStyles = makeStyles(() => ({
  input: {
    marginRight: '2em',
  },
}));
export default (props) => {
  const classes = useStyles();
  const { hook } = props;
  return (
    <>
      <Typography variant="h5" component="h5">User View</Typography>
      <div className="row center">
        <FormControl className={classes.input}>
          <InputLabel shrink>{hook.language === 0 ? '' : 'Language'}</InputLabel>
          <Select value={hook.language} onChange={(e) => hook.setLanguage(e.target.value)}>
            <MenuItem value={0}>Language</MenuItem>
            {config.languages.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          className={classes.input}
          size="small"
          id="language"
          label="Topic"
          onChange={(e) => hook.setTopic(e.target.value)}
          value={hook.topic}
        />
        <Button
          variant="contained"
          color="secondary"
          id="search"
          startIcon={<Search />}
          onClick={hook.search}
          disabled={!hook.language && !hook.topic}
        >
          Search
        </Button>
      </div>
      <div className="row center">
        {!!hook.result?.total_count && (
        <TablePagination
          page={hook.page}
          onChangeRowsPerPage={(e) => hook.setPerPage(parseInt(e.target.value, 10))}
          rowsPerPage={hook.perPage}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
          onChangePage={(_, v) => hook.setPage(v)}
          count={Math.ceil(((hook.result?.total_count) || 0) / hook.perPage)}
        />
        )}
      </div>
      {hook.isLoading && <div className="loading"><CircularProgress /></div>}
      {!!hook.result?.items && (
      <div className="result">
        {hook.result?.items?.map((r) => <Card data={r} />)}
      </div>
      )}
    </>
  );
};
