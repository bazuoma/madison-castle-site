/* @ds-bundle: {"format":4,"namespace":"MadisonCastle","components":[{"name":"SiteHeader"},{"name":"PromoBar"},{"name":"HeroBand"},{"name":"SectionHeading"},{"name":"ServiceCard"},{"name":"ReviewCard"},{"name":"TextField"},{"name":"Button"},{"name":"SiteFooter"}]} */
(function (global) {
  'use strict';
 
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
 
  function uid(prefix) {
    uid.n = (uid.n || 0) + 1;
    return prefix + '-' + uid.n;
  }
 
  /* Button --------------------------------------------------------------- */
  function Button(props) {
    var p = props || {};
    var variant = p.variant || 'primary';
    var size = p.size || 'md';
    var node = el(p.href ? 'a' : 'button', 'mc-btn mc-btn--' + variant + ' mc-btn--' + size);
    node.textContent = p.label == null ? '' : p.label;
    if (p.href) {
      node.setAttribute('href', p.href);
    } else {
      node.setAttribute('type', p.type || 'button');
      if (p.onClick) node.addEventListener('click', p.onClick);
    }
    return node;
  }
 
  /* PromoBar ------------------------------------------------------------- */
  function PromoBar(props) {
    var p = props || {};
    var bar = el('div', 'mc-promo');
    bar.appendChild(el('p', 'mc-promo__text', p.message == null ? '' : p.message));
    return bar;
  }
 
  /* SiteHeader ----------------------------------------------------------- */
  function SiteHeader(props) {
    var p = props || {};
    var header = el('header', 'mc-header' + (p.elevated ? ' mc-header--elevated' : ''));
    var bar = el('div', 'mc-header__bar');
 
    var home = el('a', 'mc-header__logo');
    home.setAttribute('href', p.homeHref || '/');
    home.setAttribute('aria-label', p.siteName || 'Madison Castle');
    if (p.logoSrc) {
      var img = el('img', 'mc-header__logo-image');
      img.setAttribute('src', p.logoSrc);
      img.setAttribute('alt', p.siteName || 'Madison Castle');
      img.setAttribute('width', '112');
      img.setAttribute('height', '84');
      home.appendChild(img);
    } else {
      home.appendChild(el('span', 'mc-header__wordmark', p.siteName || 'Madison Castle'));
    }
    bar.appendChild(home);
 
    var links = p.links || [];
    var nav = el('nav', 'mc-header__nav');
    nav.setAttribute('aria-label', 'Primary');
    var list = el('ul', 'mc-header__list');
    for (var i = 0; i < links.length; i++) {
      var item = el('li', 'mc-header__item');
      var a = el('a', 'mc-header__link' + (links[i].current ? ' is-current' : ''), links[i].label);
      a.setAttribute('href', links[i].href || '#');
      if (links[i].current) a.setAttribute('aria-current', 'page');
      item.appendChild(a);
      list.appendChild(item);
    }
    nav.appendChild(list);
    bar.appendChild(nav);
 
    var end = el('div', 'mc-header__end');
    if (p.actionLabel) {
      end.appendChild(Button({ label: p.actionLabel, href: p.actionHref, variant: 'inverse', size: 'sm' }));
    }
    bar.appendChild(end);
 
    header.appendChild(bar);
    return header;
  }
 
  /* HeroBand ------------------------------------------------------------- */
  function HeroBand(props) {
    var p = props || {};
    var shape = p.shape === 'panel' ? 'panel' : 'disc';
    var band = el('section', 'mc-hero mc-hero--' + shape);
    if (p.image) {
      band.style.backgroundImage = 'url("' + p.image + '")';
      band.classList.add('mc-hero--photo');
    }
    if (p.imageAlt) band.setAttribute('aria-label', p.imageAlt);
 
    var scrim = el('div', 'mc-hero__scrim');
    var inner = el('div', 'mc-hero__inner');
    inner.appendChild(el('h1', 'mc-hero__title', p.title == null ? '' : p.title));
    if (p.subtitle) inner.appendChild(el('p', 'mc-hero__subtitle', p.subtitle));
    if (p.actionLabel) {
      inner.appendChild(Button({ label: p.actionLabel, href: p.actionHref, variant: 'primary', size: 'md' }));
    }
    scrim.appendChild(inner);
    band.appendChild(scrim);
    return band;
  }
 
  /* SectionHeading ------------------------------------------------------- */
  function SectionHeading(props) {
    var p = props || {};
    var tone = p.tone || 'sage-600';
    var wrap = el('header', 'mc-heading mc-heading--' + tone);
    wrap.appendChild(el(p.level === 1 ? 'h1' : 'h2', 'mc-heading__title', p.title == null ? '' : p.title));
    if (p.lead) wrap.appendChild(el('p', 'mc-heading__lead', p.lead));
    return wrap;
  }
 
  /* ServiceCard ---------------------------------------------------------- */
  function ServiceCard(props) {
    var p = props || {};
    var card = el('article', 'mc-service');
    if (p.image) {
      var img = el('img', 'mc-service__image');
      img.setAttribute('src', p.image);
      img.setAttribute('alt', p.imageAlt || '');
      card.appendChild(img);
    }
    var body = el('div', 'mc-service__body');
    body.appendChild(el('h3', 'mc-service__title', p.title == null ? '' : p.title));
    if (p.description) body.appendChild(el('p', 'mc-service__text', p.description));
    if (p.actionLabel) {
      body.appendChild(Button({ label: p.actionLabel, href: p.actionHref, variant: 'primary', size: 'md' }));
    }
    card.appendChild(body);
    return card;
  }
 
  /* ReviewCard ----------------------------------------------------------- */
  function ReviewCard(props) {
    var p = props || {};
    var card = el('figure', 'mc-review' + (p.tone === 'inverse' ? ' mc-review--inverse' : ''));
    var q = el('blockquote', 'mc-review__quote');
    q.appendChild(document.createTextNode('“' + (p.quote == null ? '' : p.quote) + '”'));
    card.appendChild(q);
    var meta = [p.author, p.date].filter(Boolean).join(' - ');
    if (meta) card.appendChild(el('figcaption', 'mc-review__meta', meta));
    return card;
  }
 
  /* TextField ------------------------------------------------------------ */
  function TextField(props) {
    var p = props || {};
    var id = p.id || uid('mc-field');
    var wrap = el('div', 'mc-field' + (p.multiline ? ' mc-field--multiline' : ''));
    var label = el('label', 'mc-field__label', (p.label == null ? '' : p.label) + (p.required ? '*' : ''));
    label.setAttribute('for', id);
    var input = el(p.multiline ? 'textarea' : 'input', 'mc-field__control');
    input.id = id;
    if (!p.multiline) input.setAttribute('type', p.type || 'text');
    if (p.placeholder) input.setAttribute('placeholder', p.placeholder);
    if (p.required) input.setAttribute('required', '');
    if (p.value != null) input.value = p.value;
    if (p.onInput) input.addEventListener('input', p.onInput);
    wrap.appendChild(label);
    wrap.appendChild(input);
    return wrap;
  }
 
  /* SiteFooter ----------------------------------------------------------- */
  function SiteFooter(props) {
    var p = props || {};
    var footer = el('footer', 'mc-footer');
    var inner = el('div', 'mc-footer__inner');
 
    var links = p.links || [];
    if (links.length) {
      var nav = el('nav', 'mc-footer__nav');
      nav.setAttribute('aria-label', 'Footer');
      var list = el('ul', 'mc-footer__list');
      for (var i = 0; i < links.length; i++) {
        var item = el('li', 'mc-footer__item');
        var a = el('a', 'mc-footer__link', links[i].label);
        a.setAttribute('href', links[i].href || '#');
        item.appendChild(a);
        list.appendChild(item);
      }
      nav.appendChild(list);
      inner.appendChild(nav);
    }
 
    if (p.contact) inner.appendChild(el('p', 'mc-footer__contact', p.contact));
    if (p.legal) inner.appendChild(el('p', 'mc-footer__legal', p.legal));
 
    footer.appendChild(inner);
    return footer;
  }
 
  global.MadisonCastle = {
    Button: Button,
    PromoBar: PromoBar,
    SiteHeader: SiteHeader,
    HeroBand: HeroBand,
    SectionHeading: SectionHeading,
    ServiceCard: ServiceCard,
    ReviewCard: ReviewCard,
    TextField: TextField,
    SiteFooter: SiteFooter
  };
})(window);
 