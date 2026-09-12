// Route keys shared by the layouts. Base.astro uses them for the main element's route class, the
// Open Graph type, and the current-page state of the primary navigation.
export const storyRoutes = ['dow', 'weather-ready', 'hmda', 'nba', 'energy-market-entry', 'services-growth', 'baja'] as const;
export type StoryRoute = (typeof storyRoutes)[number];
export type Route = 'home' | 'work' | StoryRoute;
export const isStoryRoute = (route: Route): route is StoryRoute => (storyRoutes as readonly string[]).includes(route);
