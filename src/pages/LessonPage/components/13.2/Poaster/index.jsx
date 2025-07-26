import './index.css';

const Poaster = (props) => {
  const { img, title, description, authorFullName } = props;
  return (
    <div className="poster">
      <img src={img} alt={title}/>

      <h2>{title}</h2>

      {description && (
        <h4>{description}</h4>
      )}

      {authorFullName && (
        <p>Автор: <b>{authorFullName}</b> </p>
      )}
    </div>
  );
};

export default Poaster;