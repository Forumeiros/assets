/*
 *! Form Generator v2.0 – Generated form's value replacer
 *
 * Developed by Luiz Felipe Gonçalves <https://luizfelipe.dev>
 *
 * All Forumotion Support Forums may USE this code.
 * DO NOT REDISTRIBUTE OR EDIT WITHOUT THE AUTHOR'S CONSENT.
 *
 * Do not modify the origin of any script or style sheet without contacting
 * the generator's author (Luiz Felipe Gonçalves - https://luizfelipe.dev/).
 *
 * Copyright (c) Luiz Felipe Gonçalves. 2017-current.
 */

/*globals jQuery*/

(function ($) {
  'use strict';

  $(function () {
    var $textarea = $('#fa-generated-message');
    var $title = $('#fa-generated-title');
    var $form = $('#fa-generated-form');

    $form.on('submit', function (event) {

      if ($textarea.length === 0) {
        event.preventDefault();
        alert('[Erro Código 001 | Form Functions] Tente novamente!');
        return false;
      }

      $textarea.val($textarea.val().replace(/\{\{campo(\d+)\}\}/gi, function (text, match) {
        return $('#campo' + match).val();
      }));

      if ($title.length === 0) {
        return;
      }

      $title.val($title.val().replace(/\{\{campo(\d+)\}\}/gi, function (text, match) {
        return $('#campo' + match).val();
      }));
    });
  });
}(jQuery));
