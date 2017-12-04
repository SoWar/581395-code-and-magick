'use strict';

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

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillDocumentFragment = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var fullNames = combineFullNames(NAMES, SURNAMES, 4);
var wizards = generateWizards(fullNames, COATCOLORS, EYESCOLORS);

var similarListElement = setupBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var fragment = fillDocumentFragment(wizards);

similarListElement.appendChild(fragment);

setupBlock.querySelector('.setup-similar').classList.remove('hidden');

