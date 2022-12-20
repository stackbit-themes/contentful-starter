import ReactMarkdown from 'react-markdown';
import Container from '../Container';

const MarkdownSection = (props) => {
    const { path, fields } = props;

    return (
        <Container data-sb-field-path={path}>
            <div data-sb-field-path=".markdown">
                <ReactMarkdown>
                    {fields?.markdown}
                </ReactMarkdown>
            </div>
        </Container>
    );
};

export default MarkdownSection;
