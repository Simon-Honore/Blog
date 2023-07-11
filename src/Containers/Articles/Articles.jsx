// librairies
import { useEffect, useState } from 'react';
import axios from '../../config/axios-firebase';
import DisplaydArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Articles() {
  // states 
  const [articles, setArticles] = useState([]);
  console.log('articles >> ', articles);

  // life cycle
  useEffect(() => {
    axios.get('/articles.json')
      .then(response => {
        const articlesArray = [];
        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key
          });
        }
        setArticles(articlesArray);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <DisplaydArticles articles={articles} />
    </div>
  );
};

export default Articles;