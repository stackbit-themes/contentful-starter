import styles from './style.module.css';

const Container = (props) => {
    const { children, classes, isSection = 'false', ...rest } = props;
    const RenderedComponent = isSection ? 'section' : 'div';

    return (
        <RenderedComponent className={[styles.container, classes].join(' ')} {...rest}>
            {children}
        </RenderedComponent>
    )
};

export default Container;
