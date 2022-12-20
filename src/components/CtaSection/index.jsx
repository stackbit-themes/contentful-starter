import Container from '../Container';
import Button from '../Button';
import styles from './style.module.css';

const CtaSection = (props) => {
    const { path, fields } = props;

    return (
        <Container data-sb-field-path={path}>
            <div className={styles['cta-container']}>
                <div className={styles.cta__texts}>
                    <p data-sb-field-path=".title" className={styles.cta__title}>{fields.title}</p>
                    {fields.subtitle && <p data-sb-field-path=".subtitle" className={styles.cta__subtitle}>{fields.subtitle}</p>}
                </div>
                <Button data-sb-object-id={fields?.button?._id} data-sb-field-path=".buttonText" classes={styles.cta__button} url={fields.button?.fields?.url} text={fields.button?.fields?.buttonText} primary={fields.button?.fields?.primary} />
            </div>
        </Container>
    );
};

export default CtaSection;
