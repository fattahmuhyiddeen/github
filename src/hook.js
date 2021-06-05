import { useEffect, useState } from 'react';

export default () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem('history')));
    } catch (e) {
      alert('Fail to load search history from local storage');
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [result, setResult] = useState({});
  const [language, setLanguage] = useState(0);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    if (result?.items?.length) {
      const newHistory = history || [];
      const parameters = {};
      if (language) parameters.language = language;
      if (topic) parameters.topic = topic;
      newHistory.unshift({
        timestamp: (new Date()).toISOString(), parameters, page, results: result.items,
      });
      setHistory(newHistory);
    }
  }, [result]);

  useEffect(() => {
    if (history?.length) {
      localStorage.setItem('history', JSON.stringify(history));
    }
  }, [history]);

  const search = async () => {
    if (!topic && !language) return;
    setIsLoading(true);
    let url = 'https://api.github.com/search/repositories?q=';
    if (topic) url += topic;
    if (topic && language) url += '+';
    if (language) url += `language:${language}`;
    try {
      const response = await fetch(`${url}&per_page=${perPage}&page=${page}`);
      setResult(await response.json());
    } catch (e) {
      alert('Fail to get result');
      setResult({});
    }
    setIsLoading(false);
  };

  useEffect(() => {
    search();
  }, [page, perPage]);

  return {
    page,
    perPage,
    isLoading,
    setIsLoading,
    result,
    setResult,
    language,
    setLanguage,
    topic,
    setTopic,
    setPage,
    setPerPage,
    search,
    isAdmin,
    setIsAdmin,
    history,
  };
};
