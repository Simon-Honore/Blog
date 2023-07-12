//librairies
import { useEffect, useState } from 'react';
import axios from '../../config/axios-firebase';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';
import classes from './Home.module.css';

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
    <div className='container'>
      <h1>Accueil</h1>
      <DisplaydArticles articles={articles} />
      <div className={classes.linkContainer}>
        <Link to={routes.ARTICLES}>Voir tous les articles &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Home;