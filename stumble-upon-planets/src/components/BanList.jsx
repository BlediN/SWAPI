import './BanList.css';

function BanList({ bans, onRemove }) {
  return (
    <div className="ban-list">
      <h3>Banned Attributes</h3>
      {Object.entries(bans).map(([type, values]) =>
        values.map((value, idx) => (
          <span key={idx} className="ban-tag" onClick={() => onRemove(type, value)}>
            {type}: {value} ✕
          </span>
        ))
      )}
    </div>
  );
}

export default BanList;
