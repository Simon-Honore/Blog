// librairies
import classes from './DisplayedArticle.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';

function DisplayedArticle(props) {
  // hooks
  const navigate = useNavigate();

  // functions
  const navigateToArticle = (slug) => {
    navigate(`${routes.ARTICLES}/${slug}`);
  };

  return (
    <article className={classes.DisplayedArticle} onClick={() => navigateToArticle(props.article.slug)}>
      <h2>{props.article.title}</h2>
      <p>{props.article.catchphrase}</p>
      <small>{props.article.author}</small>
    </article>
  );
};

export default DisplayedArticle;