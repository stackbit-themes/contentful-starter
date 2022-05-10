import { withHotContentReload } from '@stackbit/nextjs-hot-content-reload/hotContentReload';

import { getPage } from '../api/cf';
import { getComponent } from '../src/components';

const Page = getComponent('Page');

export default withHotContentReload(Page);

export async function getStaticProps() {
    const page = await getPage('/');

    return {
        props: {
            page,
        },
    };
}
