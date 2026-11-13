const header = document.querySelector('.site-header');
const menu = document.querySelector('.mobile-menu');
const menuButton = document.querySelector('.menu-button');
const menuClose = document.querySelector('.menu-close');
const soundButton = document.querySelector('.sound-button');
const modal = document.querySelector('.register-modal');

function setMenu(open) {
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  document.body.classList.toggle('menu-open', open);
  menu.inert = !open;
  document.querySelector('main')?.toggleAttribute('inert', open);
  document.querySelector('footer')?.toggleAttribute('inert', open);
  if (open) menuClose.focus();
  else menuButton.focus();
}

if (menuButton && menu && menuClose) {
  menu.inert = true;
  menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menuClose.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('open')) setMenu(false);
  if (event.key === 'Tab' && menu?.classList.contains('open')) {
    const items = [...menu.querySelectorAll('button, a[href]')];
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches && menu?.classList.contains('open')) setMenu(false);
});

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

soundButton?.addEventListener('click', () => {
  const next = soundButton.getAttribute('aria-pressed') !== 'true';
  soundButton.setAttribute('aria-pressed', String(next));
  soundButton.setAttribute('aria-label', next ? '배경 사운드 끄기' : '배경 사운드 켜기');
  soundButton.textContent = next ? '♫' : '♪';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const factions = {
  goraebap: {
    index: 'ORION SNACKVERSE', title: '고래밥<br />별바다 탐험대',
    description: '과자 모양의 해양 친구들과 별바다를 누비는 탐험 진영. 미지의 맛 행성을 발견하고 특별한 재료를 수집합니다.',
    trait: '탐험 · 수집', emblem: '≈', color: '#e21b2d'
  },
  chocosongi: {
    index: 'ORION SNACKVERSE', title: '초코송이<br />머쉬룸 행성단',
    description: '서비스 미제공',
    trait: '성장 · 건설', emblem: '♠', color: '#b81120'
  },
  chocopie: {
    index: 'ORION SNACKVERSE', title: '초코파이<br />정(情)의 행성',
    description: '서비스 미제공',
    trait: '방어 · 회복', emblem: '●', color: '#d7192d'
  },
  beitle: {
    index: 'ORION SNACKVERSE', title: '비틀즈<br />컬러 코멧',
    description: '서비스 미제공',
    trait: '속도 · 연쇄', emblem: '✦', color: '#ef5b67'
  },
  pocachip: {
    index: 'ORION SNACKVERSE', title: '포카칩<br />크리스피 링',
    description: '서비스 미제공',
    trait: '공격 · 확장', emblem: '◇', color: '#a90f1e'
  }
};

const panel = document.querySelector('.faction-panel');
const factionIndex = panel?.querySelector('.faction-index');
const factionTitle = panel?.querySelector('h3');
const factionDescription = panel?.querySelector('.faction-description');
const factionTrait = panel?.querySelector('.faction-trait b');
const factionEmblem = panel?.querySelector('.faction-emblem span');

document.querySelectorAll('.faction-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.faction;
    const data = factions[key];
    document.querySelectorAll('.faction-tabs button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    panel.classList.remove('changed');
    void panel.offsetWidth;
    panel.classList.add('changed');
    panel.dataset.activeFaction = key;
    factionIndex.textContent = data.index;
    factionTitle.innerHTML = data.title;
    factionDescription.textContent = data.description;
    factionTrait.textContent = data.trait;
    factionEmblem.textContent = data.emblem;
    factionEmblem.style.color = data.color;
    const detailLink = panel.querySelector('.faction-detail-link');
    if (detailLink) detailLink.hidden = key !== 'goraebap';
  });
});

if (modal) {
  document.querySelectorAll('.js-modal-open').forEach((button) => {
    button.addEventListener('click', () => modal.showModal());
  });
  modal.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
  modal.querySelector('form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.querySelector('.success-message').classList.add('show');
    event.currentTarget.reset();
  });
}

document.querySelectorAll('.filter-buttons button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-buttons button').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.archive-card').forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});
