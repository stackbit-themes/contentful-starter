import ReactMarkdown from 'react-markdown'
import { getComponent } from '..';

const Container = getComponent('Container');

const MarkdownSection = (props) => {
    return (
        <Container data-sb-field-path={props.path}>
            <div data-sb-field-path=".markdown">
                <ReactMarkdown>
                    {props.fields.markdown}
                </ReactMarkdown>
            </div>
        </Container>
    );
};

export default MarkdownSection;
