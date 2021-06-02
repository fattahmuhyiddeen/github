import {useEffect, useState} from 'react';
import {Pagination} from '@material-ui/lab';
import {TablePagination} from '@material-ui/core';
import './App.css';


function App() {
  const [result, setResult] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  useEffect(()=>{
    search();
  },[page,perPage])

  const search = async() => {
    // const response = await fetch('https://api.github.com/search/repositories?q=language:js', {
    const response = await fetch(`https://api.github.com/search/topics?q=js&per_page=${perPage}&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    });
    const data = await response.json();
    setResult(data);
  }
  return (
    <div>
      <TablePagination page={page} onChangeRowsPerPage={e=>setPerPage(parseInt(e.target.value, 10))} rowsPerPage={perPage} onChangePage={(_,b)=>setPage(b)} count={((result?.total_count)||0)/perPage} color="primary" />
      {result?.items?.map(r => (
        <pre>{JSON.stringify(r, undefined, 2)}</pre>
      ))}
    </div>
  );
}

export default App;
