import { getPage } from '../../api/cf';

const isDev = process.env.NODE_ENV === 'development';

export default async function handler(req, res) {
    if (!isDev) {
        return res.status(404);
    }

    const { path } = req.query;
    
    if (!path) {
        return res.status(500).send('Required field `path` is empty.');
    }

    const sanitizedPath = path.replace(/^\/|\/$/g, '') || '/';

    const pageData = await getPage(sanitizedPath);

    res.status(200).json({ page: pageData });
}