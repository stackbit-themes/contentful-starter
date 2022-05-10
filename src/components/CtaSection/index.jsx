import { getComponent } from '..';

const Container = getComponent('Container');

const CtaSection = (props) => {
    return (
        <Container data-sb-field-path={props.path} >

        </Container>
    );
};

export default CtaSection;
