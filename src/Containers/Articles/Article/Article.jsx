// librairies
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../config/axios-firebase';
import classes from './Article.module.css';

// components 

function Article() {
  // hooks
  const { slug } = useParams();

  // states
  const [article, setArticle] = useState({});

  // useEffect
  useEffect(() => {
    axios.get(`/articles.json?orderBy="slug"&equalTo="${slug}"`)
      .then(response => {
        for (let key in response.data) {
          setArticle({
            ...response.data[key],
            date: response.data[key].date.slice(0, 10)
          });
        }
      })
      .catch(error => console.log(error));
  }, [slug]);

  return (
    <div>
      <h1>{article.title}</h1>
      <article className={`${classes.Article} container`}>
        <p className={classes.catchphrase}>{article.catchphrase}</p>
        <p className={classes.author}>{article.content}</p>
        <div>
          <span>{article.author}</span>
					Publié le {article.date}
        </div>
      </article>
    </div>
  );
};

export default Article;