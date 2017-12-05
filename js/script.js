var ESC_CODE = 27;
var showPopupBtn = document.querySelector('.hotel-search__button');
var popup = document.querySelector('.form-modal');
/*var close = document.querySelector('.form-close');*/
var checkIn = popup.querySelector('[name=check-in]');
var checkOut = popup.querySelector('[name=check-out]');
var adult = popup.querySelector('[name=adult]');
/*var storageName = localStorage.getItem("userName");
var storageEmail = localStorage.getItem("userEmail");*/

/*function checkField(check, source, target) {
  if (check) {
    source.value = check;
    target.focus();
    return true;
  } else {
    source.focus();
    return false;
  }
}*/

showPopupBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('form-modal--show');
  /*if (checkField(storageName, nameField, emailField)) {
    checkField(storageEmail, emailField, letterField);
  }*/
});

popup.addEventListener('submit', function (evt) {
  if (!checkIn.value || !checkOut.value || !adult.value){
    evt.preventDefault();
    popup.classList.remove('form-modal--error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('form-modal--error');
  } else {
    /*localStorage.setItem('userName', nameField.value);
    localStorage.setItem('userEmail', nameField.value);*/
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    if (popup.classList.contains('modal-show')) {
      popup.classList.remove('modal-show');
      popup.classList.remove('modal-error');
    }
  }
});
