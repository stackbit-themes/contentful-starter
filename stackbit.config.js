import path from 'path';
import dotenv from 'dotenv';

import { ContentfulContentSource } from '@stackbit/cms-contentful';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default {
    stackbitVersion: '~0.5.0',
    ssgName: 'nextjs',
    nodeVersion: '16',

    import: {
        type: 'contentful',
        contentFile: 'contentful/export.json',
        uploadAssets: true,
        assetsDirectory: 'contentful',
        spaceIdEnvVar: 'CONTENTFUL_SPACE_ID',
        deliveryTokenEnvVar: 'CONTENTFUL_DELIVERY_TOKEN',
        previewTokenEnvVar: 'CONTENTFUL_PREVIEW_TOKEN',
        accessTokenEnvVar: 'CONTENTFUL_MANAGEMENT_TOKEN'
    },

    // contentSources is a list of modules implementing the ContentSourceInterface
    contentSources: [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
        })
    ],

    mapModels: ({ models }) => {
        return models.map((model) => {
            // To enable in-context editing and sitemap features in Stackbit
            // change the model type of the 'page' model to 'type: page' and
            // set the 'urlPath'.
            // For more info please visit Stackbit documentation at:
            // https://docs.stackbit.com/reference/defining-models/model-properties
            if (model.name === 'page') {
                model.type = 'page';
                model.urlPath = '/{slug}';
            }
            return model;
        });
    }

};
