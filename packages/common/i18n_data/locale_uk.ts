/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// THIS CODE IS GENERATED - DO NOT MODIFY
// See angular/tools/gulp-tasks/cldr/extract.js

export default [
  'uk',
  [
    ['дп', 'пп'],
    ,
  ],
  ,
  [
    ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'], ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'пʼятниця', 'субота'],
    ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  ],
  ,
  [
    ['с', 'л', 'б', 'к', 'т', 'ч', 'л', 'с', 'в', 'ж', 'л', 'г'],
    [
      'січ.', 'лют.', 'бер.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'вер.', 'жовт.', 'лист.',
      'груд.'
    ],
    [
      'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня',
      'жовтня', 'листопада', 'грудня'
    ]
  ],
  [
    ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
    ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'],
    [
      'січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень',
      'вересень', 'жовтень', 'листопад', 'грудень'
    ]
  ],
  [['до н.е.', 'н.е.'], ['до н. е.', 'н. е.'], ['до нашої ери', 'нашої ери']], 1, [6, 0],
  ['dd.MM.yy', 'd MMM y \'р\'.', 'd MMMM y \'р\'.', 'EEEE, d MMMM y \'р\'.'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
  [
    '{1}, {0}',
    ,
    '{1} \'о\' {0}',
  ],
  [',', ' ', ';', '%', '+', '-', 'Е', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '₴', 'українська гривня',
  function(n: number):
      number {
        let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (v === 0 && i % 10 === 1 && !(i % 100 === 11)) return 1;
        if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
            !(i % 100 >= 12 && i % 100 <= 14))
          return 3;
        if (v === 0 && i % 10 === 0 ||
            v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
            v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)
          return 4;
        return 5;
      }
];
