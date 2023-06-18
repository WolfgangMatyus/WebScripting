// Get the draggable elements
const cards = document.querySelectorAll('.draggable');

// Add event listeners for dragstart and dragend
cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

// Add event listeners for dragover and drop
const list = document.getElementById('list');
list.addEventListener('dragover', dragOver);
list.addEventListener('drop', drop);

// Drag start event handler
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.target.classList.add('dragging');
}

// Drag end event handler
function dragEnd(event) {
  event.target.classList.remove('dragging');
}

// Drag over event handler
function dragOver(event) {
  event.preventDefault();
}

// Drop event handler
function drop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  list.appendChild(card);
}