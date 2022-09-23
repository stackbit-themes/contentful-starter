import Container from '../Container';
import Button from '../Button';
import styles from './style.module.css';

const CtaSection = (props) => {
    const { path, fields } = props;
    const { button: { fields: buttonData } } = fields

    return (
        <Container data-sb-field-path={path}>
            <div className={styles['cta-container']}>
                <div className={styles.cta__texts}>
                    <p data-sb-field-path=".title" className={styles.cta__title}>{fields.title}</p>
                    <p data-sb-field-path=".subtitle" className={styles.cta__subtitle}>{fields.subtitle}</p>
                </div>
                <Button data-sb-object-id={fields.button._id} data-sb-field-path=".buttonText" classes={styles.cta__button} url={buttonData.url} text={buttonData.buttonText} />
            </div>
        </Container>
    );
};

export default CtaSection;
