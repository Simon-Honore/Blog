// librairies
import { useEffect, useState } from 'react';
import axios from '../../config/axios-firebase';
import DisplaydArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Articles() {
  // states 
  const [articles, setArticles] = useState([]);

  // life cycle
  useEffect(() => {
    axios.get('/articles.json?orderBy="date"')
      .then(response => {
        let articlesArray = [];
        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key
          });
        }

        // timeline 
        articlesArray.reverse();

        // filter draft
        articlesArray = articlesArray.filter(article => article.draft === 'false');
				
        setArticles(articlesArray.reverse());
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