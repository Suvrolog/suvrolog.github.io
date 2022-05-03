let container = document.querySelector('#container');
let modal = document.getElementById('myModal');
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
   container.appendChild(column);

   let classList = 'col_' + counterCol;
   let list = document.createElement('div');
   list.classList.add('col', classList);
   list.setAttribute('data-list-id', counterCol);
   column.appendChild(list);

   let title = document.createElement('input');
   title.placeholder="Введите название"
   title.onblur = function() {
      title.style.border = "none";
    };
   
   list.before(title);
   list.addEventListener('click', function () {
      modal.style.display = "block";
      
      let span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
         modal.style.display = "none";
      }

      modal.setAttribute('data-column-click', list.getAttribute('data-list-id'));
    
   });
  
}

let submit = document.querySelector('.submit');
submit.addEventListener('click', function () {
   let columnClick = modal.getAttribute('data-column-click');
   let list = document.querySelector(`.col_${columnClick}`);
   let classCart = 'cart_' + counterCart;

   let card = document.createElement('div');
   card.classList.add(classCart);





   list.appendChild(card);

   let h3 = document.createElement('h3');
   h3.classList.add('h3' + classCart);
   card.appendChild(h3);
   
   let p = document.createElement('p');
   p.classList.add('p' + classCart);
   card.appendChild(p);

   // форма из модального окна
   let myForm = document.forms[0];
   let nameInput = myForm.name;
   let textInput = myForm.message;
   let colorInput = myForm.selectColor;

   p.textContent = textInput.value;
   h3.textContent = nameInput.value;
   card.style.backgroundColor = colorInput.value;
   modal.style.display = "none";
   nameInput.value = '';
   textInput.value = '';

   counterCart++;
});



