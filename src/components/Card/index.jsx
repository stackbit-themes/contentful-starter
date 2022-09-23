import Button from '../Button';
import styles from './styles.module.css';

const Card = (props) => {
  const { title, subtitle, image, text, actions = [], ...rest } = props;

  return (
    <div className={styles.card} {...rest}>
      {image && (
        <img
          data-sb-field-path=".image"
          src={image.fields.file?.url}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <h2 data-sb-field-path=".title">{title}</h2>
        {subtitle && (
          <p data-sb-field-path=".subtitle" className={styles.subtitle}>
            {subtitle}
          </p>
        )}
        {text && (
          <p data-sb-field-path=".text" className={styles.text}>
            {text}
          </p>
        )}
        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((item, index) => (
              <div key={item._id} data-sb-field-path={`actions.${index}`}>
                <Button
                  key={`${item.fields.url}-${index}`}
                  data-sb-field-path=".buttonText"
                  data-sb-object-id={item._id}
                  primary={item.fields.primary}
                  url={item.fields.url}
                  text={item.fields.buttonText}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
