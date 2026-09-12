// Homepage ProfilePage structured data (DISCOVERY-001). Every property mirrors copy that is visible on the
// About page; nothing here states a job title, employer, date, contact detail, or image the page does not show.
export const person = {
  name: 'Vignesh Mayandia Chandran',
  description:
    'Business strategy, industrial operations and applied AI, with more than five years at Dow. MBA and MS in Business Analytics from George Washington University, completed in May 2026. Work includes equipment-inspection workflows and records automation, a team records migration across 15 sites, market-entry and growth recommendations, and an AI prototype that estimates dinner demand for restaurant managers. Former president of the Graduate Consulting Club. Based in Washington, DC.',
  sameAs: ['https://www.linkedin.com/in/vignesh-mc/', 'https://github.com/vigneshmc7'],
  alumniOf: ['George Washington University'],
};

/** ProfilePage JSON-LD for `/`. `url` is included only when a public origin was configured at build time. */
export function profilePage(url: string | null): Record<string, unknown> {
  const mainEntity: Record<string, unknown> = {
    '@type': 'Person',
    name: person.name,
    description: person.description,
    sameAs: person.sameAs,
    alumniOf: person.alumniOf.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
  };
  if (url) mainEntity.url = url;
  const page: Record<string, unknown> = { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity };
  if (url) page.url = url;
  return page;
}

/** Narrative case studies share the author shown in the site's visible identity and footer. */
export function articlePage(url: string | null, title: string, description: string): Record<string, unknown> {
  const author: Record<string, unknown> = { '@type': 'Person', name: person.name, sameAs: person.sameAs };
  if (url) author.url = new URL('/', url).href;
  const page: Record<string, unknown> = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: title.replace(' · ' + person.name, ''), description, author,
  };
  if (url) { page.url = url; page.mainEntityOfPage = url; }
  return page;
}
