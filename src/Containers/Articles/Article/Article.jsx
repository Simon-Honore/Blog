// librairies
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../../config/axios-firebase';
import classes from './Article.module.css';
import routes from '../../../config/routes';
import appFirebase from '../../../config/firebase';
import { getAuth, getIdToken } from 'firebase/auth';

// components 

function Article() {
  // hooks
  const { slug } = useParams();
  const navigate = useNavigate();

  // states
  const [article, setArticle] = useState({});

  // useEffect
  useEffect(() => {
    axios.get(`/articles.json?orderBy="slug"&equalTo="${slug}"`)
      .then(response => {
        // if the article does not exist
        if (Object.keys(response.data).length === 0) {
          navigate(routes.HOME, {replace: true});
        }

        // if the article exist
        for (let key in response.data) {
          setArticle({
            ...response.data[key],
            id: key,
            date: response.data[key].date.slice(0, 10)
          });
        }
      })
      .catch(error => console.log(error));
  }, [navigate, slug]);

  // functions
  const deleteClickedHandler = () => {
    // get token 
    const auth = getAuth(appFirebase);
    const { currentUser } = auth;
    if (currentUser) {
      getIdToken(currentUser, true)
        .then(token => {
          axios.delete(`/articles/${article.id}.json?auth=${token}`)
            .then(() => {
              navigate(routes.ARTICLES, {replace: true});
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h1>{article.title}</h1>

      <article className={`${classes.Article} container`}>
        <p className={classes.catchphrase}>{article.catchphrase}</p>
        <p className={classes.content}>{article.content}</p>
        <div className={classes.buttonContainer}>
          <Link to={routes.MANAGEARTICLE} state={{article: article}} >
          	<button className='button' >Modifier</button>
          </Link>
          <button className='button' onClick={deleteClickedHandler}>Supprimer</button>
        </div>

        <div className={classes.details}>
          <span>{article.author}</span>
					Publié le {article.date}
          {article.draft === "true" || article.draft === true ? <span className='draft'>Brouillon</span> : ''}
        </div>
      </article>
    </div>
  );
};

export default Article;