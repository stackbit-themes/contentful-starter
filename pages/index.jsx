import Page from '../src/components/Page';
import { getPage } from '../api/cf';

export default Page;

export async function getStaticProps() {
    const page = await getPage('/');

    return {
        props: {
            page,
        },
    };
}
