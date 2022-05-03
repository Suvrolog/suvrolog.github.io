let container = document.querySelector('#container');
let modal = document.getElementById('myModal');
let saveButton = document.querySelector('.save');
const createColumnButton = document.createElement('button');
createColumnButton.textContent = '+';
container.appendChild(createColumnButton);
createColumnButton.addEventListener('click', createCol);

let counterCol = 0;
let counterCart = 0;

function createCol() {
   counterCol++;

   let column = document.createElement('div');
   column.classList.add('column');
   column.addEventListener('dragover', (event) => {
      event.preventDefault();
   });
   column.addEventListener('drop', (event) => {
      const id = event
         .dataTransfer
         .getData('text');
         console.log(id);
      const draggableElement = document.querySelector(`[data-card="${id}"]`); // элемент который перетаскиваем
      const dropzone = event.target;
      dropzone.appendChild(draggableElement);
      event
         .dataTransfer
         .clearData();
   });
   container.appendChild(column);

   let classList = 'col_' + counterCol;
   let list = document.createElement('div');
   list.classList.add('col', classList);
   list.setAttribute('data-list-id', counterCol);
   column.appendChild(list);

   let title = document.createElement('input');
   title.placeholder = "Введите название"
   title.onblur = function () {
      title.style.border = "none";
   };
   list.before(title);
   list.addEventListener('click', function () {
      modal.style.display = "block";
      submit.classList.remove('hide');
      saveButton.classList.add('hide');

      let span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
         modal.style.display = "none";
      }

      modal.setAttribute('data-column-click', list.getAttribute('data-list-id'));
   });

}


// форма из модального окна
let myForm = document.forms[0];
let nameInput = myForm.name;
let textInput = myForm.message;
let colorInput = myForm.selectColor;


let submit = document.querySelector('.submit');
submit.addEventListener('click', function () {
   let columnClick = modal.getAttribute('data-column-click');
   let list = document.querySelector(`.col_${columnClick}`);
   let classCart = 'card_' + counterCart;

   let card = document.createElement('div');
   card.classList.add('card', classCart);
   card.setAttribute('data-card', counterCart);
   card.setAttribute('draggable', true);
   card.addEventListener('dragstart', (event) => {
      event
         .dataTransfer
         .setData('text/plain', event.target.getAttribute('data-card'));
   });
   card.addEventListener('click', (event) => {
      event.stopPropagation();
      submit.classList.add('hide');
      saveButton.classList.remove('hide');
      modal.style.display = 'block';

      let target = event.target.closest('.card');
      let titleCard = target.querySelector('h3').textContent;
      let descriptionCard = target.querySelector('p').textContent;
      let colorCard = target.style.background;
      let cardNumber = target.getAttribute('data-card');

      myForm.name.value = titleCard;
      myForm.message.value = descriptionCard;
      myForm.selectColor.value = colorCard.replaceAll(',', '');
      modal.setAttribute('data-card', cardNumber);
   });
   list.appendChild(card);

   let h3 = document.createElement('h3');
   h3.classList.add('h3' + classCart);
   card.appendChild(h3);

   let p = document.createElement('p');
   p.classList.add('p' + classCart);
   card.appendChild(p);
   
   fillCard(h3, p, card);

   counterCart++;
});

saveButton.addEventListener('click', () => {
   const cardNumber = modal.getAttribute('data-card');
   let card = document.querySelector(`.card_${cardNumber}`);
   let title = card.querySelector('h3');
   let description = card.querySelector('p');

   fillCard(title, description, card)
});

function fillCard(titleElement, descriptionElement, cardElement) {
   titleElement.textContent = nameInput.value;
   descriptionElement.textContent = textInput.value;
   cardElement.style.background = colorInput.value;
   modal.style.display = "none";
   nameInput.value = '';
   textInput.value = '';
}

//запустить только после сабмита

/* let editP = document.querySelector(`.p${counterCart}`);
let editH3 = document.querySelector(`.h3${counterCart}`);

let editCart = document.querySelector(`.cart_${counterCart}`);

console.log(editCart)
editCart.addEventListener('click', function () {
   saveButton.style.display = "block";
   submit.style.display = "none";
   modal.style.display = "block";


   console.log(editP)
   textInput.value = editP.textContent;
   nameInput.value = editH3.textContent;
   colorInput.value = card.style.backgroundColor;

   modal.setAttribute('data-column-click', list.getAttribute('data-list-id'));

});


saveButton.addEventListener('click', function () {
   editP.textContent = textInput.value;
   editH3.textContent = nameInput.value;
   card.style.backgroundColor = colorInput.value;
   modal.style.display = "none";
   nameInput.value = '';
   textInput.value = '';
});
*/
