import { useEffect, useState } from 'react';
import { TablePagination, Select, MenuItem, TextField } from '@material-ui/core';

function App() {
  const [result, setResult] = useState({});
  const [language, setLanguage] = useState(0);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  useEffect(()=>{
    search();
  },[page,perPage])

  const search = async() => {
    const isTopic = !!topic;
    // const response = await fetch('https://api.github.com/search/repositories?q=topic+language:js', {
    // const response = await fetch('https://api.github.com/search/repositories?q=language:js', {
    const response = await fetch(`https://api.github.com/search/topics?q=microsoft&per_page=${perPage}&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    });
    setResult(await response.json());
  }

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
    setTopic('');
  };
  const handleChangeTopic = (e) => {
    setTopic(e.target.value);
    setLanguage(0);
  };
  return (
    <div>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={handleChangeLanguage}
        >
          <MenuItem value={0}>Search Language</MenuItem>
          <MenuItem value={'HTML'}>HTML</MenuItem>
          <MenuItem value={'java'}>Java</MenuItem>
          <MenuItem value={'Ruby'}>Ruby</MenuItem>
          <MenuItem value={'kotlin'}>Kotlin</MenuItem>
          <MenuItem value={'swift'}>Swift</MenuItem>
          <MenuItem value={'js'}>JS</MenuItem>
        </Select>
         <TextField label="Search Topic" onChange={handleChangeTopic} value={topic} />
      <TablePagination
        page={page}
        onChangeRowsPerPage={e=>setPerPage(parseInt(e.target.value, 10))}
        rowsPerPage={perPage}
        labelDisplayedRows={({ from, to, count }) =>`${from}-${to} of ${count}`}
        onChangePage={(_,v)=>setPage(v)}
        count={Math.ceil(((result?.total_count)||0) / perPage)}
      />
      <div className="result">
        {result?.items?.map((r, index) => (
          <>
            <div>{index + 1 + (page * perPage)}</div>
            <pre>{JSON.stringify(r, undefined, 2)}</pre>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
