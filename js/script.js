var ESC_CODE = 27;
var MONTH = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
  'октября', 'ноября', 'декабря'];
var showPopupBtn = document.querySelector('.hotel-search__button');
var popup = document.querySelector('.form-modal');
/*var close = document.querySelector('.form-close');*/
var input = popup.querySelectorAll('.form-modal__input');
var checkIn = popup.querySelector('#check-in');
var checkOut = popup.querySelector('[name=check-out]');
var adult = popup.querySelector('[name=adult]');
var button = popup.querySelectorAll('.form-modal__button');

showPopupBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('form-modal--show');
  for (var i = 0; i < button.length; i++) {
    if (!button[i].classList.contains('form-modal__button--calendar')) {
      button[i].addEventListener('click', function(evt) {
        if (this.classList.contains('form-modal__button--minus')) {
          var value = this.nextElementSibling.value;
          var inputElement = this.nextElementSibling;
          inputElement.value = (value !== '0') ? +value - 1 : value;
        } else if (this.classList.contains('form-modal__button--plus')) {
          var value = this.previousElementSibling.value;
          var inputElement = this.previousElementSibling;
          inputElement.value = (value < 10) ? +value + 1 : value;
        }
      });
    }
  }
});

popup.addEventListener('submit', function (evt) {
  if (!checkIn.value || !checkOut.value || !adult.value) {
    evt.preventDefault();
    for (var i = 0; i < input.length - 1; i++) {
      if (!input[i].value) {
        input[i].classList.remove('form-modal__input--error');
        input[i].offsetWidth = popup.offsetWidth;
        input[i].classList.add('form-modal__input--error');
      }
    }
  }
});


function setInputDate(mod) {
  var date = new Date();
  var day = date.getDate();
  var formatDate = (!mod ? day : day + 1) + ' ' + MONTH[date.getMonth()] + ' ' + date.getFullYear();
  return formatDate;
}

window.onload = function () {
  console.log(checkIn.placeholder);
  checkIn.placeholder = setInputDate(false);
  checkIn.value = setInputDate(false);
  checkOut.placeholder = setInputDate(true);
  checkOut.value = setInputDate(true);
  adult.value = 2;
};

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    if (popup.classList.contains('form-modal--show')) {
      popup.classList.remove('form-modal--show');
    }
  }
});
