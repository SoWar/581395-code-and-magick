'use strict';

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
  var playerColumnColor = 'rgba(255, 0, 0, 1)';
  var competitorColumnColor = 'rgba(0,255,255,';

  // main rectangle
  ctx.beginPath();
  ctx.moveTo(initialX, initialY);
  ctx.lineTo(initialX + recWidth, initialY);
  ctx.lineTo(initialX + recWidth, initialY + recHeight);
  ctx.lineTo(initialX, initialY + recHeight);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(initialX + shadowShiftX, initialY + recHeight, recWidth, shadowShiftY);
  ctx.fillRect(initialX + recWidth, initialY + shadowShiftY, shadowShiftX, recHeight - shadowShiftY);

  // text
  ctx.font = '16px PT mono';
  ctx.fillText('Ура, Вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // maximum result
  var maxResult = times[0];
  for (var i = 1; i < times.length; i++) {
    if (maxResult < times[i]) {
      maxResult = times[i];
    }
  }

  // results histogram
  var xPosition = Math.floor(initialX + (recWidth - times.length * histColumnWidth - (times.length - 1) * histInnerColumnSpace) / 2);
  var columnHeight;
  var footerHeight = 30;
  for (var i = 0; i < names.length; i++) {
    if (names[i] !== 'Вы') {
      ctx.fillStyle = competitorColumnColor + Math.random() + ')';
    } else {
      ctx.fillStyle = playerColumnColor;
    }
    columnHeight = Math.floor(times[i] / maxResult * histHeight);
    ctx.fillRect(xPosition, initialY + recHeight - columnHeight - footerHeight, histColumnWidth, columnHeight);
    // histograms annotations
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], xPosition, initialY + recHeight - 10);
    ctx.fillText(Math.round(times[i]), xPosition, initialY + recHeight - columnHeight - footerHeight - 10);
    xPosition += histInnerColumnSpace + histColumnWidth;
  }
};
