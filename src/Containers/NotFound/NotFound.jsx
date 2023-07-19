import { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = 'Page introuvable';
  });

  return (
    <div>
      <h1>Page non trouvée - Erreur 404</h1>
    </div>
  );
};

export default NotFound;