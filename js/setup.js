'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLCOLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

var combineFullNames = function (names, surnames, number) {
  var qty = number || 4;
  var combinations = [];

  for (var i = 0; i < qty; i++) {
    var nameIndex = Math.floor(Math.random() * names.length);
    var surnameIndex = Math.floor(Math.random() * surnames.length);
    combinations[i] = names[nameIndex] + ' ' + surnames[surnameIndex];
  }
  return combinations;
};

var generateWizards = function (fullNames, coatColors, eyesColors) {
  var coatIndx;
  var eyesIndx;
  var wizards = [];
  for (var i = 0; i < fullNames.length; i++) {
    coatIndx = Math.floor(Math.random() * coatColors.length);
    eyesIndx = Math.floor(Math.random() * eyesColors.length);
    wizards[i] = {
      name: fullNames[i],
      coatColor: coatColors[coatIndx],
      eyesColor: eyesColors[eyesIndx]
    };
  }
  return wizards;
};

var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillDocumentFragment = function (wizards) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }
  return fragment;
};

var displaySimilarWizards = function (setupBlock) {
  var similarListElement = setupBlock.querySelector('.setup-similar-list');

  if (similarListElement.childElementCount === 0) {
    var fragment = fillDocumentFragment(wizards);
    similarListElement.appendChild(fragment);
    setupBlock.querySelector('.setup-similar').classList.remove('hidden');
  }
};

// Interactions
var openSetup = function () {
  setupPopup.classList.remove('hidden');

  document.addEventListener('keydown', onSetupPopupEsc);
  setupCloseButton.addEventListener('click', onSetupPopupClose);
  setupCloseButton.addEventListener('keydown', onSetupPopupXEnter);
  setupCoatColor.addEventListener('click', onCoatClick);
  setupEyesColor.addEventListener('click', onEyesClick);
  setupFireballColor.addEventListener('click', onFireballClick);

  displaySimilarWizards(setupPopup);
};

var closeSetup = function () {
  setupPopup.classList.add('hidden');

  document.removeEventListener('keydown', onSetupPopupEsc);
  setupCloseButton.removeEventListener('click', onSetupPopupClose);
  setupCloseButton.removeEventListener('keydown', onSetupPopupXEnter);
  setupCoatColor.removeEventListener('click', onCoatClick);
  setupEyesColor.removeEventListener('click', onEyesClick);
  setupFireballColor.removeEventListener('click', onFireballClick);
};

var changeCoatColor = function () {
  setupCoatColor.style.fill = COATCOLORS[Math.floor(Math.random() * COATCOLORS.length)];
};

var changeEyesColor = function () {
  setupEyesColor.style.fill = EYESCOLORS[Math.floor(Math.random() * EYESCOLORS.length)];
};

var changeFireballColor = function () {
  fireballColorIndex = (fireballColorIndex + 1) % FIREBALLCOLORS.length;
  var newColor = FIREBALLCOLORS[fireballColorIndex];
  setupFireballColor.style.backgroundColor = newColor;
  setupFireballColor.querySelector('input').value = newColor;
};

// EventHandlers
var onSetupOpenClick = function () {
  openSetup();
};

var onSetupOpenKeydown = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
};

var onSetupPopupClose = function () {
  closeSetup();
};

var onSetupPopupEsc = function (event) {
  if (event.keyCode === ESCAPE_KEYCODE && event.target.name !== 'username') {
    closeSetup();
  }
};

var onSetupPopupXEnter = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
};

var onCoatClick = function () {
  changeCoatColor();
};

var onEyesClick = function () {
  changeEyesColor();
};

var onFireballClick = function () {
  changeFireballColor();
};

var fireballColorIndex = 0;

var setupPopup = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupPopup.querySelector('.setup-close');
var setupCoatColor = setupPopup.querySelector('.setup-wizard .wizard-coat');
var setupEyesColor = setupPopup.querySelector('.setup-wizard .wizard-eyes');
var setupFireballColor = setupPopup.querySelector('.setup-fireball-wrap');

setupOpenButton.addEventListener('click', onSetupOpenClick);
setupOpenButton.addEventListener('keydown', onSetupOpenKeydown);

var fullNames = combineFullNames(NAMES, SURNAMES, 4);
var wizards = generateWizards(fullNames, COATCOLORS, EYESCOLORS);


