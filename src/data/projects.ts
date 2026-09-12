import { stories, type Story } from './stories';

export type Category = 'leadership' | 'strategy' | 'analytics';
export interface Project {
  slug: string;
  context: string;
  title: string;
  summary: string;
  capability: string;
  status: string;
  href: string;
  linkText: string;
  category: Category;
  mini: Story['mini'] | 'dow';
  detail: string;
  contribution: string;
  result: string;
  limitation?: string;
}

const previews: Record<string, Pick<Project, 'category' | 'detail' | 'contribution' | 'result' | 'limitation'>> = {
  'weather-ready': {
    category: 'analytics',
    detail: 'Original screens show the forecast range and a form for closures, patio limits, and private events.',
    contribution: 'I built a prototype for restaurant managers to estimate dinner demand, understand the forecast and record service changes and feedback. Interviews about lead times and operating needs informed the workflow; I connected forecasting, explanations and stored context.',
    result: 'A working graduate prototype combining demand forecasts with an AI conversation. Restaurant pilot outcomes and sustained adoption remain unmeasured.',
  },
  hmda: {
    category: 'analytics',
    detail: 'The middle score band holds 259,343 applications reserved for review in the proposed workflow.',
    contribution: 'I evaluated predictions on data reserved for testing, compared model behavior across groups and designed a workflow that reserves uncertain cases for human review.',
    result: 'The proposed workflow provides predictions for about 85% of evaluation records. About 8% of those predictions disagree with the historical decision.',
    limitation: 'The public mortgage data records historical approval and denial, not creditworthiness. This academic audit does not establish fairness or a deployed decision system.',
  },
  nba: {
    category: 'analytics',
    detail: 'At 36 minutes, four assists is around the 95th percentile for bigs; creators have a median of 5.2.',
    contribution: 'I built a database with one row per player per game, then grouped season statistics by inferred role and expressed them per 36 minutes.',
    result: 'Recent qualified player-seasons can be compared with fixed historical benchmarks instead of only with current peers.',
    limitation: 'Historical box scores are unadjusted for era. The project documents unresolved data links and team-name variations.',
  },
  energy: {
    category: 'strategy',
    detail: 'Using existing infrastructure could offer earlier entry, subject to capacity, useful life and switching costs.',
    contribution: 'I used scenario analysis to compare building new import infrastructure with using existing infrastructure. I examined how pricing, capacity use and investment timing affected the market-entry case.',
    result: 'An MBA team market-entry recommendation; the engagement ended before investment or implementation.',
  },
  services: {
    category: 'strategy',
    detail: 'Proposed measures paired time-to-hire with candidate quality and tracked referrals through to placement.',
    contribution: 'I developed a growth strategy for moving from staffing into project delivery, with recommendations for recruiting, skill assessment, training and client development.',
    result: 'An independent advisory deliverable with proposed measures. Implementation remained with the client.',
  },
  baja: {
    category: 'leadership',
    detail: 'Five groups worked on different parts of the vehicle, with weekly meetings to coordinate progress.',
    contribution: 'As captain, I organized the 25-member student team and coordinated weekly meetings and fundraising alongside design and fabrication.',
    result: 'The team built an off-road vehicle for its first BAJA competition. A failed brake test ended participation.',
  },
};

export const projects: Project[] = [
  {
    slug: 'dow', context: 'Dow', title: 'Migrating inspection records across 15 Dow sites',
    summary: 'I proposed the rollout and designed the review process for migrating equipment-inspection records. The team completed the transition across 15 sites.',
    capability: 'Workflow improvement · Program delivery',
    status: 'Industrial operations · Completed migration', href: '/work/dow/', linkText: 'Read the Dow story',
    category: 'leadership', mini: 'dow',
    detail: 'A three-site pilot established the workflow; site validation and working meetings helped move the reviews forward.',
    contribution: 'I proposed the rollout structure, designed the site-review workflow and coordinated reporting between plant teams, specialists and leadership. In separate earlier work, I automated routine documentation and kept exceptions for review.',
    result: 'The team completed the migration across 15 sites.',
  },
  ...['energy', 'services', 'weather-ready', 'hmda', 'nba', 'baja'].map(slug => {
    const story = stories.find(story => story.slug === slug)!;
    return { ...story, href: story.href!, linkText: story.linkText!, ...previews[story.slug] };
  }),
];

export const categories = [
  { value: 'all', label: 'All work', count: 7 },
  { value: 'leadership', label: 'Program leadership', count: 2 },
  { value: 'strategy', label: 'Strategy', count: 2 },
  { value: 'analytics', label: 'Analytics & product', count: 3 },
];
