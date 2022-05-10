import dynamic from 'next/dynamic';

const components = {
    'HeroBanner': dynamic(() => import('./HeroBanner')),
    'MarkdownSection': dynamic(() => import('./MarkdownSection')),
    'ImageSection': dynamic(() => import('./ImageSection')),
    'CtaSection': dynamic(() => import('./CtaSection')),
    'faq': dynamic(() => import('./Faq')),
    'Page': dynamic(() => import('./Page')),
    'Container': dynamic(() => import('./Container')),
};

export function getComponent(type) {
    return components[type];
}