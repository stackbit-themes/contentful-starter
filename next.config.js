const { createClient } = require('contentful');
const { startHotContentReloadSocketServer } = require('@stackbit/nextjs-hot-content-reload');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    const client = createClient({
        accessToken: getPreviewToken(),
        space: process.env.CONTENTFUL_SPACE_ID,
        host: 'preview.contentful.com',
    });

    const socketServer = startHotContentReloadSocketServer();

    let currentSyncToken;

    client.sync({
        initial: true
    }).then(({
        nextSyncToken,
    }) => {
        currentSyncToken = nextSyncToken;

        setInterval(() => {
            client.sync({ nextSyncToken: currentSyncToken }).then(({
                nextSyncToken,
            }) => {
                if (currentSyncToken === nextSyncToken) {
                    return;
                }

                currentSyncToken = nextSyncToken;
                socketServer.notifyPropsChanged();
            });
        }, 1000);
    });
}

function getPreviewToken() {
    try {
        const data = JSON.parse(process.env.CONTENTFUL);
        const space = data.spaces.find((item) => item.spaceId === process.env.CONTENTFUL_SPACE_ID);

        return space ? space.previewToken : null;
    } catch (e) {
        return null;
    }
}

module.exports = {
    reactStrictMode: true,
};
