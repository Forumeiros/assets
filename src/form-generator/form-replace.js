/**
 *! Form Replace.
 *
 *  @author Luiz~
 *  @version 2.0
 */
(function($) {
  'use strict';

  $(function () {

    /**
     *! Correção no tipo da data:
     */
    $('[type="date"]').on('change', function () {
    
      var $this = $(this);
      if (!$this.val() === '') {
        return;
      }
    
      $this.val($this.val().replace(/(\d{4})-(\d{2})-(\d{2})/g, function (date, year, month, day) {
        console.log(date);
        $this.attr('data-day', day + '/' + month + '/' + year);
        return date;
      }));
    });

    /**
     *! Replace dos {{campo}}'s:
     */
    var $textarea = $('#fa-generated-message');
    var $title = $('#fa-generated-title');
    var $btn = $('#fa-generated-form .post-button');

    $btn.on('click', function(event) {
      
      if ($textarea.length === 0) {
        event.preventDefault();
        alert('Tente novamente!');
        return false;
      }

      $textarea.val($textarea.val().replace(/\{\{campo(\d+)\}\}/gi, function(text, match) {

        if ($('#campo' + match).attr('type') === 'data') {
          return $('#campo' + match).attr('data-day');
        }
        
        return $('#campo' + match).val();
      }));

      if ($title.length === 0) {
        return;
      }
      
      $title.val($title.val().replace(/\{\{campo(\d+)\}\}/gi, function(text, match) {

        if ($('#campo' + match).attr('type') === 'data') {
          return $('#campo' + match).attr('data-day');
        }
        
        return $('#campo' + match).val();
      }));
    });
  });
}(jQuery));
