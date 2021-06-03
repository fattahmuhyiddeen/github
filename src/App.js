import { useEffect, useState } from 'react';
import {
  TablePagination, Select, MenuItem, TextField, FormControl, InputLabel, Button, CircularProgress,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  input: {
    marginRight: '2em',
  },
}));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [result, setResult] = useState({});
  const [language, setLanguage] = useState(0);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const search = async () => {
    if (!topic && !language) return;
    setIsLoading(true);
    let url = 'https://api.github.com/search/repositories?q=';
    if (topic) url += topic;
    if (topic && language) url += '+';
    if (language) url += `language:${language}`;
    const response = await fetch(`${url}&per_page=${perPage}&page=${page}`);
    setResult(await response.json());
    setIsLoading(false);
  };

  useEffect(() => {
    search();
  }, [page, perPage]);

  const handleChangeLanguage = (e) => setLanguage(e.target.value);
  const handleChangeTopic = (e) => setTopic(e.target.value);

  return (
    <div>
      <FormControl className={classes.input}>
        <InputLabel shrink>Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={handleChangeLanguage}
        >
          <MenuItem value={0}>Search Language</MenuItem>
          <MenuItem value="HTML">HTML</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="Ruby">Ruby</MenuItem>
          <MenuItem value="kotlin">Kotlin</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
          <MenuItem value="js">JS</MenuItem>
        </Select>
      </FormControl>
      <TextField className={classes.input} size="small" label="Search Topic" onChange={handleChangeTopic} value={topic} />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Search />}
        onClick={search}
        disabled={!language && !topic}
      >
        Search
      </Button>
      <TablePagination
        page={page}
        onChangeRowsPerPage={(e) => setPerPage(parseInt(e.target.value, 10))}
        rowsPerPage={perPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
        onChangePage={(_, v) => setPage(v)}
        count={Math.ceil(((result?.total_count) || 0) / perPage)}
      />
      {isLoading && <div style={{margin: '1em'}}><CircularProgress /></div>}
      <div className="result">
        {result?.items?.map((r) => <pre>{JSON.stringify(r, undefined, 2)}</pre>)}
      </div>
    </div>
  );
}

export default App;
