// librairies
import { useParams } from 'react-router-dom';

// components 

function Article() {
  const { articleId } = useParams();

  return (
    <div>
      <h1>Article {articleId}</h1>
    </div>
  );
};

export default Article;