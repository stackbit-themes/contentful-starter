
import Page from '../src/components/Page';
import { getPage, getAllPageSlugs } from '../api/cf';

export default Page;

export async function getStaticPaths() {
    const slugs = await getAllPageSlugs();

    const paths = slugs?.map((slug) => slug.startsWith('/') ? slug : `/${slug}`) ?? [];

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const urlPath = params.slug ? (params.slug).join('/') : '/';

    const page = await getPage(urlPath);

    return {
        props: {
            page,
        },
    };
}
