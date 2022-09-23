import Container from '../Container';
import styles from './style.module.css';

const HeroBanner = (props) => {
    const { path, fields } = props;

    const heroImageStyle = {
        backgroundImage: `url(https:${fields?.image?.fields?.file?.url})`
    };

    return (
        <section
            className={styles.hero}
            data-sb-field-path={` ${path} ${path}.image`}
            style={heroImageStyle}
        >
            <Container isSection={false} classes={styles[fields.textColor]}>
                {fields.title && <h1 data-sb-field-path=".title" className={styles.hero__title}>{fields.title}</h1>}
                {fields.subtitle && <p data-sb-field-path=".subtitle" className={styles.hero__subtitle}>{fields.subtitle}</p>}
            </Container>
        </section>
    );
};

export default HeroBanner;
