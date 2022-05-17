import { createClient } from 'contentful';

const TYPE_PAGE = 'page';

const isDev = process.env.NODE_ENV === 'development';

function getPreviewToken() {
    try {
        const data = JSON.parse(process.env.CONTENTFUL);
        const space = data.spaces?.find((item) => item.spaceId === process.env.CONTENTFUL_SPACE_ID);

        return space ? space.previewToken : null;
    } catch (e) {
        return null;
    }
}

export async function getEntries(type, queryParams) {
    const client = createClient({
        accessToken: isDev ? getPreviewToken() : process.env.CONTENTFUL_DELIVERY_TOKEN,
        space: process.env.CONTENTFUL_SPACE_ID,
        host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com'
    });

    return client.getEntries({
        content_type: type,
        ...queryParams,
        include: 10,
    })
        .then((response) => response.items.map(mapEntry));
}

export async function getPage(slug) {
    return getEntries(TYPE_PAGE, {
        'fields.slug': slug
    }).then((items) => items.length > 0 ? items[0] : null);
}

export async function getAllPageSlugs() {
    return getEntries(TYPE_PAGE)
        .then((pages) => pages.map((page) => page.fields.slug));
}


function mapEntry(entry) {
    return {
        _id: entry.sys?.id,
        _type: entry.sys?.contentType?.sys.id || entry.sys?.type,
        fields: Object.entries(entry.fields).reduce((acc, [key, value]) => {

            acc[key] = parseField(value);
            return acc;
        }, {}),
    };
}

function parseField(value) {
    if (typeof value === 'object' && value.sys) {
        return mapEntry(value);
    }

    if (Array.isArray(value)) {
        return value.map(mapEntry);
    }

    return value;
}

