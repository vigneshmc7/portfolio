const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
});
const animateIn = (element: Element, delay = 0) => {
  if (!reducedMotion.matches && typeof element.animate === 'function') {
    element.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay, easing: 'cubic-bezier(.2,.7,.2,1)' });
  }
};

function initTheme() {
  const key = 'portfolio-appearance';
  type Mode = 'light' | 'dark' | 'system';
  let mode: Mode = 'system';
  try { const stored = localStorage.getItem(key); if (stored === 'light' || stored === 'dark') mode = stored; } catch { /* Session choice still works without storage. */ }
  const controls = [...document.querySelectorAll<HTMLButtonElement>('[data-theme-choice]')];
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const colors = { light: '#F5F2EC', dark: '#111C1B' };
  function apply() {
    if (mode === 'system') root.removeAttribute('data-theme'); else root.dataset.theme = mode;
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === mode)));
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => {
      meta.content = mode === 'system' ? colors[meta.media.includes('dark') ? 'dark' : 'light'] : colors[mode];
    });
  }
  controls.forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.themeChoice as Mode;
    try { if (mode === 'system') localStorage.removeItem(key); else localStorage.setItem(key, mode); } catch { /* Keep the in-memory mode. */ }
    apply();
  }));
  system.addEventListener('change', () => { if (mode === 'system') apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) { mode = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system'; apply(); }
  });
  apply();
  document.querySelector<HTMLElement>('.theme-control')?.removeAttribute('hidden');
}


function initWork() {
  const browser = document.querySelector<HTMLElement>('[data-work-browser]');
  if (!browser) return;
  const filters = [...browser.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const cards = [...browser.querySelectorAll<HTMLElement>('[data-project]')];
  const count = browser.querySelector<HTMLElement>('[data-result-count]');
  let active = '';
  function filter(value: string, updateUrl = true, motion = true) {
    if (active === value) return;
    active = value;
    let visible = 0;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    cards.forEach(card => {
      const show = value === 'all' || card.dataset.category === value;
      card.hidden = !show;
      card.getAnimations().forEach(animation => animation.cancel());
      if (show) { if (motion) animateIn(card, visible * 25); visible++; }
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    if (updateUrl) {
      const url = new URL(location.href);
      if (value === 'all') url.searchParams.delete('focus'); else url.searchParams.set('focus', value);
      history.replaceState(history.state, '', url);
    }
  }
  filters.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter!)));
  const requested = new URL(location.href).searchParams.get('focus');
  filter(filters.some(button => button.dataset.filter === requested) ? requested! : 'all', false, false);
  browser.querySelector<HTMLElement>('[data-work-filters]')?.removeAttribute('hidden');

  const dialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const content = dialog.querySelector<HTMLElement>('[data-preview-content]')!;
  let trigger: HTMLButtonElement | null = null;
  let previousOverflow = '';
  let previewActive = false;
  function restorePage() {
    if (!previewActive) return;
    previewActive = false;
    document.body.style.overflow = previousOverflow;
    trigger?.focus({ preventScroll: true });
    content.replaceChildren();
  }
  function closePreview() {
    dialog!.close();
    restorePage();
  }
  browser.querySelectorAll<HTMLButtonElement>('[data-preview]').forEach(button => {
    const template = document.getElementById(`preview-${button.dataset.preview}`) as HTMLTemplateElement | null;
    if (!template) return;
    button.hidden = false;
    button.addEventListener('click', () => {
      trigger = button;
      content.replaceChildren(template.content.cloneNode(true));
      const heading = content.querySelector('h2');
      if (heading) dialog.setAttribute('aria-labelledby', heading.id);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      previewActive = true;
      dialog.scrollTop = 0;
      animateIn(dialog);
    });
  });
  dialog.querySelector('[data-close-preview]')?.addEventListener('click', closePreview);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closePreview(); });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(element => element.getClientRects().length > 0 && !element.hasAttribute('disabled'));
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePreview();
  });
  dialog.addEventListener('close', () => {
    if (!dialog.open) restorePage();
  });
  window.addEventListener('pagehide', () => { if (dialog.open) closePreview(); });
}

function initReading() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (header && 'ResizeObserver' in window) new ResizeObserver(() => root.style.setProperty('--header-actual', `${header.offsetHeight}px`)).observe(header);
  const progress = document.querySelector<HTMLElement>('.reading-progress span');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.page-nav a')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  if (!progress && !links.length) return;
  let frame = 0;
  function update() {
    frame = 0;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / Math.max(1, range)))})`;
    const boundary = (header?.offsetHeight ?? 85) + 100;
    let index = -1;
    sections.forEach((section, i) => { if (section && section.getBoundingClientRect().top <= boundary) index = i; });
    links.forEach((link, i) => { if (i === index) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  update();
}

function initReveals() {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  elements.forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) { element.classList.add('reveal-pending'); observer.observe(element); }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      elements.forEach(element => element.classList.remove('reveal-pending'));
      document.getAnimations().forEach(animation => animation.cancel());
      observer.disconnect();
    }
  });
  window.addEventListener('beforeprint', () => elements.forEach(element => element.classList.remove('reveal-pending')));
}

function initDisclosures() {
  let opened: HTMLDetailsElement[] = [];
  window.addEventListener('beforeprint', () => {
    opened = [...document.querySelectorAll<HTMLDetailsElement>('details:not([open])')];
    opened.forEach(details => { details.open = true; });
  });
  window.addEventListener('afterprint', () => { opened.forEach(details => { details.open = false; }); opened = []; });
}

initTheme();
initWork();
initReading();
initReveals();
initDisclosures();
