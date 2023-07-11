// librairies
import DisplaydArticle from './DisplayArticle/DisplayArticle';
import classes from './DisplayedArticles.module.css';

function DisplaydArticles(props) {
  // variables JSX
  const articles = props.articles.map(article => (
    <DisplaydArticle
      key={article.id}
      article={article}
    />
  ));

  return (
    <section className={`${classes.DisplayedArticles} container`}>
      {articles}
    </section>
  );
};

export default DisplaydArticles;