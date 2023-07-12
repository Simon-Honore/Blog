// librairies
import DisplayedArticle from './DisplayedArticle/DisplayedArticle';
import classes from './DisplayedArticles.module.css';

function DisplaydArticles(props) {
  // variables JSX
  const articles = props.articles.map(article => (
    <DisplayedArticle
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