var ESC_CODE = 27;
var MONTH = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
  'октября', 'ноября', 'декабря'];
var showPopupBtn = document.querySelector('.hotel-search__button');
var popup = document.querySelector('.form-modal');
var mapLink = document.querySelector('.hotel-search__map-link');
var mapContainer = document.querySelector('.hotel-search__interactive');
var googleMap = mapContainer.querySelector('.hotel-search__map');
var closeBtn = mapContainer.querySelector('.hotel-search__close-map');
var overlay = document.querySelector('.page__container');
/*var close = document.querySelector('.form-close');*/
var input = popup.querySelectorAll('.form-modal__input');
var checkIn = popup.querySelector('#check-in');
var checkOut = popup.querySelector('[name=check-out]');
var adult = popup.querySelector('[name=adult]');
//var kids = popup.querySelector('[name=kids]');
var button = popup.querySelectorAll('.form-modal__button');

showPopupBtn.addEventListener('click', function (evt) {
  if (popup.classList.contains('form-modal--hide')) {
    popup.classList.remove('form-modal--hide');
    popup.classList.add('form-modal--show');
  } else if (popup.classList.contains('form-modal--show')) {
    popup.classList.remove('form-modal--show');
    popup.classList.add('form-modal--hide');
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
  return (!mod ? day : day + 1) + ' ' + MONTH[date.getMonth()] + ' ' + date.getFullYear();
}

window.onload = function () {
  popup.classList.add('form-modal--hide');
  checkIn.placeholder = setInputDate(false);
  //checkIn.value = setInputDate(false);
  checkOut.placeholder = setInputDate(true);
  /*checkOut.value = setInputDate(true);
  adult.value = 2;
  kids.value = 0;*/
  var value;
  var inputElement;
  for (var i = 0; i < button.length; i++) {
    if (!button[i].classList.contains('form-modal__button--calendar')) {
      button[i].addEventListener('click', function() {
        if (this.classList.contains('form-modal__button--minus')) {
          value = this.nextElementSibling.value;
          inputElement = this.nextElementSibling;
          inputElement.value = ((value !== '0') && (value !== '')) ? +value - 1 : value;
        } else if (this.classList.contains('form-modal__button--plus')) {
          value = this.previousElementSibling.value;
          inputElement = this.previousElementSibling;
          inputElement.value = ((value < 10) || (value !== '')) ? +value + 1 : value;
        }
      });
    }
  }
};

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    if (popup.classList.contains('form-modal--show')) {
      popup.classList.remove('form-modal--show');
      popup.classList.add('form-modal--hide')
    }
  }
});

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!mapContainer.classList.contains('hotel-search__interactive--show')) {
    mapContainer.classList.add('hotel-search__interactive--show');
    overlay.classList.add('page__container--overlay');
    initMap();
  }
});

closeBtn.addEventListener('click', function(){
  mapContainer.classList.remove('hotel-search__interactive--show');
  overlay.classList.remove('page__container--overlay');
});

function initMap() {
  var myLatLng = {lat: 34.870750, lng: -111.762161};
  var map = new google.maps.Map(googleMap, {
    zoom: 10,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Welcome in Sedona!'
  });
}
