export interface Story {
  slug: string;
  context: string;
  title: string;
  summary: string;
  capability: string;
  status: string;
  href?: string;
  linkText?: string;
  mini: 'weather-ready' | 'hmda' | 'nba' | 'energy' | 'services' | 'baja';
}

export const stories: Story[] = [
  {
    slug: 'weather-ready',
    context: 'Weather-Ready',
    title: 'AI planning for restaurant managers',
    summary: 'I built a prototype that estimates dinner guests from weather and local context, explains the forecast and records managers’ feedback.',
    capability: 'Product discovery · Applied AI',
    status: 'MSBA practicum · Working prototype',
    href: '/work/weather-ready/',
    linkText: 'Read the Weather-Ready story',
    mini: 'weather-ready',
  },
  {
    slug: 'hmda',
    context: 'Public mortgage data',
    title: 'When should a mortgage model withhold a prediction?',
    summary: 'I evaluated predictions of historical mortgage decisions and proposed reserving uncertain cases for human review.',
    capability: 'Analytical judgment · Model evaluation',
    status: 'Academic project · Model evaluation',
    href: '/work/hmda/',
    linkText: 'Read the mortgage audit',
    mini: 'hmda',
  },
  {
    slug: 'nba',
    context: 'NBA analytics',
    title: 'Comparing NBA players by role and playing time',
    summary: 'I built a database and compared player statistics per 36 minutes, using player roles and fixed historical benchmarks.',
    capability: 'Data modeling · Comparative analysis',
    status: 'Independent project · Data modeling and analysis',
    href: '/work/nba/',
    linkText: 'Read the NBA story',
    mini: 'nba',
  },
  {
    slug: 'energy',
    context: 'Energy market entry',
    title: 'Choosing an energy market-entry route',
    summary: 'I compared new and existing infrastructure, testing pricing, capacity use and investment timing to support a market-entry recommendation.',
    capability: 'Business strategy · Market-entry analysis',
    status: 'MBA team engagement · Recommendations',
    href: '/work/energy-market-entry/',
    linkText: 'Read the energy story',
    mini: 'energy',
  },
  {
    slug: 'services',
    context: 'Services growth',
    title: 'From staffing to project delivery',
    summary: 'I recommended how a services firm could expand from staffing into project delivery, with changes to recruiting, training and client development.',
    capability: 'Growth strategy · Talent development',
    status: 'Independent engagement · Recommendations',
    href: '/work/services-growth/',
    linkText: 'Read the services story',
    mini: 'services',
  },
  {
    slug: 'baja',
    context: 'Student off-road vehicle',
    title: 'Building our first off-road vehicle',
    summary: 'I captained a 25-member team through design, fundraising and fabrication for our first BAJA competition.',
    capability: 'Team leadership · Build coordination',
    status: 'Student engineering project · Team leadership',
    href: '/work/baja/',
    linkText: 'Read the student vehicle story',
    mini: 'baja',
  },
];
