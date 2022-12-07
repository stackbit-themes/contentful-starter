import path from 'path';
import dotenv from 'dotenv';
// @stackbit/cms-contentful is a dev dependency, and not used by the site code itself.
import { ContentfulContentSource } from '@stackbit/cms-contentful';

// For local development, share the .env file that the Next.js server reads
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Add more models here, and make sure that getDocumentLocale can assign the relevant locale to documents.
const LOCALIZED_MODELS = ['page', 'CtaSection'];
const getDocumentLocale = (document, locales) => {
    const localeCodes = locales?.map(locale => locale.code);
    if (document.fields.slug) {
        return localeCodes.find(code => document.fields.slug?.value?.toLowerCase().startsWith(`${code.toLowerCase()}/`));
    }

    return localeCodes.includes(document.fields?.locale?.value) ? document.fields?.locale.value : null;
};

class MyContentSource extends ContentfulContentSource {
    async getModels() {
        return (await super.getModels()).map(model => {
            if (LOCALIZED_MODELS.includes(model.name)) {
                return {
                    ...model,
                    localized: true
                };
            }
            return model;
        });
    }

    convertEntries(entries, modelMap) {
        const result = super.convertEntries(entries, modelMap);
        return result.map(document => {
            if (LOCALIZED_MODELS.includes(document.modelName)) {
                const locale = getDocumentLocale(document, this.locales);
                return {
                    ...document,
                    locale
                };
            }
            return document;
        });
    }

    async createDocument(options, locale = 'en-US') {
        if (options.model.localized) {
            options.locale = locale;
        }
        return super.createDocument(options);
    }
}

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
        new MyContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
        })
    ],

    // models property allows tweaking/extending any existing model (as well as adding new ones).
    // Typically used to mark page-type models for the visual editor and map content items of these
    // type to page URLs. This enables the editor to create a sitemap from content and open the
    // appropriate page fields for editing as you navigate between fields.
    models: {
        page: { type: 'page', urlPath: '/{slug}' }
    }
};
