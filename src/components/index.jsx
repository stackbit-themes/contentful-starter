import dynamic from 'next/dynamic';

const components = {
    'HeroBanner': dynamic(() => import('./HeroBanner')),
    'MarkdownSection': dynamic(() => import('./MarkdownSection')),
    'ImageSection': dynamic(() => import('./ImageSection')),
    'CtaSection': dynamic(() => import('./CtaSection')),
    'Page': dynamic(() => import('./Page')),
    'Container': dynamic(() => import('./Container')),
    'Button': dynamic(() => import('./Button')),
    'Card': dynamic(() => import('./Card')),
    'CardsSection': dynamic(() => import('./CardsSection')),
};

export function getComponent(type) {
    return components[type];
}