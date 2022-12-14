import styles from './style.module.css';

const Button = (props) => {
    const { url, text, primary = true, classes, ...rest } = props;

    if (!url || !text) {
        return null;
    }

    return (
        <a
            className={[styles.button, classes, primary ? styles.primary : ''].join(' ')}
            href={url}
            {...rest}
        >
            {text}
        </a>
    );
};

export default Button;
