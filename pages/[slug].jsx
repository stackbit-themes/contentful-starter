
import { getPage, getAllPageSlugs } from '../api/cf';
import { getComponent } from '../src/components';

const Page = getComponent('Page');

export default Page;

export async function getStaticPaths() {
    const slugs = await getAllPageSlugs();

    const paths = slugs.map((slug) => ({
        params: {
            slug,
        },
    }));

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const page = await getPage(params.slug);

    return {
        props: {
            page,
        },
    };
}
