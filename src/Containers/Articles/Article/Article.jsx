// librairies
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../../config/axios-firebase';
import classes from './Article.module.css';
import routes from '../../../config/routes';
import appFirebase from '../../../config/firebase';
import { getAuth, getIdToken } from 'firebase/auth';
import { CurrentUserContext } from '../../../context/currentUserContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/fr';

function Article() {
  // hooks
  const { slug } = useParams();
  const navigate = useNavigate();

  // states
  const [article, setArticle] = useState({});

  // context 
  const { user } = useContext(CurrentUserContext);

  // moment
  moment.updateLocale('fr');

  // useEffect
  useEffect(() => {
    axios.get(`/articles.json?orderBy="slug"&equalTo="${slug}"`)
      .then(response => {
        // if the article does not exist
        if (Object.keys(response.data).length === 0) {
          toast.error('Cet article n\'existe pas.');
          navigate(routes.HOME);
        }

        // if the article exist
        for (let key in response.data) {
          setArticle({
            ...response.data[key],
            id: key
          });
        }
      })
      .catch(error => console.log(error));
  }, [navigate, slug]);

  useEffect(() => {
    document.title = article.title;
  });

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
              toast.success('Article supprimé avec succès.');
              navigate(routes.ARTICLES, {replace: true});
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  };

  // variables JSX 
  const buttonsJSX = (
    <div className={classes.buttonContainer}>
      <Link to={routes.MANAGEARTICLE} state={{article: article}} >
        <button className='button' >Modifier</button>
      </Link>
      <button className='button' onClick={deleteClickedHandler}>Supprimer</button>
    </div>
  );

  return (
    <div>
      <h1>{article.title}</h1>

      <article className={`${classes.Article} container`}>
        <p className={classes.catchphrase}>{article.catchphrase}</p>
        <p className={classes.content}>{article.content}</p>
        {user ? buttonsJSX : null}

        <div className={classes.details}>
          <span>{article.author}</span>
					Publié {moment.unix(article.date / 1000).fromNow()}
          {article.draft === "true" || article.draft === true ? <span className='draft'>Brouillon</span> : ''}
        </div>
      </article>
    </div>
  );
};

export default Article;