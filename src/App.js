import {useEffect, useState} from 'react';
import './App.css';

const PER_PAGE = 10;

function App() {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(()=>{
    search();
  },[])
  const search = async() => {
    // const response = await fetch('https://api.github.com/search/repositories?q=language:js', {
    const response = await fetch(`https://api.github.com/search/topics?q=js&per_page=${PER_PAGE}&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    });
    const data = await response.json();
    setResult(data);
  }
  return (
    <div>
      {result?.items?.map(r => (
        <pre>{JSON.stringify(r, undefined, 2)}</pre>
      ))}
    </div>
  );
}

export default App;
