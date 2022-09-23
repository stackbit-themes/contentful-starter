import dynamic from 'next/dynamic';

const components = {
    'HeroBanner': dynamic(() => import('./HeroBanner')),
    'MarkdownSection': dynamic(() => import('./MarkdownSection')),
    'ImageSection': dynamic(() => import('./ImageSection')),
    'CtaSection': dynamic(() => import('./CtaSection')),
    'CardsSection': dynamic(() => import('./CardsSection')),
};

export function getComponent(type) {
    return components[type];
}