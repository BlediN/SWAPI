import './PlanetCard.css';
import { useEffect, useState } from 'react';
import { fetchUnsplashImage } from '../utils/fetchUnsplashImage';

function PlanetCard({ planet, onBan }) {
  const { name, climate, terrain, population } = planet;
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const url = await fetchUnsplashImage(name + " planet");
      setImageUrl(url || '/fallback.jpg'); // Optional: fallback image
    };

    getImage();
  }, [name]);

  const handleClick = (type, value) => onBan(type, value);

  return (
    <div className="planet-card">
      <h2>{name}</h2>
      {imageUrl && (
        <img src={imageUrl} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      )}
      <p><strong>Climate:</strong> <span className="clickable" onClick={() => handleClick('climate', climate)}>{climate}</span></p>
      <p><strong>Terrain:</strong> <span className="clickable" onClick={() => handleClick('terrain', terrain)}>{terrain}</span></p>
      <p><strong>Population:</strong> <span className="clickable" onClick={() => handleClick('population', population)}>{population}</span></p>
    </div>
  );
}

export default PlanetCard;
