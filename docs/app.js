/*
 * Madison Castle — static site app.
 * Vanilla JS, hash-based router, no framework, no build step.
 * Rebuilt from the design-canvas prototype "Madison Castle Site.dc.html":
 * all copy below is reproduced verbatim from that file's embedded script and markup.
 */
(function () {
  'use strict';

  var PHOTOS = './assets/photos/';

  /* Pest list — reproduced verbatim from the prototype's `pestList` array. */
  var pestList = [
    { slug: 'ants', name: 'Ants',
      lead: 'Ant trails in a kitchen mean a nest nearby, usually in a wall void, under a slab or in the garden.',
      steps: ['We follow the trail back to the nest rather than spraying the line you can see', 'Bait is placed so workers carry it back and the colony collapses', 'Entry points around sinks, windows and slab edges are sealed', 'Exterior perimeter treated to stop the next colony moving in'],
      why: 'Spraying visible ants kills the workers and leaves the colony producing more. Ants also track through food preparation areas and some species, like carpenter ants, tunnel into structural wood.',
      img: 'ants.jpg', alt: 'A trail of ants along a household surface' },
    { slug: 'bed-bugs', name: 'Bed Bugs',
      lead: 'Bed bugs spread between rooms and units fast, and they survive months between meals.',
      steps: ['Inspection of mattresses, frames, baseboards and adjoining rooms', 'Treatment of every harborage, not just the bed', 'Follow-up visits timed to the hatch cycle', 'Guidance on laundering and what to discard'],
      why: 'Bed bugs will not clear on their own and over-the-counter sprays scatter them into neighboring walls and units. Bites cause lost sleep and infection risk, and an untreated infestation spreads through a building.',
      img: 'bed-bugs.jpg', alt: 'Bed bugs on mattress fabric' },
    { slug: 'bees', name: 'Bees',
      lead: 'A bee colony in a wall void or eave needs removing properly, with the comb taken out.',
      steps: ['Colony located and the species confirmed before anything is treated', 'Access opened where the colony is inside a wall or eave', 'Comb and honey removed in full, not just the bees', 'Cavity cleaned and the entry sealed so a new swarm cannot move in'],
      why: 'Honey left behind in a wall ferments, stains through drywall and attracts a fresh swarm the following season, so removing the bees alone does not end the problem. An active colony at a doorway or play area is also a real risk to anyone allergic.',
      img: 'bees.jpg', alt: 'Honey bees on comb' },
    { slug: 'cockroaches', name: 'Cockroaches',
      lead: 'Roaches live in wall voids, under appliances and in drains, and come out at night.',
      steps: ['Species identified, since German and American roaches need different treatment', 'Gel bait and dust placed in voids, behind cabinets and under appliances', 'Drains, traps and moisture sources checked', 'Follow-up to catch the next generation'],
      why: 'Cockroaches carry salmonella and E. coli across food surfaces and their droppings trigger asthma and allergies, particularly in children. They breed fast enough that a small sighting usually means an established population.',
      img: null, alt: '' },
    { slug: 'crickets', name: 'Crickets',
      lead: 'Crickets get in through garage doors, vents and door sweeps, then chew fabric and paper.',
      steps: ['Perimeter treatment at the points they enter', 'Garage, crawlspace and utility areas treated', 'Door sweeps and vent screens checked', 'Exterior harborage such as woodpiles and heavy mulch identified'],
      why: 'Beyond the noise, crickets feed on fabric, paper and stored goods, and they draw in spiders and other predators that follow the food source indoors.',
      img: null, alt: '' },
    { slug: 'earwigs', name: 'Earwigs',
      lead: 'Earwigs live in damp ground cover and come inside under door sweeps and through weep holes.',
      steps: ['Damp harborage cleared: heavy mulch, leaf litter, boards and pots against the wall', 'Perimeter and ground-level entry points treated', 'Door sweeps, weep holes and vent screens checked', 'Irrigation and drainage reviewed, since earwigs follow moisture'],
      why: 'Earwigs feed on seedlings, soft fruit and ornamental plants, so a heavy population does visible damage to a garden before anyone sees one indoors. Inside they favor the same damp spots as silverfish, which usually means a moisture problem worth finding.',
      img: 'earwigs.jpg', alt: 'An earwig on a damp surface' },
    { slug: 'fleas', name: 'Fleas',
      lead: 'Fleas arrive on pets or wildlife and drop eggs into carpet, bedding and yard soil.',
      steps: ['Interior treatment of carpet, upholstery and pet resting areas', 'Yard treatment where pets spend time', 'Follow-up timed to the pupae hatching', 'Coordination with your vet on pet treatment'],
      why: 'Only a fraction of a flea population is on the animal. The rest is in your flooring as eggs and pupae, which is why an infestation returns after the pet is treated alone. Fleas also transmit tapeworm and cause allergic dermatitis.',
      img: 'fleas.jpg', alt: 'A flea in animal fur' },
    { slug: 'flies', name: 'Flies',
      lead: 'A persistent fly problem usually has a breeding source on site, not an open door.',
      steps: ['We locate the breeding source: drains, bins, standing water or dead animal', 'Source removed or treated, then the adult population knocked down', 'Drain treatment for drain and fruit flies', 'Bins, screens and door seals reviewed'],
      why: 'Flies move between waste and food surfaces and carry bacteria directly onto them. For a restaurant or kitchen it is also a visible health code problem that customers notice.',
      img: null, alt: '' },
    { slug: 'mosquitoes', name: 'Mosquitoes',
      lead: 'Mosquitoes breed in standing water and stay close to where they hatched.',
      steps: ['Property walked for breeding sites: drains, planters, bromeliads, gutters, pet bowls', 'Standing water eliminated or treated', 'Resting areas in dense shade and vegetation treated', 'Recurring service through the warm months'],
      why: 'Aedes mosquitoes, now established across Los Angeles, bite during the day and can transmit dengue and Zika. They breed in as little as a bottle cap of water, so treatment without source removal does not hold.',
      img: 'mosquitoes.jpg', alt: 'A mosquito on skin' },
    { slug: 'rodents', name: 'Rodents',
      lead: 'Rats and mice enter through gaps the size of a coin and nest in attics, walls and crawlspaces.',
      steps: ['Full inspection of attic, crawlspace, roofline and utility penetrations', 'Entry points sealed with material rodents cannot chew', 'Trapping program rather than bait left in the structure', 'Contaminated insulation and droppings removed, the space sanitized'],
      why: 'Rodents gnaw electrical wiring, which is a genuine fire risk, and they ruin insulation by nesting in it. Droppings and urine carry hantavirus, salmonella and leptospirosis, and they contaminate stored food.',
      img: 'rats.jpg', alt: 'A rat on a structural surface' },
    { slug: 'silverfish', name: 'Silverfish',
      lead: 'Silverfish need damp and dark, so they turn up in bathrooms, basements and storage boxes.',
      steps: ['Moisture sources identified, since silverfish cannot survive without them', 'Treatment of voids, baseboards and storage areas', 'Ventilation and damp advice for the affected rooms', 'Follow-up to confirm the population is gone'],
      why: 'Silverfish feed on paper, book bindings, wallpaper paste, natural fabric and dry goods. They are slow to build up and easy to miss until stored documents, clothing or photographs are already damaged.',
      img: null, alt: '' },
    { slug: 'spiders', name: 'Spiders',
      lead: 'Most spiders in an LA home are harmless, but black widows are common and worth taking seriously.',
      steps: ['Webs and egg sacs removed from eaves, corners and garages', 'Treatment of the insects spiders are feeding on', 'Black widow harborage in garages, meter boxes and woodpiles treated', 'Perimeter and entry points treated'],
      why: 'A spider problem is usually a symptom: they are there because other insects are. Black widows nest in garages, under patio furniture and in meter boxes, exactly where hands go without looking.',
      img: 'spiders.jpg', alt: 'A spider in its web' },
    { slug: 'ticks', name: 'Ticks',
      lead: 'Ticks come in on pets and wildlife and wait in tall grass and leaf litter at the yard edge.',
      steps: ['Yard perimeter, tall grass and leaf litter treated', 'Pet runs and resting areas treated', 'Harborage such as woodpiles and overgrowth identified', 'Follow-up through the active season'],
      why: 'Ticks transmit Lyme disease and Rocky Mountain spotted fever, and western black-legged ticks are present in California. They also establish indoors on pets, which turns a yard problem into a household one.',
      img: 'ticks.jpg', alt: 'A tick on skin' },
    { slug: 'wasps-hornets', name: 'Wasps & Hornets',
      lead: 'Nests in eaves, wall voids and attics need removing properly, not knocking down.',
      steps: ['Nest located and the species identified before anything is treated', 'Nest treated and removed, including inside wall voids', 'Surrounding area checked for satellite nests', 'Entry points sealed to prevent re-nesting'],
      why: 'Disturbing a nest provokes repeated stings, which is dangerous for anyone allergic and for children. Wasps also return to a familiar site season after season, so a nest removed properly saves the same problem next summer.',
      img: 'wasps-hornets.jpg', alt: 'A wasp nest under an eave' }
  ];

  /* Per-service, per-segment copy for the home page "What We Do" cards — verbatim from `defs`. */
  var serviceDefs = [
    { id: 'pest', title: 'Pest Control',
      residential: 'Ants, roaches, spiders and rodents cleared out of the house, and the way they got in sealed behind them.',
      commercial: 'Scheduled service for restaurants, apartment buildings, offices and warehouses, with records for your health inspector.' },
    { id: 'termite', title: 'Termite Control',
      residential: 'Inspection, local treatment or fumigation, and repair of the wood already lost. $50 off your first service.',
      commercial: 'Whole-structure inspection and treatment, phased around tenants and trading hours. $50 off your first service.' },
    { id: 'insulation', title: 'Insulation',
      residential: 'Batt, blown-in and radiant barrier installed. Contaminated material removed and the attic sanitized.',
      commercial: 'Building-wide insulation and soundproofing, installed unit by unit so the property keeps operating.' },
    { id: 'construction', title: 'Construction Services',
      residential: 'Dry rot and termite damage repair, drywall, decks, fencing, and attic or crawlspace rebuild after fumigation.',
      commercial: 'Damage repair, drywall and structural rebuild, scheduled around tenants and turnover dates.' }
  ];

  var cardArt = {
    pest: ['pest-control.jpg', 'Technician treating the perimeter of a property'],
    termite: ['termite-control.jpg', 'Termite treatment being carried out'],
    insulation: ['insulation.jpg', 'New insulation installed in an attic'],
    construction: ['construction-workers.jpg', 'Crew carrying out repair work']
  };

  var SVC_ROUTE = { pest: 'pest-control', termite: 'termite-control', insulation: 'insulation', construction: 'construction-services' };
  var SVC_TITLE = { pest: 'Pest Control', termite: 'Termite Control', insulation: 'Insulation', construction: 'Construction Services' };

  var state = { seg: 'residential', mega: false, navOpen: false };

  function findPest(slug) {
    for (var i = 0; i < pestList.length; i++) if (pestList[i].slug === slug) return pestList[i];
    return null;
  }

  /* ---------------------------------------------------------------- routing */

  function parseRoute() {
    var h = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    var parts = h.split('/').filter(Boolean);
    if (parts.length === 0) return { page: 'home' };
    if (parts[0] === 'pest-control') return { page: 'service', svc: 'pest' };
    if (parts[0] === 'termite-control') return { page: 'service', svc: 'termite' };
    if (parts[0] === 'insulation') return { page: 'service', svc: 'insulation' };
    if (parts[0] === 'construction-services') return { page: 'service', svc: 'construction' };
    if (parts[0] === 'pest' && parts[1] && findPest(parts[1])) return { page: 'pest-detail', pest: parts[1] };
    if (parts[0] === 'contact' && parts[1]) return { page: 'contact', service: parts[1] };
    if (parts[0] === 'contact') return { page: 'contact' };
    return { page: 'home' };
  }

  var SERVICE_TITLES = { pest: 'Pest Control', termite: 'Termite Control', insulation: 'Insulation', construction: 'Construction Services', other: 'General Inquiry' };

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function subjectForService(id) {
    if (!id) return '';
    if (id.indexOf('pest-') === 0) {
      var pest = findPest(id.slice(5));
      return pest ? 'Quote request — ' + pest.name + ' (Pest Control)' : '';
    }
    return SERVICE_TITLES[id] ? 'Quote request — ' + SERVICE_TITLES[id] : '';
  }

  /* Service <select> options for the contact form, with the 14 pests nested under an
     optgroup so a visitor (or a prefilled "Free Quote" link) can name their exact pest. */
  function serviceSelectOptions(selected) {
    function opt(value, label) {
      return '<option value="' + value + '"' + (value === selected ? ' selected' : '') + '>' + label + '</option>';
    }
    var pestOptions = pestList.map(function (p) { return opt('pest-' + p.slug, p.name); }).join('');
    return (
      opt('', 'Select a service') +
      opt('pest', 'Pest control — not sure which pest') +
      '<optgroup label="Pest Control">' + pestOptions + '</optgroup>' +
      opt('termite', 'Termite control') +
      opt('insulation', 'Insulation') +
      opt('construction', 'Construction services') +
      opt('other', 'Something else')
    );
  }

  function go(route) {
    window.location.hash = route;
  }

  /* ---------------------------------------------------------------- shared fragments */

  function promoBar() {
    return (
      '<div class="mc-promo"><p class="mc-promo__text">First-time customers can enjoy $50 off any service.</p></div>'
    );
  }

  function utilBar() {
    var isRes = state.seg === 'residential';
    return (
      '<div class="mc-util"><div class="mc-util__bar">' +
        '<div class="mc-util__side"><a class="mc-util__phone" href="tel:3102131574">Call 310-213-1574</a></div>' +
        '<div class="mc-tabs" role="group" aria-label="Property type">' +
          '<button type="button" class="mc-tab" data-action="pick-res" aria-pressed="' + isRes + '">Residential</button>' +
          '<button type="button" class="mc-tab" data-action="pick-com" aria-pressed="' + !isRes + '">Commercial</button>' +
        '</div>' +
        '<div class="mc-util__side"><span class="mc-util__note">Serving the Greater Los Angeles Area</span></div>' +
      '</div></div>'
    );
  }

  function megaMenu() {
    if (!state.mega) return '';
    var segLower = state.seg === 'residential' ? 'residential' : 'commercial';
    var items = pestList.map(function (p) {
      return '<li><a class="mc-mega__link" href="#/pest/' + p.slug + '">' + p.name + '</a></li>';
    }).join('');
    return (
      '<div class="mc-mega">' +
        '<div class="mc-mega__inner">' +
          '<div>' +
            '<h2 class="heading-md" style="margin:0 0 var(--space-2);color:var(--ink)">Targeted Pest Control</h2>' +
            '<p class="body" style="margin:0 0 var(--space-4);color:var(--ink-muted)">Treatment matched to the pest, for ' + segLower + ' property across Los Angeles.</p>' +
            '<a class="mc-btn mc-btn--primary mc-btn--sm" href="#/pest-control">Pest Control Overview</a>' +
          '</div>' +
          '<ul class="mc-mega__list">' + items + '</ul>' +
        '</div>' +
      '</div>'
    );
  }

  function mobileDrawer() {
    if (!state.navOpen) return '';
    var isRes = state.seg === 'residential';
    var segLabel = isRes ? 'Residential' : 'Commercial';
    var pestRows = pestList.map(function (p) {
      return '<a class="mc-drawer__row" href="#/pest/' + p.slug + '">' + p.name + '</a>';
    }).join('');
    return (
      '<nav class="mc-shell" aria-label="Primary" style="padding:0 var(--space-4) var(--space-5);display:flex;flex-direction:column;max-height:76vh;overflow:auto">' +
        '<div class="mc-drawer__group">' +
          '<p class="caption mc-drawer__eyebrow">I need service for a</p>' +
          '<div class="mc-segswitch mc-segswitch--block" role="group" aria-label="Property type">' +
            '<button type="button" class="mc-segswitch__btn" data-action="pick-res" aria-pressed="' + isRes + '">Residential</button>' +
            '<button type="button" class="mc-segswitch__btn" data-action="pick-com" aria-pressed="' + !isRes + '">Commercial</button>' +
          '</div>' +
        '</div>' +
        '<div class="mc-drawer__group">' +
          '<p class="caption mc-drawer__eyebrow">' + segLabel + ' services</p>' +
          '<a class="mc-drawer__row" href="#/pest-control">Pest Control</a>' +
          '<a class="mc-drawer__row" href="#/termite-control">Termite Control</a>' +
          '<a class="mc-drawer__row" href="#/insulation">Insulation</a>' +
          '<a class="mc-drawer__row" href="#/construction-services">Construction Services</a>' +
        '</div>' +
        '<div class="mc-drawer__group">' +
          '<p class="caption mc-drawer__eyebrow">By pest</p>' +
          pestRows +
        '</div>' +
        '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact" style="margin-top:var(--space-5)">Get In Touch With Us</a>' +
      '</nav>'
    );
  }

  function header() {
    return (
      '<header class="mc-header mc-header--elevated" style="position:sticky;top:0;z-index:40">' +
        '<div class="mc-header__bar mc-shell">' +
          '<a class="mc-header__logo" href="#/" aria-label="Madison Castle, home">' +
            '<img class="mc-header__logo-image" src="./assets/madison-castle-logo.png" alt="Madison Castle" width="86" height="96" />' +
          '</a>' +
          '<nav class="mc-header__nav" aria-label="Primary">' +
            '<ul class="mc-header__list">' +
              '<li class="mc-header__item"><button type="button" class="mc-trigger" data-action="toggle-mega" aria-expanded="' + state.mega + '">Pest Control<span class="mc-trigger__caret" aria-hidden="true"></span></button></li>' +
              '<li class="mc-header__item"><a class="mc-header__link" href="#/termite-control">Termite Control</a></li>' +
              '<li class="mc-header__item"><a class="mc-header__link" href="#/insulation">Insulation</a></li>' +
              '<li class="mc-header__item"><a class="mc-header__link" href="#/construction-services">Construction Services</a></li>' +
            '</ul>' +
          '</nav>' +
          '<div class="mc-header__end" style="display:flex;align-items:center;gap:var(--space-4)">' +
            '<a class="mc-btn mc-btn--primary mc-btn--sm mc-header__quote" href="#/contact">Get In Touch With Us</a>' +
            '<button type="button" class="mc-nav-toggle" data-action="toggle-nav" aria-expanded="' + state.navOpen + '" aria-label="' + (state.navOpen ? 'Close menu' : 'Open menu') + '">' +
              (state.navOpen
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>') +
            '</button>' +
          '</div>' +
        '</div>' +
        megaMenu() +
        mobileDrawer() +
      '</header>'
    );
  }

  function footer() {
    var year = new Date().getFullYear();
    return (
      '<footer class="mc-footer">' +
        '<div class="mc-footer__inner mc-shell">' +
          '<a class="mc-header__logo mc-footer__logo" href="#/" aria-label="Madison Castle, home">' +
            '<img class="mc-header__logo-image mc-footer__logo-image" src="./assets/madison-castle-logo.png" alt="Madison Castle" width="86" height="96" />' +
          '</a>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-5);text-align:left;width:100%;max-width:640px">' +
            '<nav aria-label="Residential services">' +
              '<p class="eyebrow" style="margin:0 0 var(--space-2);color:var(--green-light)">Residential</p>' +
              '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-2)">' +
                '<li><a class="mc-footer__link" href="#/pest-control" data-seg="residential">Pest Control</a></li>' +
                '<li><a class="mc-footer__link" href="#/termite-control" data-seg="residential">Termite Control</a></li>' +
                '<li><a class="mc-footer__link" href="#/insulation" data-seg="residential">Insulation</a></li>' +
                '<li><a class="mc-footer__link" href="#/construction-services" data-seg="residential">Construction Services</a></li>' +
              '</ul>' +
            '</nav>' +
            '<nav aria-label="Commercial services">' +
              '<p class="eyebrow" style="margin:0 0 var(--space-2);color:var(--green-light)">Commercial</p>' +
              '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-2)">' +
                '<li><a class="mc-footer__link" href="#/pest-control" data-seg="commercial">Pest Control</a></li>' +
                '<li><a class="mc-footer__link" href="#/termite-control" data-seg="commercial">Termite Control</a></li>' +
                '<li><a class="mc-footer__link" href="#/insulation" data-seg="commercial">Insulation</a></li>' +
                '<li><a class="mc-footer__link" href="#/construction-services" data-seg="commercial">Construction Services</a></li>' +
              '</ul>' +
            '</nav>' +
            '<nav aria-label="Company">' +
              '<p class="eyebrow" style="margin:0 0 var(--space-2);color:var(--green-light)">Company</p>' +
              '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-2)">' +
                '<li><a class="mc-footer__link" href="#/contact">Get In Touch With Us</a></li>' +
                '<li><a class="mc-footer__link" href="https://www.facebook.com/173060215881271" target="_blank" rel="noopener">Facebook</a></li>' +
                '<li><a class="mc-footer__link" href="https://www.instagram.com/officialmadisoncastle/" target="_blank" rel="noopener">Instagram</a></li>' +
                '<li><a class="mc-footer__link" href="https://www.yelp.com/biz/Vu0GljkpTMYycVwdq0DAAA" target="_blank" rel="noopener">Yelp</a></li>' +
              '</ul>' +
            '</nav>' +
          '</div>' +
          '<p class="mc-footer__contact"><a href="tel:3102131574">310-213-1574</a> · <a href="mailto:madisoncastle2@gmail.com">madisoncastle2@gmail.com</a> · The Greater Los Angeles Area, CA</p>' +
          '<p class="mc-footer__contact">Mon–Fri 7:00am–6:00pm · Sat 7:00am–4:00pm · Sun closed</p>' +
          '<p class="mc-footer__legal">Madison Castle, operating as Castle Exterminating. Licensed and insured in California. Serving the Greater Los Angeles Area since 2019. © ' + year + ' Madison Castle. All rights reserved.</p>' +
        '</div>' +
      '</footer>'
    );
  }

  /* ---------------------------------------------------------------- pages */

  function pageHome() {
    var isRes = state.seg === 'residential';
    var cards = serviceDefs.map(function (d) {
      var art = cardArt[d.id];
      return (
        '<article class="mc-service" style="background:transparent;max-width:none">' +
          '<div style="aspect-ratio:3/2;width:100%;overflow:hidden">' +
            '<img src="' + PHOTOS + art[0] + '" alt="' + art[1] + '" style="width:100%;height:100%;object-fit:cover;display:block" />' +
          '</div>' +
          '<div class="mc-service__body">' +
            '<p class="eyebrow" style="margin:0 0 var(--space-1);color:var(--green-deep)">' + (isRes ? 'Residential' : 'Commercial') + '</p>' +
            '<h3 class="mc-service__title">' + d.title + '</h3>' +
            '<p class="mc-service__text">' + (isRes ? d.residential : d.commercial) + '</p>' +
            '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/' + SVC_ROUTE[d.id] + '">Learn More</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    return (
      '<div data-screen-label="Home">' +
        '<section class="mc-hero mc-hero--panel" style="position:relative;overflow:hidden">' +
          '<div style="position:absolute;inset:0">' +
            '<img src="' + PHOTOS + 'pest-control-team.jpg" alt="The Madison Castle crew on a job in Los Angeles" style="width:100%;height:100%;object-fit:cover;display:block" />' +
          '</div>' +
          '<div class="mc-hero__scrim" style="position:relative">' +
            '<div class="mc-hero__inner">' +
              '<h1 class="mc-hero__title">Pest, termite and insulation experts in Los Angeles</h1>' +
              '<p class="mc-hero__subtitle">Madison Castle has served the Greater Los Angeles Area since 2019. Licensed, family owned, and guaranteed in writing.</p>' +
              '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact">Free Quote</a>' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div>' +
              '<header class="mc-heading mc-heading--ink">' +
                '<h2 class="mc-heading__title">Who We Are</h2>' +
                '<p class="mc-heading__lead">Madison Castle, operating as Castle Exterminating, is a family-owned pest control company working across the Greater Los Angeles Area since 2019.</p>' +
              '</header>' +
              '<p class="body" style="margin:var(--space-5) 0 0;color:var(--ink-muted)">We hold a California structural pest control license and carry insurance on every job. The same people who inspect your property do the treatment and come back for the follow-up, so nothing gets handed off or forgotten.</p>' +
            '</div>' +
            '<div>' +
              '<header class="mc-heading mc-heading--ink"><h2 class="mc-heading__title">Our Approach</h2></header>' +
              '<ol style="margin:var(--space-5) 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:var(--space-5)">' +
                '<li><h3 class="heading-sm" style="margin:0 0 var(--space-1);color:var(--ink)">1. Inspect first</h3><p class="body" style="margin:0;color:var(--ink-muted)">We find the species, the nest and the way in before quoting anything. The inspection is free.</p></li>' +
                '<li><h3 class="heading-sm" style="margin:0 0 var(--space-1);color:var(--ink)">2. Treat the cause</h3><p class="body" style="margin:0;color:var(--ink-muted)">Proven methods matched to the pest, with options that are safe around children and pets.</p></li>' +
                '<li><h3 class="heading-sm" style="margin:0 0 var(--space-1);color:var(--ink)">3. Close it behind us</h3><p class="body" style="margin:0;color:var(--ink-muted)">Entry points sealed, damaged material repaired or replaced, and the work guaranteed in writing.</p></li>' +
              '</ol>' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell">' +
            '<header class="mc-heading mc-heading--green">' +
              '<h2 class="mc-heading__title">What We Do</h2>' +
              '<p class="mc-heading__lead">The same four services for homes and for commercial property. Choose which applies to you.</p>' +
            '</header>' +
            '<div class="mc-segswitch" role="group" aria-label="Property type" style="margin-top:var(--space-5)">' +
              '<button type="button" class="mc-segswitch__btn" data-action="pick-res" aria-pressed="' + isRes + '">Residential</button>' +
              '<button type="button" class="mc-segswitch__btn" data-action="pick-com" aria-pressed="' + !isRes + '">Commercial</button>' +
            '</div>' +
            '<div style="margin-top:var(--space-7);display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5)">' + cards + '</div>' +
          '</div>' +
        '</section>' +

        '<section class="mc-band" style="background:var(--surface-inverse)">' +
          '<div class="mc-shell" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-5)">' +
            '<header class="mc-heading mc-heading--inverse" style="text-align:center"><h2 class="mc-heading__title">What Our Customers Say</h2></header>' +
            '<div style="display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap;justify-content:center">' +
              '<span class="display-lg" style="color:var(--on-inverse)">4.5</span>' +
              '<span class="body" style="color:var(--on-inverse-muted)">★★★★☆ · 8 reviews on Yelp</span>' +
            '</div>' +
            '<div id="mc-yelp-badge" style="width:100%;max-width:360px;min-height:120px">' +
              '<div class="elfsight-app-d4d6ea1c-3590-4c2f-a8af-f3714f1958b1" data-elfsight-app-lazy></div>' +
            '</div>' +
            '<a class="mc-btn mc-btn--on-dark mc-btn--md" href="https://www.yelp.com/biz/Vu0GljkpTMYycVwdq0DAAA" target="_blank" rel="noopener">Read Reviews</a>' +
          '</div>' +
        '</section>' +

        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-5)">' +
            '<header class="mc-heading mc-heading--ink" style="text-align:center">' +
              '<h2 class="mc-heading__title">Get Started</h2>' +
              '<p class="mc-heading__lead">Call for same-week scheduling, or send a request and we will confirm a time. First-time customers get $50 off.</p>' +
            '</header>' +
            '<div style="display:flex;flex-wrap:wrap;gap:var(--space-4);justify-content:center;width:100%;max-width:560px">' +
              '<a class="mc-btn mc-btn--primary mc-btn--md" href="tel:3102131574" style="flex:1 1 200px">Call 310-213-1574</a>' +
              '<a class="mc-btn mc-btn--secondary mc-btn--md" href="#/contact" style="flex:1 1 200px">Get In Touch With Us</a>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>'
    );
  }

  function pageService(svc) {
    var isRes = state.seg === 'residential';
    var segLabel = isRes ? 'Residential' : 'Commercial';
    var title = SVC_TITLE[svc];

    var lead;
    if (svc === 'pest') {
      lead = isRes
        ? 'Insects and rodents in a home are more than a nuisance. They contaminate food, carry disease, and chew through wood, insulation and wiring. We use proven methods to clear what is already inside and keep it from coming back.'
        : 'A pest problem in a business costs more than the treatment. It risks your health score, your inventory and your reputation. We service commercial properties across the Greater Los Angeles Area on a schedule that works around your hours.';
    } else if (svc === 'termite') {
      lead = isRes
        ? 'Termites do structural damage quietly, often for years before anyone notices. We inspect, identify the species, treat it, and repair the wood they have already destroyed. First-time customers get $50 off.'
        : 'On a commercial or multi-unit building, termite damage becomes a liability as well as a repair bill. We inspect the whole structure, treat it, and coordinate the work around tenants and trading hours. First-time customers get $50 off.';
    } else if (svc === 'insulation') {
      lead = isRes
        ? 'Insulation is where pest work and comfort meet. Rodents nest in it, fumigation disturbs it, and an under-insulated attic makes a Los Angeles summer far more expensive than it needs to be. We remove what is contaminated and install what belongs there.'
        : 'In a commercial building insulation drives the cooling bill, the noise between units and the comfort complaints you field. We remove contaminated material, install what the space needs, and work unit by unit so the building keeps operating.';
    } else {
      lead = isRes
        ? 'Most pest companies treat the infestation and leave the damage for someone else. We do both. Madison Castle repairs and rebuilds the wood that termites, dry rot and rodents destroy, so one crew closes out the whole job.'
        : 'Treatment is only half of a commercial job. The damaged framing, drywall and decking still has to be put right before a unit can be re-let or a space reopened. One licensed crew handles the treatment and the repairs.';
    }

    var heroCtas = svc === 'construction'
      ? '<a class="mc-btn mc-btn--primary mc-btn--md" href="tel:3102131574">Call for Pricing</a><a class="mc-btn mc-btn--secondary mc-btn--md" href="#/contact/' + svc + '">Get In Touch With Us</a>'
      : '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/' + svc + '">Free Quote</a><a class="mc-btn mc-btn--secondary mc-btn--md" href="tel:3102131574">Call 310-213-1574</a>';

    var top =
      '<section class="mc-band" style="background:var(--surface-sunken)">' +
        '<div class="mc-shell">' +
          '<p class="eyebrow" style="margin:0 0 var(--space-2);color:var(--ink)">' + segLabel + '</p>' +
          '<h1 class="display-lg" style="margin:0;color:var(--ink)">' + title + '</h1>' +
          '<p class="lead" style="margin:var(--space-5) 0 0;max-width:720px;color:var(--ink-muted)">' + lead + '</p>' +
          '<div style="margin-top:var(--space-5);display:flex;flex-wrap:wrap;gap:var(--space-4)">' + heroCtas + '</div>' +
        '</div>' +
      '</section>';

    var body = '';
    if (svc === 'pest') {
      body = isRes ? (
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">What we treat</h2>' +
              '<ul class="body" style="margin:0;padding-left:20px;color:var(--ink-muted);display:flex;flex-direction:column;gap:var(--space-2)">' +
                '<li>Ants, including the trails that lead back to the nest</li>' +
                '<li>Cockroaches in kitchens, bathrooms and wall voids</li>' +
                '<li>Rats and mice, plus the entry points they use</li>' +
                '<li>Spiders, silverfish and other crawling insects</li>' +
                '<li>Fleas and bed bugs</li>' +
                '<li>Wasps, bees and hornet nests</li>' +
              '</ul>' +
              '<p class="caption" style="margin:var(--space-4) 0 0;color:var(--ink-muted)">Not sure what you have? Send a photo and we will identify it before the visit.</p>' +
            '</div>' +
            '<div style="aspect-ratio:4/3;width:100%"><img src="' + PHOTOS + 'pest-control.jpg" alt="Technician treating the perimeter of a home" style="width:100%;height:100%;object-fit:cover;display:block" /></div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell">' +
            '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">How a home visit works</h2>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--space-5)">' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Free inspection</h3><p class="body" style="margin:0;color:var(--ink-muted)">We walk the interior, the perimeter and the attic or crawlspace, identify the species, and show you where they are getting in.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Targeted treatment</h3><p class="body" style="margin:0;color:var(--ink-muted)">Treatment matched to the pest rather than a blanket spray, with products that are safe around children and pets once dry.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Follow-up and guarantee</h3><p class="body" style="margin:0;color:var(--ink-muted)">We return to confirm the problem is gone. Treatments are backed by a written guarantee. If the pest comes back within the term, so do we.</p></div>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:flex;flex-direction:column;gap:var(--space-5);align-items:flex-start">' +
            '<h2 class="heading-md" style="margin:0;color:var(--ink)">Ongoing protection</h2>' +
            '<p class="body" style="margin:0;max-width:720px;color:var(--ink-muted)">Most Los Angeles homes stay clear with a quarterly exterior service. It is the cheapest way to handle pests, because nothing gets established indoors. Ask about scheduling when you call.</p>' +
            '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/pest">Get In Touch With Us</a>' +
          '</div>' +
        '</section>'
      ) : (
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Properties we service</h2>' +
              '<ul class="body" style="margin:0;padding-left:20px;color:var(--ink-muted);display:flex;flex-direction:column;gap:var(--space-2)">' +
                '<li>Restaurants, cafés and commercial kitchens</li>' +
                '<li>Apartment buildings and multi-unit residential</li>' +
                '<li>Offices and retail storefronts</li>' +
                '<li>Warehouses and storage facilities</li>' +
                '<li>Property management portfolios</li>' +
              '</ul>' +
            '</div>' +
            '<div style="aspect-ratio:4/3;width:100%;overflow:hidden"><img src="' + PHOTOS + 'pest-control.jpg" alt="Commercial pest control service in progress" style="width:100%;height:100%;object-fit:cover;display:block" /></div>' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">How commercial differs</h2>' +
              '<p class="body" style="margin:0 0 var(--space-4);color:var(--ink-muted)">We schedule before opening or after close so service never happens in front of customers, and we keep written records of every visit and product used, which is what a health inspector asks for.</p>' +
              '<p class="body" style="margin:0;color:var(--ink-muted)">Recurring monthly or quarterly contracts keep a property continuously covered. One point of contact handles every site in a portfolio.</p>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell" style="display:flex;flex-direction:column;gap:var(--space-5);align-items:flex-start">' +
            '<h2 class="heading-md" style="margin:0;color:var(--ink)">Request a walk-through</h2>' +
            '<p class="body" style="margin:0;max-width:720px;color:var(--ink-muted)">Every commercial quote starts with a site visit, at no cost. Tell us the property type and square footage and we will come out.</p>' +
            '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/pest">Get In Touch With Us</a>' +
          '</div>' +
        '</section>'
      );
    } else if (svc === 'termite') {
      body =
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Signs to look for</h2>' +
              '<ul class="body" style="margin:0;padding-left:20px;color:var(--ink-muted);display:flex;flex-direction:column;gap:var(--space-2)">' +
                '<li>Small piles of what looks like sawdust or pellets</li>' +
                '<li>Discarded wings near windowsills after a swarm</li>' +
                '<li>Wood that sounds hollow or gives under pressure</li>' +
                '<li>Mud tubes along a foundation or in a crawlspace</li>' +
                '<li>Paint that blisters or bubbles over a flat surface</li>' +
              '</ul>' +
            '</div>' +
            '<div style="aspect-ratio:4/3;width:100%"><img src="' + PHOTOS + 'termites.jpg" alt="Termites in damaged structural wood" style="width:100%;height:100%;object-fit:cover;display:block" /></div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell">' +
            '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Treatments we offer</h2>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--space-5)">' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Inspection and report</h3><p class="body" style="margin:0;color:var(--ink-muted)">A full inspection of the structure, including attic and subarea, with a written report of what we found and where.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Local and spot treatment</h3><p class="body" style="margin:0;color:var(--ink-muted)">For drywood termites confined to a limited area, treatment is applied directly to the infested members. No tenting, no moving out.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Fumigation</h3><p class="body" style="margin:0;color:var(--ink-muted)">For widespread drywood infestation, the structure is tented and fumigated. We walk you through preparation and the time out of the building.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Soil treatment</h3><p class="body" style="margin:0;color:var(--ink-muted)">Subterranean termites are treated at the soil line to break the route between the colony and your structure.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Damage repair</h3><p class="body" style="margin:0;color:var(--ink-muted)">We replace the wood termites ruined, from a single joist to a rebuilt subfloor. <a href="#/construction-services">See construction services</a>.</p></div>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div style="aspect-ratio:4/3;width:100%;overflow:hidden"><img src="' + PHOTOS + 'termite-fumigation.jpg" alt="A tented structure during termite fumigation" style="width:100%;height:100%;object-fit:cover;display:block" /></div>' +
            '<div style="display:flex;flex-direction:column;gap:var(--space-5);align-items:flex-start">' +
              (isRes
                ? '<div><h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Buying or selling a home</h2><p class="body" style="margin:0 0 var(--space-5);max-width:720px;color:var(--ink-muted)">Escrow usually requires a termite inspection and a clearance on any damage found. We inspect, quote the repairs, and complete them in time for closing.</p></div>'
                : '<div><h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Working around tenants</h2><p class="body" style="margin:0 0 var(--space-5);max-width:720px;color:var(--ink-muted)">For occupied buildings we phase the work unit by unit, give tenants written notice and preparation instructions, and schedule fumigation for the window that empties the building for the shortest time.</p></div>') +
              '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/termite">Get In Touch With Us</a>' +
            '</div>' +
          '</div>' +
        '</section>';
    } else if (svc === 'insulation') {
      var whyList = isRes ? (
        '<ul class="body" style="margin:0;padding-left:20px;color:var(--ink-muted);display:flex;flex-direction:column;gap:var(--space-2)">' +
          '<li>Lower cooling bills through the summer, and less heating in winter</li>' +
          '<li>Rooms that hold an even temperature instead of one hot bedroom</li>' +
          '<li>Less noise from the street and between units</li>' +
          '<li>Contaminated material and its odor removed from the house</li>' +
          '<li>An air conditioner that cycles less and lasts longer</li>' +
        '</ul>'
      ) : (
        '<ul class="body" style="margin:0;padding-left:20px;color:var(--ink-muted);display:flex;flex-direction:column;gap:var(--space-2)">' +
          '<li>A lower cooling load across the whole building envelope</li>' +
          '<li>Fewer temperature complaints from tenants and staff</li>' +
          '<li>Sound separation between units, offices and corridors</li>' +
          '<li>Contaminated material removed before a turnover or inspection</li>' +
          '<li>Less runtime on rooftop units and packaged HVAC</li>' +
        '</ul>'
      );
      body =
        '<section class="mc-band">' +
          '<div class="mc-shell">' +
            '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">What we install</h2>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--space-5)">' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Batt and rolled insulation</h3><p class="body" style="margin:0;color:var(--ink-muted)">Fitted between joists and studs in attics, walls and crawlspaces. The standard choice for an accessible attic floor.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Blown-in insulation</h3><p class="body" style="margin:0;color:var(--ink-muted)">Loose fill blown into place to reach the gaps batts cannot, around obstructions and into irregular cavities.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Radiant barrier</h3><p class="body" style="margin:0;color:var(--ink-muted)">A reflective layer under the roof deck that turns back radiant heat before it loads the attic. Well suited to the LA climate.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Soundproofing</h3><p class="body" style="margin:0;color:var(--ink-muted)">Acoustic insulation in shared walls and ceilings, for apartments, home offices and rooms on a busy street.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Removal of damaged insulation</h3><p class="body" style="margin:0;color:var(--ink-muted)">Rodents leave insulation soiled and matted, and it stops working. We bag it out and haul it away.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Attic cleanout and sanitizing</h3><p class="body" style="margin:0;color:var(--ink-muted)">After an infestation we clear the debris, sanitize the space, and seal the entry points before new material goes in.</p></div>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div><h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Why it is worth doing</h2>' + whyList + '</div>' +
            '<div style="aspect-ratio:4/3;width:100%"><img src="' + PHOTOS + 'insulation.jpg" alt="New insulation installed in an attic" style="width:100%;height:100%;object-fit:cover;display:block" /></div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:flex;flex-direction:column;gap:var(--space-5);align-items:flex-start">' +
            '<h2 class="heading-md" style="margin:0;color:var(--ink)">Getting a number</h2>' +
            '<p class="body" style="margin:0;max-width:720px;color:var(--ink-muted)">Insulation is priced by square footage, the depth needed and whether old material has to come out first. We measure the space and quote it in person, at no cost.</p>' +
            '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/insulation">Free Quote</a>' +
          '</div>' +
        '</section>';
    } else {
      var pricingSub = isRes
        ? '<p class="body" style="margin:0 0 var(--space-5);color:var(--ink-muted)">Call and describe the damage, or send the inspection report. We will come out, measure, and give you a written quote before anything starts.</p>'
        : '<p class="body" style="margin:0 0 var(--space-5);color:var(--ink-muted)">Send the inspection report or the scope you have been given. We will walk the site, quote it in writing, and schedule around tenants, trading hours or a turnover date.</p>';
      body =
        '<section class="mc-band">' +
          '<div class="mc-shell">' +
            '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">What we build and repair</h2>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--space-5)">' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Dry rot and termite damage repair</h3><p class="body" style="margin:0;color:var(--ink-muted)">Compromised framing, joists, beams, sill plates and trim cut out and replaced with sound material.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Drywall</h3><p class="body" style="margin:0;color:var(--ink-muted)">Patching where we opened a wall, or full replacement after water or pest damage, finished and ready for paint.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Decks</h3><p class="body" style="margin:0;color:var(--ink-muted)">Repair or rebuild of decks and stairs, including the posts and framing underneath that usually fail first.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Fencing</h3><p class="body" style="margin:0;color:var(--ink-muted)">New fencing and gates, or replacement of sections lost to rot at the ground line.</p></div>' +
              '<div><h3 class="heading-sm" style="margin:0 0 var(--space-2);color:var(--ink)">Attic and crawlspace rebuild</h3><p class="body" style="margin:0;color:var(--ink-muted)">After fumigation or a rodent infestation we restore the space: framing, decking, vents, access doors and new insulation.</p></div>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Pricing</h2>' +
              '<p class="body" style="margin:0 0 var(--space-4);color:var(--ink-muted)">Construction work is priced per job. Two properties with the same termite report can need very different repairs once the wood is opened up, so we do not publish a flat rate.</p>' +
              pricingSub +
              '<a class="mc-btn mc-btn--primary mc-btn--md" href="tel:3102131574">Call for Pricing</a>' +
            '</div>' +
            '<div style="aspect-ratio:4/3;width:100%"><img src="' + PHOTOS + 'construction.jpg" alt="Structural repair work after pest damage" style="width:100%;height:100%;object-fit:cover;display:block" /></div>' +
          '</div>' +
        '</section>';
    }

    return '<div data-screen-label="' + title + '">' + top + body + '</div>';
  }

  function pagePestDetail(slug) {
    var p = findPest(slug);
    if (!p) return pageHome();
    var segLabel = state.seg === 'residential' ? 'Residential' : 'Commercial';
    var steps = p.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('');
    var imgBlock = p.img
      ? '<div style="aspect-ratio:16/7;width:100%;overflow:hidden;margin-bottom:var(--space-7)"><img src="' + PHOTOS + p.img + '" alt="' + p.alt + '" style="width:100%;height:100%;object-fit:cover;display:block" /></div>'
      : '';

    return (
      '<div data-screen-label="Pest detail">' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell">' +
            '<p class="eyebrow" style="margin:0 0 var(--space-2);color:var(--ink)">' + segLabel + ' Pest Control</p>' +
            '<h1 class="display-lg" style="margin:0;color:var(--ink)">' + p.name + '</h1>' +
            '<p class="lead" style="margin:var(--space-5) 0 0;max-width:720px;color:var(--ink-muted)">' + p.lead + '</p>' +
            '<div style="margin-top:var(--space-5);display:flex;flex-wrap:wrap;gap:var(--space-4)">' +
              '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/pest-' + p.slug + '">Free Quote</a>' +
              '<a class="mc-btn mc-btn--secondary mc-btn--md" href="tel:3102131574">Call 310-213-1574</a>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band">' +
          '<div class="mc-shell">' +
            imgBlock +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
              '<div><h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">What the treatment involves</h2>' +
                '<ul class="body" style="margin:0;padding-left:20px;color:var(--ink-muted);display:flex;flex-direction:column;gap:var(--space-2)">' + steps + '</ul>' +
              '</div>' +
              '<div><h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Why it matters</h2><p class="body" style="margin:0;color:var(--ink-muted)">' + p.why + '</p></div>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell" style="display:flex;flex-direction:column;gap:var(--space-5);align-items:flex-start">' +
            '<h2 class="heading-md" style="margin:0;color:var(--ink)">Get a free quote</h2>' +
            '<p class="body" style="margin:0;max-width:720px;color:var(--ink-muted)">The inspection is free and the treatment is guaranteed in writing. First-time customers get $50 off.</p>' +
            '<div style="display:flex;flex-wrap:wrap;gap:var(--space-4)">' +
              '<a class="mc-btn mc-btn--primary mc-btn--md" href="#/contact/pest-' + p.slug + '">Free Quote</a>' +
              '<a class="mc-btn mc-btn--secondary mc-btn--md" href="#/pest-control">All pest control services</a>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>'
    );
  }

  function pageContact(service) {
    var subject = subjectForService(service);
    return (
      '<div data-screen-label="Contact">' +
        '<section class="mc-band" style="background:var(--surface-sunken)">' +
          '<div class="mc-shell">' +
            '<h1 class="display-lg" style="margin:0;color:var(--ink)">Get In Touch With Us</h1>' +
            '<p class="lead" style="margin:var(--space-5) 0 0;max-width:720px;color:var(--ink-muted)">Call during business hours for the fastest answer. Otherwise send a message and we will get back to you the next working day.</p>' +
          '</div>' +
        '</section>' +
        '<section class="mc-band">' +
          '<div class="mc-shell" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-7) var(--space-5);align-items:start">' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Contact details</h2>' +
              '<dl style="margin:0;display:flex;flex-direction:column;gap:var(--space-4)">' +
                '<div><dt class="caption" style="color:var(--ink-muted)">Phone</dt><dd class="body" style="margin:0"><a href="tel:3102131574">310-213-1574</a></dd></div>' +
                '<div><dt class="caption" style="color:var(--ink-muted)">Email</dt><dd class="body" style="margin:0"><a href="mailto:madisoncastle2@gmail.com">madisoncastle2@gmail.com</a></dd></div>' +
                '<div><dt class="caption" style="color:var(--ink-muted)">Service area</dt><dd class="body" style="margin:0;color:var(--ink-muted)">The Greater Los Angeles Area, California</dd></div>' +
                '<div><dt class="caption" style="color:var(--ink-muted)">Follow</dt><dd class="body" style="margin:0;display:flex;gap:var(--space-4)">' +
                  '<a href="https://www.facebook.com/173060215881271" target="_blank" rel="noopener">Facebook</a>' +
                  '<a href="https://www.instagram.com/officialmadisoncastle/" target="_blank" rel="noopener">Instagram</a>' +
                '</dd></div>' +
              '</dl>' +
              '<h2 class="heading-md" style="margin:var(--space-7) 0 var(--space-5);color:var(--ink)">Hours</h2>' +
              '<table class="body" style="border-collapse:collapse;color:var(--ink-muted)"><tbody>' +
                '<tr><th scope="row" style="text-align:left;font-weight:400;padding:0 var(--space-5) var(--space-2) 0">Monday to Friday</th><td style="padding:0 0 var(--space-2)">7:00am – 6:00pm</td></tr>' +
                '<tr><th scope="row" style="text-align:left;font-weight:400;padding:0 var(--space-5) var(--space-2) 0">Saturday</th><td style="padding:0 0 var(--space-2)">7:00am – 4:00pm</td></tr>' +
                '<tr><th scope="row" style="text-align:left;font-weight:400;padding:0 var(--space-5) 0 0">Sunday</th><td style="padding:0">Closed</td></tr>' +
              '</tbody></table>' +
            '</div>' +
            '<div>' +
              '<h2 class="heading-md" style="margin:0 0 var(--space-5);color:var(--ink)">Send a message</h2>' +
              '<form id="contact-form" name="contact" style="display:flex;flex-direction:column;gap:var(--space-4);max-width:360px">' +
                '<input type="hidden" id="c-subject" name="subject" value="' + escapeHtml(subject) + '" />' +
                '<div class="mc-field"><label class="mc-field__label" for="c-name">Name*</label><input class="mc-field__control" id="c-name" name="firstname" type="text" required /></div>' +
                '<div class="mc-field"><label class="mc-field__label" for="c-phone">Phone*</label><input class="mc-field__control" id="c-phone" name="phone" type="tel" required /></div>' +
                '<div class="mc-field"><label class="mc-field__label" for="c-email">Email</label><input class="mc-field__control" id="c-email" name="email" type="email" /></div>' +
                '<div class="mc-field mc-field--select"><label class="mc-field__label" for="c-property">Property type</label>' +
                  '<select class="mc-field__control" id="c-property" name="property_type">' +
                    '<option value="">Select one</option><option value="residential">Residential</option><option value="commercial">Commercial</option>' +
                  '</select>' +
                '</div>' +
                '<div class="mc-field mc-field--select"><label class="mc-field__label" for="c-service">Service</label>' +
                  '<select class="mc-field__control" id="c-service" name="service">' + serviceSelectOptions(service) + '</select>' +
                '</div>' +
                '<div class="mc-field mc-field--multiline"><label class="mc-field__label" for="c-message">How can we help?</label><textarea class="mc-field__control" id="c-message" name="message"></textarea></div>' +
                '<button type="submit" class="mc-btn mc-btn--primary mc-btn--md">Send Message</button>' +
                '<p class="caption" style="margin:0;color:var(--ink-muted)">We use your details to answer your inquiry and nothing else.</p>' +
                '<div id="contact-form-note" role="status"></div>' +
              '</form>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>'
    );
  }

  /* ---------------------------------------------------------------- render */

  function main(route) {
    if (route.page === 'home') return pageHome();
    if (route.page === 'service') return pageService(route.svc);
    if (route.page === 'pest-detail') return pagePestDetail(route.pest);
    if (route.page === 'contact') return pageContact(route.service);
    return pageHome();
  }

  function render() {
    var route = parseRoute();
    var app = document.getElementById('app');
    app.innerHTML =
      promoBar() +
      utilBar() +
      header() +
      '<main>' + main(route) + '</main>' +
      footer();

    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = document.getElementById('contact-form-note');
        if (note) {
          note.className = 'mc-form-note';
          note.textContent = "Thanks — we'll be in touch.";
        }
        form.reset();
      });
    }
  }

  /* ---------------------------------------------------------------- events */

  function setSeg(seg) {
    state.seg = seg;
    render();
  }

  document.addEventListener('click', function (e) {
    var segLink = e.target.closest('[data-seg]');
    if (segLink) {
      state.seg = segLink.getAttribute('data-seg');
      /* Let the anchor's own hash navigation proceed first (it may or may not change
         the hash). Either way, re-render on the next tick so the new segment shows;
         a hashchange (if the route did change) will also re-render, which is harmless. */
      window.setTimeout(render, 0);
    }

    var actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      var action = actionEl.getAttribute('data-action');
      if (action === 'toggle-mega') {
        e.stopPropagation();
        state.mega = !state.mega;
        render();
      } else if (action === 'toggle-nav') {
        state.navOpen = !state.navOpen;
        render();
      } else if (action === 'pick-res') {
        setSeg('residential');
      } else if (action === 'pick-com') {
        setSeg('commercial');
      }
      return;
    }

    /* Click away from an open mega menu closes it. */
    if (state.mega && !e.target.closest('.mc-mega') && !e.target.closest('.mc-trigger')) {
      state.mega = false;
      render();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && (state.mega || state.navOpen)) {
      state.mega = false;
      state.navOpen = false;
      render();
    }
  });

  document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'c-service') {
      var subjectField = document.getElementById('c-subject');
      if (subjectField) subjectField.value = subjectForService(e.target.value);
    }
  });

  window.addEventListener('hashchange', function () {
    state.mega = false;
    state.navOpen = false;
    render();
    window.scrollTo(0, 0);
  });

  render();
})();
