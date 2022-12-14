import Container from '../Container';

const ImageSection = (props) => {
    const { path, fields } = props;

    return (
        <Container data-sb-field-path={path}>
            <img data-sb-field-path=".image" src={fields?.image?.fields?.file?.url} />
        </Container>
    );
};

export default ImageSection;
