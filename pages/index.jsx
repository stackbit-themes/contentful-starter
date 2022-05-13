import { getPage } from '../api/cf';
import { getComponent } from '../src/components';

const Page = getComponent('Page');

export default Page;

export async function getStaticProps() {
    const page = await getPage('/');

    return {
        props: {
            page,
        },
    };
}
