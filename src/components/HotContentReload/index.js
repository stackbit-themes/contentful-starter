import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const CONTENT_CHANGE_EVENT = 'stackbitObjectsChanged';
const isDev = process.env.NODE_ENV === 'development';

const HotContentReload = (Component) => {
    return (props) => {
        if (!isDev) {
            return (
                <Component {...props} />
            )
        }

        const [stateProps, setStateProps] = useState(props);
        const { asPath } = useRouter();

        const onContentChange = useCallback(() => {
            fetch(`/api/props?path=${encodeURIComponent(location.pathname)}`)
                .then((response) => response.json())
                .then((data) => setStateProps(data));
        }, [setStateProps]);

        useEffect(() => {
            if (isDev) {
                onContentChange();
            }
        }, [asPath]);

        useEffect(() => {
            if (isDev) {
                window.addEventListener(CONTENT_CHANGE_EVENT, onContentChange);

                return () => {
                    window.removeEventListener(CONTENT_CHANGE_EVENT, onContentChange);
                };
            }
        }, []);

        return (
            <Component {...stateProps} />
        );
    }
}

export default HotContentReload;
