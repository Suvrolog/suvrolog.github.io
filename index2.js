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




///////////////////////////////////////////

nameInput.insertAdjacentHTML('afterend', '<div id = "error1" hidden = true>Пожалуйста, введите название карточки.</div>');
textInput.insertAdjacentHTML('afterend', '<div id = "error4" hidden = true>Сообщение должно содержать не менее 5 символов</div>');

nameInput.addEventListener('blur', function () {
   if (!nameInput.value) {
      document.getElementById("error1").hidden = false;
   }
})

textInput.addEventListener('blur', function () {
   if (textInput.value.length < 5) {
      document.getElementById("error4").hidden = false;
   }
})

//убираем ероры при фокусе
nameInput.addEventListener('focus', function (event) {
   document.getElementById("error1").hidden = true;
});

textInput.addEventListener('focus', function (event) {
   document.getElementById("error4").hidden = true;
});





let submit = document.querySelector('.submit');
submit.addEventListener('click', function (event) {
   let columnClick = modal.getAttribute('data-column-click');
   let list = document.querySelector(`.col_${columnClick}`);
   let classCart = 'card_' + counterCart;


   /////////////////////////////////////////////////
   if (!nameInput.value) {
      document.getElementById("error1").hidden = false;
      event.preventDefault();
      --counter;
      return;
   }

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

      document.getElementById("error1").hidden = true;
      document.getElementById("error4").hidden = true;

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

   document.getElementById("error1").hidden = true;
   document.getElementById("error4").hidden = true;

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


