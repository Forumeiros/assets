/**
 * Script usado para substituir os textos dos inputs.
 * @version 2.0
 * @licence MIT
 */
(function($) {
  'use strict';

  $(function() {
    var $textarea = $('#fa-generated-message');
    var $title = $('#fa-generated-title');
    var $form = $('#fa-generated-form');

    $form.on('submit', function(event) {
      
      if ($textarea.length === 0) {
        event.preventDefault();
        alert('Tente novamente!');
        return false;
      }

      $textarea.val($textarea.val().replace(/\{\{campo(\d+)\}\}/gi, function(text, match) {
        return $('#campo' + match).val();
      }));

      if ($title.length === 0) {
        return;
      }
      
      $title.val($title.val().replace(/\{\{campo(\d+)\}\}/gi, function(text, match) {
        return $('#campo' + match).val();
      }));
    });
  });
}(jQuery));
