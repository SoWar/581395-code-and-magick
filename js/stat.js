'use strict';

var drawRect = function (ctx, x1, y1, width, height, color) {
// задаем цвет заливки, если не задан то чёрный
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x1, y1, width, height);
};

var printText = function (ctx, text, x, y, font, color) {
  ctx.font = font || '16px PT mono';
  ctx.fillStyle = color || '#000000';
  ctx.fillText(text, x, y);
};

var maxOfArray = function (values) {
  // maximum result
  var maxValue = values[0];
  for (var i = 1; i < values.length; i++) {
    if (maxValue < values[i]) {
      maxValue = values[i];
    }
  }
  return maxValue;
};

var drawStatColumn = function (ctx, playerName, playerResult, x, y, width, height) {
  var competitorColumnColor = 'rgba(0,255,255,' + Math.random() + ')';
  var playerColumnColor = 'rgba(255, 0, 0, 1)';

  var columnColor = (playerName !== 'Вы') ? competitorColumnColor : playerColumnColor;
  drawRect(ctx, x, y, width, height, columnColor);
};

window.renderStatistics = function (ctx, names, times) {
  var initialX = 100;
  var initialY = 10;
  var recWidth = 420;
  var recHeight = 270;
  var shadowShiftX = 10;
  var shadowShiftY = 10;
  var histHeight = 150;
  var histColumnWidth = 40;
  var histInnerColumnSpace = 50;

  // main rectangle
  drawRect(ctx, initialX, initialY, recWidth, recHeight, '#ffffff');

  // shadow
  drawRect(ctx, initialX + shadowShiftX, initialY + recHeight, recWidth, shadowShiftY, 'rgba(0,0,0,0.7)');
  drawRect(ctx, initialX + recWidth, initialY + shadowShiftY, shadowShiftX, recHeight - shadowShiftY, 'rgba(0,0,0,0.7)');

  // text
  printText(ctx, 'Ура, Вы победили!', 120, 40);
  printText(ctx, 'Список результатов:', 120, 60);

  // results histogram
  var xPosition = Math.floor(initialX + (recWidth - times.length * histColumnWidth - (times.length - 1) * histInnerColumnSpace) / 2);
  var columnHeight;
  var footerHeight = 30;
  var maxResult = maxOfArray(times);
  for (var i = 0; i < names.length; i++) {
    columnHeight = Math.floor(times[i] / maxResult * histHeight);
    drawStatColumn(ctx, names[i], times[i], xPosition, initialY + recHeight - columnHeight - footerHeight, histColumnWidth, columnHeight)
    // histograms annotations
    printText(ctx, names[i], xPosition, initialY + recHeight - 10);
    printText(ctx, Math.round(times[i]), xPosition, initialY + recHeight - columnHeight - footerHeight - 10);
    xPosition += histInnerColumnSpace + histColumnWidth;
  }
};
