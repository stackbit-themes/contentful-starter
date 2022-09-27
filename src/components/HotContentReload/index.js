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

        const onContentChange = (e) => {
            if (e.detail.changedObjectIds.some((changedObjectId) => e.detail.visibleObjectIds.includes(changedObjectId))) {
                onPageChange();
            }
        }

        const onPageChange = useCallback(() => {
            fetch(`/api/props?path=${encodeURIComponent(asPath)}`)
                .then((response) => response.json())
                .then((data) => setStateProps(data))
                .catch(() => {
                    console.log(`An error occured fetching props for path '${asPath}'`);
                });
        }, [asPath, setStateProps]);

        useEffect(() => {
            onPageChange();
        }, [asPath]);

        useEffect(() => {
            window.addEventListener(CONTENT_CHANGE_EVENT, onContentChange);

            return () => {
                window.removeEventListener(CONTENT_CHANGE_EVENT, onContentChange);
            };
        }, []);

        return (
            <Component {...stateProps} />
        );
    }
}

export default HotContentReload;
