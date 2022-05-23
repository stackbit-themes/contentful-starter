const { createClient } = require('contentful');
const { startHotContentReloadSocketServer } = require('@stackbit/nextjs-hot-content-reload');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    const client = createClient({
        accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
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

module.exports = {
    reactStrictMode: true,
};
