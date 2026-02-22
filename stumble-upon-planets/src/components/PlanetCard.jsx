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
      <div className="planet-content">
        {imageUrl && (
          <img src={imageUrl} alt={name} />
        )}
        <div className="planet-details">
          <p><strong>Climate:</strong> <span className="clickable" onClick={() => handleClick('climate', climate)} title="Click to ban this climate">{climate}</span></p>
          <p><strong>Terrain:</strong> <span className="clickable" onClick={() => handleClick('terrain', terrain)} title="Click to ban this terrain">{terrain}</span></p>
          <p><strong>Population:</strong> <span className="clickable" onClick={() => handleClick('population', population)} title="Click to ban this population">{population}</span></p>
        </div>
      </div>
      <div className="hint">💡 Click on any attribute to ban it</div>
    </div>
  );
}

export default PlanetCard;
