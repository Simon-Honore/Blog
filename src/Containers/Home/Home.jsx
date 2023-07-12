//librairies
import { useEffect, useState } from 'react';
import axios from '../../config/axios-firebase';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

//components
import DisplaydArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Home() {
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

        // limit to 3
        articlesArray = articlesArray.slice(0, 3);

        setArticles(articlesArray);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Accueil</h1>
      <DisplaydArticles articles={articles} />
      <Link to={routes.ARTICLES}>Voir tous les articles</Link>
    </div>
  );
};

export default Home;