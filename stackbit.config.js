import path from 'path';
import dotenv from 'dotenv';
// @stackbit/cms-contentful is a dev dependency, and not used by the site code itself.
import { ContentfulContentSource } from '@stackbit/cms-contentful';

// For local development, share the .env file that the Next.js server reads
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Add more models here, and make sure that getDocumentLocale can assign the relevant locale to documents.
const LOCALIZED_MODELS = ['page', 'CtaSection'];
const LOCALES = ['en-US', 'fr']
const getDocumentLocale = (document) => {
    if (document.fields.slug) {
        return LOCALES.find((locale) => document.fields.slug?.value?.startsWith(locale));
    }

    return LOCALES.includes(document.fields?.locale?.value) ? document.fields?.locale.value : null;
};

export default {
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',

    // Only needed for repositories duplicatable through https://app.stackbit.com/import
    // for the automatic provisioning of space contents.
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

    mapModels({models}) {
        return models.map((model) => {
            if (LOCALIZED_MODELS.includes(model.name)) {
                return {
                    ...model,
                    localized: true
                };
            }
            return model;
        });
    },

    mapDocuments({documents, models}) {
        return documents.map((document) => {
            if (LOCALIZED_MODELS.includes(document.modelName)) {
                const locale = getDocumentLocale(document);
                return {
                    ...document,
                    locale
                };
            }
            return document;
        });
    },

    // models property allows tweaking/extending any existing model (as well as adding new ones).
    // Typically used to mark page-type models for the visual editor and map content items of these
    // type to page URLs. This enables the editor to create a sitemap from content and open the
    // appropriate page fields for editing as you navigate between fields.
    models: {
        page: { type: 'page', urlPath: '/{slug}' }
    }
};
