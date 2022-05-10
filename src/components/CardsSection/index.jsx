import { getComponent } from '..';
import styles from './style.module.css';

const Container = getComponent('Container');
const Card = getComponent('Card');

const CardsSection = (props) => {
    if (!props.fields) {
        return null;
    }

    const { path, fields: { cards } } = props;

    return (
        <Container data-sb-field-path={path}>
            <div data-sb-field-path=".cards" className={styles.cards}>
                {cards.map((card) => (
                    <Card key={card._id} data-sb-object-id={card._id} {...card.fields} />
                ))}
            </div>
        </Container>
    );
};

export default CardsSection;
