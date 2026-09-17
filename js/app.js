/* =============================================================
   MAROA VOYAGES — comportements
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     0. Emplacements photo
     Tant qu'une image n'est pas déposée dans /assets, on masque
     le visuel cassé pour laisser apparaître le libellé.
     ----------------------------------------------------------- */
  function watchImages() {
    var imgs = document.querySelectorAll('.media img');
    Array.prototype.forEach.call(imgs, hideIfBroken);
  }

  function hideIfBroken(img) {
    if (img.dataset.watched) return;
    img.dataset.watched = '1';
    img.addEventListener('error', function () { img.style.display = 'none'; });
    if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
  }

  /* -----------------------------------------------------------
     1. Navigation mobile (< 880px)
     ----------------------------------------------------------- */
  function initNav() {
    var burger = document.querySelector('[data-burger]');
    var nav = document.querySelector('[data-nav]');
    if (!burger || !nav) return;

    var mq = window.matchMedia('(max-width: 880px)');

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '✕' : '≡';
      document.body.classList.toggle('is-locked', open);
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      }
    }

    burger.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        burger.focus();
      }
    });

    // Le menu se referme quand on repasse au-dessus du point de rupture.
    var onChange = function () { setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
  }

  /* -----------------------------------------------------------
     2. Hero carrousel
     Les 5 couches sont montées en permanence ; une seule est active.
     ----------------------------------------------------------- */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var layers = Array.prototype.slice.call(hero.querySelectorAll('[data-slide]'));
    if (!layers.length) return;

    var copy = hero.querySelector('[data-hero-copy]');
    var region = hero.querySelector('[data-hero-region]');
    var l1 = hero.querySelector('[data-hero-l1]');
    var l2 = hero.querySelector('[data-hero-l2]');
    var l3 = hero.querySelector('[data-hero-l3]');
    var text = hero.querySelector('[data-hero-text]');
    var counter = hero.querySelector('[data-hero-counter]');
    var thumbs = hero.querySelector('[data-hero-thumbs]');
    var live = hero.querySelector('[data-hero-live]');

    var autoplay = hero.dataset.autoplay === 'true';
    var delay = parseInt(hero.dataset.delay, 10) || 7000;
    var timer = null;
    var i = 0;

    var slides = layers.map(function (layer) {
      var img = layer.querySelector('img');
      return {
        name: layer.dataset.name,
        region: layer.dataset.region,
        l1: layer.dataset.l1,
        l2: layer.dataset.l2,
        l3: layer.dataset.l3,
        text: layer.dataset.text,
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : ''
      };
    });

    var pad = function (n) { return String(n).length < 2 ? '0' + n : String(n); };

    function renderThumbs() {
      thumbs.innerHTML = '';
      for (var k = 1; k <= 4; k++) {
        var n = (i + k) % slides.length;
        thumbs.appendChild(buildThumb(slides[n], n));
      }
      watchImages();
    }

    function buildThumb(slide, n) {
      var li = document.createElement('li');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero__thumb';
      btn.setAttribute('aria-label', 'Voir ' + slide.name);
      btn.addEventListener('click', function () { go(n); });

      var media = document.createElement('span');
      media.className = 'media';

      var ph = document.createElement('span');
      ph.className = 'media__ph';
      ph.textContent = slide.name;
      media.appendChild(ph);

      if (slide.src) {
        var img = document.createElement('img');
        img.src = slide.src;
        img.alt = '';
        img.loading = 'lazy';
        media.appendChild(img);
      }

      var label = document.createElement('span');
      label.className = 'hero__thumb-label';
      label.setAttribute('aria-hidden', 'true');
      label.textContent = slide.name;

      btn.appendChild(media);
      btn.appendChild(label);
      li.appendChild(btn);
      return li;
    }

    function replayCopy() {
      if (reduceMotion || !copy) return;
      copy.style.animation = 'none';
      // Lecture forcée : redémarre l'animation « fondu montant ».
      void copy.offsetWidth;
      copy.style.animation = '';
    }

    function go(n, silent) {
      i = ((n % slides.length) + slides.length) % slides.length;
      var slide = slides[i];

      layers.forEach(function (layer, k) {
        layer.classList.toggle('is-active', k === i);
      });

      if (region) region.textContent = slide.region;
      if (l1) l1.textContent = slide.l1;
      if (l2) l2.textContent = slide.l2;
      if (l3) l3.textContent = slide.l3;
      if (text) text.textContent = slide.text;
      if (counter) counter.textContent = pad(i + 1) + ' / ' + pad(slides.length);
      if (live) live.textContent = slide.name + ' — ' + slide.region;

      renderThumbs();
      if (!silent) replayCopy();
      restart();
    }

    function restart() {
      if (!autoplay || reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(function () { go(i + 1, true); }, delay);
    }

    var prev = hero.querySelector('[data-hero-prev]');
    var next = hero.querySelector('[data-hero-next]');
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });

    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(i - 1); }
      if (e.key === 'ArrowRight') { go(i + 1); }
    });

    go(0, true);
  }

  /* -----------------------------------------------------------
     3. Filtres de la page Destinations
     ----------------------------------------------------------- */
  function initFilters() {
    var bar = document.querySelector('[data-filters]');
    if (!bar) return;

    var buttons = Array.prototype.slice.call(bar.querySelectorAll('[data-zone]'));
    var count = document.querySelector('[data-count]');
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-place]'));

    function apply(zone) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = zone === 'Toutes' || card.dataset.zone === zone;
        card.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset.zone === zone ? 'true' : 'false');
      });
      if (count) count.textContent = shown + (shown > 1 ? ' lieux' : ' lieu');
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.zone); });
    });

    apply('Toutes');
  }

  /* -----------------------------------------------------------
     4. Pilules à choix unique (sujet du formulaire)
     ----------------------------------------------------------- */
  function initTopics() {
    var group = document.querySelector('[data-topics]');
    if (!group) return;

    var buttons = Array.prototype.slice.call(group.querySelectorAll('.pill'));
    var hidden = document.querySelector('[data-topic-value]');

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        if (hidden) hidden.value = b.textContent.trim();
      });
    });
  }

  /* -----------------------------------------------------------
     5. Accordéon FAQ — une seule ouverte, refermable
     ----------------------------------------------------------- */
  function initFaq() {
    var faq = document.querySelector('[data-faq]');
    if (!faq) return;

    var items = Array.prototype.slice.call(faq.querySelectorAll('.faq__item'));

    items.forEach(function (item) {
      var btn = item.querySelector('.faq__q');
      var sign = item.querySelector('.faq__sign');

      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');

        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__sign').textContent = '+';
        });

        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          sign.textContent = '−';
        }
      });
    });
  }

  /* -----------------------------------------------------------
     6. Envoi du formulaire (maquette : pas d'endpoint)
     ----------------------------------------------------------- */
  function initForms() {
    var forms = Array.prototype.slice.call(document.querySelectorAll('[data-form]'));

    forms.forEach(function (form) {
      var submit = form.querySelector('[type="submit"]');
      var note = form.querySelector('[data-form-note]');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        if (submit) {
          submit.textContent = 'Message envoyé ✓';
          submit.classList.add('is-sent');
        }
        if (note) note.textContent = 'Merci — Hanta vous répond sous 48 h ouvrées.';
      });
    });
  }

  /* ----------------------------------------------------------- */
  function boot() {
    watchImages();
    initNav();
    initHero();
    initFilters();
    initTopics();
    initFaq();
    initForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
