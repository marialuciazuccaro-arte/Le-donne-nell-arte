
function filterArtists(){
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const century = document.getElementById('centurySelect')?.value || '';
  document.querySelectorAll('[data-artist-card]').forEach(card => {
    const txt = (card.dataset.name + ' ' + card.dataset.text + ' ' + card.dataset.century).toLowerCase();
    const show = (!q || txt.includes(q)) && (!century || card.dataset.century === century);
    card.style.display = show ? '' : 'none';
  });
}
