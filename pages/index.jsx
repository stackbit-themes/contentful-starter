import Head from 'next/head';
import { withHotContentReload } from '@stackbit/nextjs-hot-content-reload/hotContentReload';

import { getPage, getAllPageSlugs, getEntries } from '../api/cf';
import { getComponent } from '../src/components';

const Page = (props) => {
    if (!props.page) {
        return null;
    }

    const { page: { _id, fields } } = props;

    return (
        <>
            <Head>
                <title>{fields.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main data-sb-object-id={_id}>
                {fields.sections.map((section, index) => {
                    const Component = getComponent(section._type);

                    return (<Component path={`sections.${index}`} key={`${section.type}-${index}`} {...section} />);
                })}
            </main>
        </>
    );
}

export default withHotContentReload(Page);


export async function getStaticProps() {
    const page = await getPage('/');

    return {
        props: {
            page,
        },
    };
}
