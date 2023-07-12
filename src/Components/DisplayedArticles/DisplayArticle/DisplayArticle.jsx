// librairies
import classes from './DisplaydArticle.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';

function DisplaydArticle(props) {
  // hooks
  const navigate = useNavigate();

  // functions
  const navigateToArticle = (slug) => {
    navigate(`${routes.ARTICLES}/${slug}`);
  };

  return (
    <article className={classes.DisplaydArticle} onClick={() => navigateToArticle(props.article.slug)}>
      <h2>{props.article.title}</h2>
      <p>{props.article.catchphrase}</p>
      <small>{props.article.author}</small>
    </article>
  );
};

export default DisplaydArticle;