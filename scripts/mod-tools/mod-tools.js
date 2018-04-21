/*globals jQuery, _userdata*/

/**
 *! Ações moderativas via AJAX.
 *
 *  Este script é parte do Fórum dos Fóruns.
 *  Não está autorizada nenhuma cópia sem a autorização
 *  prévia da administração.
 */

(function ($) {
  'use strict';

  window.FA = window.FA || {};
  window.FA.Ajax = window.FA.Ajax || {};

  var Mod;
  /** ============================
   * Construtor.
   *
   * @constructor
   * @ignore
   ** ============================ */
  window.FA.Ajax.Mod = Mod = function () {
    /** @ignore :: Somente o construtor da classe. */
  };

  /** ============================
   * Inicializador.
   ** ============================ */
  Mod.prototype.init = function () {
    var self = this;

    if (_userdata.user_level !== 1 && _userdata.user_level !== 2) {
      return;
    }

    if (! /^\/t(\d+)(p\d+-|-).*$/i.test(location.pathname)) {
      return;
    }

    self.deletePost(); // Deletar uma postagem.
    self.deleteTopic(); // Deletar um tópico.
    self.trash(); // Mover um tópico para o lixo.
    self.lock(); // Trancar/destrancar um tópico.
    self.move(); // Mover um tópico.
  };

  /** ============================
   * Deletar post via AJAX.
   *
   * @async
   ** ============================ */
  Mod.prototype.deletePost = function () {
    $('.post').each(function () {
      var $post = $(this);
      var $link = $post.find('a > img.i_icon_delete').parent();

      $link.on('click', function (event) {
        event.preventDefault();

        var $this = $(this);
        var $list = $this.parents('ul');

        if ($list.is('.is-in-progress')) {
          return;
        }

        $('.fa-ajax-panel').remove();
        $('.is-in-progress').removeClass('is-in-progress');

        $list
          .addClass('is-in-progress')
          .prepend([
            '<div class="fa-ajax-panel fa-ajax-post-delete" style="' + [
              'margin-bottom: 5px',
              'text-align: center',
              'font-size: 12px',
              'vertical-align: middle'
            ].join(';') + '">',
            '  <span>Deseja realmente excluir essa mensagem?</span>',
            '</div>'
          ].join('\n'))
        ;

        /** Botão para confirmar a ação. */
        $('<input />', { 'type': 'button', 'class': 'button2', 'value': 'Sim' })
          .on('click', function () {
            $post.slideUp();

            $.post('/post', {
              p      : $post.attr('id').replace(/\D/g, ''),
              mode   : 'delete',
              confirm: '1'
            })
              .done(function () {
                console.log('Post Action : DELETE | Status : SUCCESS');
                $post.remove();
              })
              .fail(function () {
                alert('Houve um erro ao deletar a mensagem! A página será atualizada...');
                location.reload(true);
              })
            ;
          })
          .appendTo($post.find('.fa-ajax-post-delete'))
        ;

        /** Botão para recusar a ação. */
        $('<input />', { 'type': 'button', 'class': 'button2', 'value': 'Não' })
          .on('click', function () {
            $list
              .removeClass('is-in-progress')
              .find('.fa-ajax-post-delete')
              .remove()
            ;
          })
          .appendTo($post.find('.fa-ajax-post-delete'))
        ;
      });
    });
  };

  /** ============================
   * Deletar tópico via AJAX.
   ** ============================ */
  Mod.prototype.deleteTopic = function () {
    $('p.right > a[href^="/modcp?mode=delete&"]').on('click', function (event) {
      event.preventDefault();

      var $this   = $(this);
      var $tid    = $('input[name="tid"]:first');
      var topic   = location.pathname.replace(/^\/t(\d+)(p\d+-|-).*$/i, '$1');

      if ($this.is('.is-in-progress')) {
        return;
      }

      if (! $tid.length) {
        alert('[ERROR] Não foi possível encontrar o seletor do elemento TID.');
        location.href = $this.attr('href');
        return;
      }

      $('.fa-ajax-panel').remove();
      $('.is-in-progress').removeClass('is-in-progress');

      $this
        .addClass('is-in-progress')
        .parent()
        .after([
          '<form class="fa-ajax-panel fa-ajax-topic-delete" action="/modcp?tid=' + $tid.val() + '" method="post" style="' + [
            'text-align: center',
            'font-size: 12px'
          ].join(';') + '">',
          '  <span>Você deseja realmente <strong>excluir permanentemente</strong> este tópico?</span>',
          '  <input type="hidden" name="mode" value="delete" />',
          '  <input type="hidden" name="t" value="' + topic + '" />',
          '  <br />',
          '  <br />',
          '</form>'
        ].join('\n'))
      ;

      /** Botão para confirmar a ação. */
      $('<input />', { 'type': 'submit', 'class': 'button2', 'name': 'confirm', 'value': 'Sim' })
        .appendTo($this.parent().next('.fa-ajax-topic-delete'))
      ;

      /** Botão para recusar a ação. */
      $('<input />', { 'type': 'button', 'class': 'button2', 'value': 'Não' })
        .on('click', function (event) {
          event.preventDefault();

          $this
            .removeClass('is-in-progress')
            .parent()
            .next('.fa-ajax-topic-delete')
            .remove()
          ;
        })
        .appendTo($this.parent().next('.fa-ajax-topic-delete'))
      ;
    });
  };

  /** ============================
   * Enviar à lixeira via AJAX.
   *
   * @async
   ** ============================ */
  Mod.prototype.trash = function () {
    $('p.right > a[href^="/modcp?mode=trash&"]').on('click', function (event) {
      event.preventDefault();

      var $this = $(this);

      if ($this.is('.is-in-progress')) {
        return;
      }

      $this.addClass('is-in-progress');

      $.get($this.attr('href'))
        .done(function () {
          console.log('Post Action : TRASH | Status : SUCCESS');
          location.reload(true);
        })
      ;
    });
  };

  /** ============================
   * Trancar/destrancar um tópico.
   *
   * @async
   ** ============================ */
  Mod.prototype.lock = function () {
    var selectors = [
      'a[href^="/modcp?mode=lock&"]',
      'a[href^="/modcp?mode=unlock&"]'
    ];

    var change = function (selector, mode) {
      var $this   = $(selector);
      var reverse = mode === 'lock' ? 'unlock' : 'lock';

      $this
        .removeAttr('title')
        .removeAttr('alt')
        .attr('href', $this.attr('href').replace(reverse, mode))
        .children('img')
        .attr('src', 'https://i18.servimg.com/u/f18/16/89/96/68/' + mode + '13.png')
      ;
    };

    $('p.right').on('click', selectors.join(','), function (event) {
      event.preventDefault();

      var $this = $(this);

      $.get($this.attr('href'));

      if ($this.attr('href').indexOf('lock') === 12) {
        change($this, 'unlock');
        return;
      }
      
      change($this, 'lock');
    });
  };

  /** ============================
   * Mover tópico rapidamente.
   ** ============================ */
  Mod.prototype.move = function () {
    $('p.right > a[href^="/modcp?mode=move&"]').on('click', function (event) {
      event.preventDefault();

      var $this   = $(this);
      var $tid    = $('input[name="tid"]:first');
      var $select = $('select[name="selected_id"]');
      var topic   = location.pathname.replace(/^\/t(\d+)(p\d+-|-).*$/i, '$1');

      if ($this.is('.is-in-progress')) {
        return;
      }

      if (! $tid.length) {
        alert('[ERROR] Não foi possível encontrar o seletor do elemento TID.');
        location.href = $this.attr('href');
        return;
      }

      if (! $select.length) {
        alert('[ERROR] Não foi possível encontrar o seletor do elemento SELECT.');
        location.href = $this.attr('href');
        return;
      }

      $('.fa-ajax-panel').remove();
      $('.is-in-progress').removeClass('is-in-progress');

      $this
        .addClass('is-in-progress')
        .parent()
        .after([
          '<form class="fa-ajax-panel fa-ajax-topic-move" action="/modcp?tid=' + $tid.val() + '" method="post" style="' + [
            'text-align: center',
            'font-size: 12px'
          ].join(';') + '">',
          '  <span>Mover para:</span>',
          '  <select name="new_forum" id="movetopic">' + $select.html() + '</select>',
          '  <br />',
          '  <br />',
          '  <input type="checkbox" name="move_leave_shadow" /> Marcar como tópico fantasma?',
          '  <input type="hidden" name="mode" value="move" />',
          '  <input type="hidden" name="t" value="' + topic + '" />',
          '  <br />',
          '  <br />',
          '</form>'
        ].join('\n'))
      ;

      /** Botão para confirmar a ação. */
      $('<input />', { 'type': 'submit', 'class': 'button2', 'name': 'confirm', 'value': 'Mover' })
        .appendTo($this.parent().next('.fa-ajax-topic-move'))
      ;

      /** Botão para recusar a ação. */
      $('<input />', { 'type': 'button', 'class': 'button2', 'value': 'Cancelar' })
        .on('click', function (event) {
          event.preventDefault();

          $this
            .removeClass('is-in-progress')
            .parent()
            .next('.fa-ajax-topic-move')
            .remove()
          ;
        })
        .appendTo($this.parent().next('.fa-ajax-topic-move'))
      ;
    });
  };

  $(function () {
    /** Instanciar e iniciar a classe. */
    (new window.FA.Ajax.Mod()).init();
  });
})(jQuery);
