import Container from '../Container';

const ImageSection = (props) => {
    return (
        <Container data-sb-field-path={props.path}>
            <img data-sb-field-path=".image" src={props.fields.image.fields.file?.url} />
        </Container>
    );
};

export default ImageSection;
