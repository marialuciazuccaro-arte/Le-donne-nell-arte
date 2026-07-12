const state = { data: null };

async function init(){
  const response = await fetch('data/artists.json');
  state.data = await response.json();

  const p = state.data.project;
  document.querySelector('#title').textContent = p.title;
  document.querySelector('#subtitle').textContent = p.subtitle;
  document.querySelector('#school').textContent = p.school;
  document.querySelector('#dedication').textContent = p.dedication;
  document.querySelector('#intro').textContent = p.intro;

  renderPeriods();
  fillFilter();
  renderArtists();

  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  document.querySelector('#period-filter').addEventListener('change', renderArtists);
  document.querySelector('.dialog-close').addEventListener('click', () => document.querySelector('#artist-dialog').close());
}

function renderPeriods(){
  const grid = document.querySelector('#period-grid');
  grid.innerHTML = state.data.periods.map(period => {
    const total = state.data.artists.filter(a => a.period === period).length;
    return `<article class="period-card"><p class="eyebrow">${total ? `${total} artiste` : 'in preparazione'}</p><h3>${period}</h3></article>`;
  }).join('');
}

function fillFilter(){
  const select = document.querySelector('#period-filter');
  state.data.periods.forEach(period => {
    const option = document.createElement('option');
    option.value = period;
    option.textContent = period;
    select.append(option);
  });
}

function renderArtists(){
  const filter = document.querySelector('#period-filter').value;
  const artists = state.data.artists.filter(a => !filter || a.period === filter);
  document.querySelector('#artist-grid').innerHTML = artists.map((a, index) => `
    <article class="artist-card">
      <p class="eyebrow">${a.period}</p>
      <h3>${a.name}</h3>
      <p>${a.dates}</p>
      <button type="button" data-index="${state.data.artists.indexOf(a)}">Apri la scheda</button>
    </article>`).join('');

  document.querySelectorAll('.artist-card button').forEach(button => {
    button.addEventListener('click', () => openArtist(Number(button.dataset.index)));
  });
}

function openArtist(index){
  const a = state.data.artists[index];
  const video = a.video_url
    ? `<a class="video-button" href="${a.video_url}" target="_blank" rel="noopener">Guarda la videopresentazione</a>`
    : `<p class="video-missing">Videopresentazione non ancora collegata. Inserisci il link Canva nel file <strong>data/artists.json</strong>.</p>`;

  document.querySelector('#dialog-content').innerHTML = `
    <p class="eyebrow">${a.period}</p>
    <h2>${a.name}</h2>
    <p><strong>${a.dates}</strong></p>
    <p>Questa scheda è predisposta per accogliere il testo e le immagini del lavoro degli studenti.</p>
    ${video}`;
  document.querySelector('#artist-dialog').showModal();
}

init().catch(error => {
  console.error(error);
  document.querySelector('main').innerHTML = '<section class="section"><h1>Errore di caricamento</h1><p>Verifica che il sito sia pubblicato tramite GitHub Pages.</p></section>';
});