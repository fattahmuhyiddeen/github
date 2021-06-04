import { useEffect, useState } from 'react';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      const response = await fetch(`${url}&per_page=${perPage}&page=${page}`);
      setResult(await response.json());
    } catch (e) {
      alert(JSON.stringify(e));
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
  };
};
