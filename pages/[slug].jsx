
import Page from '../src/components/Page';
import { getPage, getAllPageSlugs } from '../api/cf';

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
