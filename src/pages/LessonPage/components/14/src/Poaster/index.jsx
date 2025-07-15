import './index.css';

const Poaster = (props) => {
  const { img, title, description, authorFullName } = props;
  return (
    <div className="poster">
      <img className="poster__img" src={img} alt={title}/>

      <h2 className="poster__h2">{title}</h2>

      {description && (
        <h4 className="poster__h4">{description}</h4>
      )}

      {authorFullName && (
        <p className="poster__author">Автор: <b>{authorFullName}</b> </p>
      )}
    </div>
  );
};

export default Poaster;