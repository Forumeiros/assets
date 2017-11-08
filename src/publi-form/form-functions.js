/**
 * Copyiright (c) Fórum dos Fóruns.
 *
 * @author Luiz~
 */
(function ($) {
  'use strict';

  $(function () {

    /***
     * @begin
     * @title Checar inputs da parte 1.
     */
    $('.complete-fields [required]').each(function () {

      var $this = $(this);
      $this.on('focusout', function () {
        if (!$this.val()) {
          $this.addClass('input-danger');

          return;
        }

        $this
          .addClass('input-sucess')
            .removeClass('on-idle input-danger')
        ;
      });

    });

    $('#data-forum-avaliation').on('change', function () {

      var $this = $(this);
      if ($this.val() === 'Não') {
        $('.disabled-especial-inner').addClass('disabled');
        $('#data-forum-last-avaliation')
          .val('')
            .prop('disabled', true)
        ;

        return;
      }

      $('.disabled-especial-inner').removeClass('disabled');
      $('#data-forum-last-avaliation').prop('disabled', false);

    });

    $('#go-to-part-2, #step-2').on('click', function () {
      if ($('.complete-fields').find('.input-danger').length > 0 || $('.complete-fields').find('.on-idle').length > 0) {
        alert('Você deve completar todos os campos!');
        $('.on-idle').addClass('input-danger');
        return;
      }

      var topicTitleFa = $('#data-forum-name').val();
      $('#generated-topic-title').val(topicTitleFa);

      $('#step-2').removeClass('inactive');
      $('.global-part-1').slideUp();
      $('.global-part-2').slideDown();
      $('.global-part-3').slideUp();
    });

    $('#back-to-1, #step-1').on('click', function () {
      $('.global-part-3').slideUp();
      $('.global-part-2').slideUp();
      $('.global-part-1').slideDown();
    });

    /*
     * @end
     * @title Checar inputs da parte 1.
     ***/

    /***
     * @begin
     * @title Checar inputs da parte 2.
     */

    $('#publi-forum-desc').on('focusout', function () {

      var $this = $(this);
      if ($this.val().length < 100) {
        $this.addClass('input-danger');

        return;
      }

      $this.removeClass('input-danger on-idle-2');

    });

    $('#i-agree').on('change', function () {

      var $this = $(this);
      if (!$this.is(':checked')) {
        $this.addClass('on-idle-2');

        return;
      }

      $this.removeClass('on-idle-2');

    });

    $('#back-to-2').on('click', function () {
      $('.global-part-3').slideUp();
      $('.global-part-2').slideDown();
      $('.global-part-1').slideUp();
    });

    $('#go-to-part-3, #step-3').on('click', function () {
      if ($('.desc-fields').find('.on-idle-2').length > 0 || $('.desc-fields').find('.input-danger').length > 0) {
        alert('Você deve inserir no mínimo 100 caracteres na descrição do fórum e/ou concordar com as cláusulas do regulamento do setor de análises!');
        $('textarea.on-idle').addClass('input-danger');

        return;
      }

      var $zone = $('#preview-zone');
      $zone.html([
        '<h3 style="font-size: 24px; margin-bottom: 6px; text-transform: uppercase;">' + $('#data-forum-name').val() + '</h3>',
        '<br/>',
        '<strong>Nome do fórum:</strong> ' + $('#data-forum-name').val(),
        '<br /><br />',
        '<strong>Endereço do fórum:</strong> ' + $('#data-forum-url').val(),
        '<br /><br />',
        '<strong>Data de criação do fórum:</strong> ' + $('#data-forum-date').val(),
        '<br /><br />',
        '<strong>O fórum já foi avaliado?</strong> ' + $('#data-forum-avaliation').val(),
        '<br /><br />',
        '<strong>Última avaliação:</strong> ' + $('#data-forum-last-avaliation').val(),
        '<br /><br />',
        '<strong>Banner do fórum:</strong> ' + $('#data-forum-banner-url').val(),
        '<br /><br />',
        '<strong>Descrição do meu fórum:</strong>',
        $('#publi-forum-desc').val()
      ].join('\n'));

      $('#step-3').removeClass('inactive');
      $('.global-part-1').slideUp();
      $('.global-part-2').slideUp();
      $('.global-part-3').slideDown();
    });

    /*
     * @end
     * @title Checar inputs da parte 2.
     ***/

    /***
     * @begin
     * @title parte 3 POSTING.
     */
     $('#form-send').on('click', function () {

      $(this).text('Postando...');

      var fullMessage = [
        '[h3]' + $('#data-forum-name').val() + '[/h3]',
        '',
        '[b]Nome do fórum:[/b] ' + $('#data-forum-name').val(),
        '',
        '[b]Endereço do fórum:[/b] ' + $('#data-forum-url').val(),
        '',
        '[b]Data de criação do fórum:[/b] ' + $('#data-forum-date').val(),
        '',
        '[b]O fórum já foi avaliado?[/b] ' + $('#data-forum-avaliation').val(),
        '',
        '[b]Última avaliação:[/b] ' + $('#data-forum-last-avaliation').val(),
        '',
        '[b]Banner do fórum:[/b] ' + $('#data-forum-banner-url').val(),
        '',
        '[b]Descrição do meu fórum:[/b]',
        $('#publi-forum-desc').val()
      ].join('\n');

      var data = {
        subject: $('#data-forum-name').val(),
        message: fullMessage,
        f: 7,
        mode: 'newtopic',
        post: 1,
      };

      var encode = document.charset.toLowerCase() === 'utf-8' ? window.encodeURIComponent : window.escape;
       
      var encoded = $.map(data, function (value, key) {
        return key + '=' + encode(value);
      }).join('&');

      $.post('/post', encoded)
        .done(function () {
          location.href = '/f7-forum';
        })
        .fail(function () {
          alert('Ocorreu um erro!\nCaso continue, contate o Administrador.');
        })
      ;
    });

    /*
     * @end
     * @title Checar inputs da parte 3.
     ***/
  });
}(jQuery));
