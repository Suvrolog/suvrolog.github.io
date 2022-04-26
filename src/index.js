let myForm = document.forms.myForm;
let nameInput = myForm.name;
let numInput = myForm.num;
let openModalButton = document.querySelectorAll('.eatbox__type-button');
let div = document.createElement('div');

nameInput.insertAdjacentHTML('afterend', '<div id = "error1" hidden = true>Пожалуйста, введите ваше имя.</div>');
numInput.insertAdjacentHTML('afterend', '<div id = "error2" hidden = true>Пожалуйста, введите ваш номер телефона</div>');


nameInput.addEventListener('blur', function () {
   if (!nameInput.value) {
      document.getElementById("error1").hidden = false;
   }
})


numInput.addEventListener('blur', function () {
   if (numInput.value <= 0) {
      document.getElementById("error2").hidden = false;
   }
})


//убираем ероры при фокусе
nameInput.addEventListener('focus', function (event) {
   document.getElementById("error1").hidden = true;
});

numInput.addEventListener('focus', function (event) {
   document.getElementById("error2").hidden = true;
});

numInput.addEventListener('keydown', function (event) {
   let digit = false;
   if (event.key >= 0 || 9 <= event.key || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace') {
      digit = true;
   } else {
      event.preventDefault();
   }
})



myForm.addEventListener('submit', function (event) {
   let counter = 2;

   if (!nameInput.value) {
      document.getElementById("error1").hidden = false;
      event.preventDefault();
      --counter;
   }
   
   if (!numInput.value) {
      document.getElementById("error2").hidden = false;
      event.preventDefault();
      --counter;
   }
   

   if (counter === 2) {
      myForm.insertAdjacentHTML('afterend', `<div>Спасибо ${nameInput.value}, Ваш заказ оформлен! </div>`);

      let result = {
         name: nameInput.value,
         num: numInput.value,
      }

      console.log(JSON.stringify(result));

      nameInput.value = '';
      numInput.value = '';
      return JSON.stringify(result);
      event.preventDefault();
      //т.к. у меня нет сервера, куда я могу отправить запрос - застопил чтобы не улетал в никуда
   }
});


//добавляем в модальное окно название товара
openModalButton.forEach((button) => {
   button.addEventListener('click', (btn) => {
      const titleName = btn.target.closest('.eatbox__part').querySelector('.eatbox__name').textContent;
      document.querySelector('#exampleModalLabel').textContent = titleName;
   });
});
