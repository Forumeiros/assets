/*globals jQuery*/

/**
 * Script's para a postagem do formulário.
 * Essa Folha de Estilos foi gerada em <http://ajuda.forumeiros.com/h13->
 *
 * @author Luiz <http://ajuda.forumeiros.com/u60563>
 * @version 1.1
 */

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
