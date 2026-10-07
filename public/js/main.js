const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Team cards use native dialogs for focus trapping and keyboard support.
const rosterDialogs = [...document.querySelectorAll('.roster-dialog')];
let returnFocus;
function openRoster(id, trigger) {
 const dialog = rosterDialogs.find(item => item.id === id);
 if (!dialog || dialog.open) return;
 rosterDialogs.forEach(item => { if (item.open) item.close(); });
 returnFocus = trigger || document.activeElement;
 dialog.showModal();
 document.body.classList.add('roster-modal-open');
 dialog.querySelector('.dialog-close').focus();
}
document.querySelectorAll('[data-roster]').forEach(card => {
 card.addEventListener('click', event => { event.preventDefault(); openRoster(card.dataset.roster, card); });
});
rosterDialogs.forEach(dialog => {
 dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
 });
 dialog.addEventListener('close', () => {
  document.body.classList.remove('roster-modal-open');
  if (returnFocus && returnFocus.isConnected) returnFocus.focus();
 });
});
if (rosterDialogs.length) {
 const showLinkedRoster = () => openRoster(location.hash.slice(1));
 showLinkedRoster();
 window.addEventListener('hashchange', showLinkedRoster);
}
