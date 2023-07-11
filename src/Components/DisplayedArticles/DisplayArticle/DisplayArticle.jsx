// librairies
import classes from './DisplaydArticle.module.css';

function DisplaydArticle(props) {
  return (
    <article className={classes.DisplaydArticle}>
      <h2>{props.article.title}</h2>
      <p>{props.article.catchphrase}</p>
      <small>{props.article.author}</small>
    </article>
  );
};

export default DisplaydArticle;