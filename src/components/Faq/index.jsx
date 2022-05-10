import { getComponent } from '../../components';

const Container = getComponent('Container');

const FaqSection = (props) => {
    const { path, fields } = props;

    return (
        <Container data-sb-field-path={props.path}>
            <h1 data-sb-field-path=".question">{fields.question}</h1>
            <h2 data-sb-field-path=".answer">{fields.answer}</h2>
        </Container>
    );
};

export default FaqSection;
