import './DiscoverButton.css';

function DiscoverButton({ onClick }) {
  return (
    <button className="discover-button" onClick={onClick}>
      🌠 Discover New Planet
    </button>
  );
}

export default DiscoverButton;
