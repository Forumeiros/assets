/*globals jQuery*/

/**
 *! POSTAR EM AJAX COM AVISOS
 *
 * @author  Luiz Felipe F.
 * @see     {@link https://lffg.github.io}
 */

(function ($) {
  'use strict';

  var config = {
    loading      : '<i class="fa fa-refresh fa-spin"></i> Postando sua mensagem...',
    success      : '<i class="fa fa-check-circle"></i> Mensagem postada com sucesso!',
    sceditorError: '<i class="fa fa-exclamation-circle"></i> O SCEditor não está disponível nessa página.',
    min          : '<i class="fa fa-exclamation-circle"></i> Você deve postar uma mensagem com no mínimo 5 caracteres.',
    max          : '<i class="fa fa-exclamation-circle"></i> Você deve postar uma mensagem com no máximo 25000 caracteres.',
    postAjax     : '<i class="fa fa-exclamation-circle"></i> Não foi possível postar a sua mensagem, tendo em vista que um erro AJAX ocorreu.',
    getAjax      : '<i class="fa fa-exclamation-circle"></i> A sua mensagem foi postada com sucesso, no entanto, não foi possível carregá-la aqui.'
  };

  window.FA = window.FA || {};
  window.FA.Ajax = window.FA.Ajax || {};

  var Post;
  /**
   * Construtor da classe.
   * Setar as configurações.
   *
   * @return  {void}
   */
  window.FA.Ajax.Post = Post = function (userConfig) {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Configurações padrão.
     */
    self.defaults = {
      loading      : 'Postando sua mensagem...',
      success      : 'Mensagem postada com sucesso!',
      sceditorError: 'O SCEditor não está disponível nessa página.',
      min          : 'Você deve postar uma mensagem com no mínimo 5 caracteres.',
      max          : 'Você deve postar uma mensagem com no máximo 25000 caracteres.',
      postAjax     : 'Não foi possível postar a sua mensagem, tendo em vista que um erro AJAX ocorreu.',
      getAjax      : 'A sua mensagem foi postada com sucesso, no entanto, não foi possível carregá-la aqui.'
    };

    /**
     * Tranformar as configurações do usuário
     * nas configurações da classe.
     */
    self.config = $.extend({}, self.defaults, userConfig);
  };

  /**
   * Inicializa e faz os callback's das ações
   * que são realizadas por este script.
   *
   * @method  init
   * @return  {void}
   */
  Post.prototype.init = function () {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Caso a página atual não seja
     * um tópico, pare a execução
     * do script.
     */
    if (!self.isTopic()) {
      return;
    }

    /**
     * Inserir os estilos.
     */
    self.styles();

    /**
     * Instância do formulário.
     *
     * @var {object}
     */
    self.$form = $('#quick_reply');

    /**
     * Verifica quando o formulário de
     * respostas rápidas for submetido para
     * iniciar as ações AJAX do script.
     */
    self.$form.find('input[type="submit"][name="post"]').on('click', function (event) {
      event.preventDefault();

      /**
       * Instância jQuery do link.
       *
       * @var {object}
       */
      var $link = $(this);

      /**
       * Dados que devem ser enviados
       * à requisição assíncrona.
       */
      var data = self.getData();

      /**
       * Caso algum erro tenha vindo
       * da função de capturar os dados,
       * jogue-os numa alerta e pare
       * a execução do script.
       */
      if (!data.status) {
        self.alert(data.response, 'error');
        return;
      }

      /**
       * Caso o botão tenha sido clicado 2x,
       * previna o envio de duas mensagens.
       */
      if ($link.is('.is-disabled')) {
        return;
      }

      $link
        .addClass('is-disabled')
        .prop('disabled', true)
      ;

      /**
       * Emitir um alerta de que as
       * requisições assíncronas
       * estão ocorrendo.
       */
      self.alert(self.config.loading, 'info');

      /**
       * Fazer a requisição para postar
       * a mensagem.
       */
      self.post(data, function (err) {
        /**
         * Caso exista algum erro.
         */
        if (err) {
          self.alert(err, 'error');
          return;
        }

        /**
         * Fazer a requisição para recuperar
         * a mensagem postada.
         */
        self.get(function (err, post) {
          /**
           * Caso exista algum erro.
           */
          if (err) {
            self.alert(err, 'error');
            return;
          }

          /**
           * Caso a mensagem tenha sido postada e recuperada
           * com sucesso, jogue uma alerta de sucesso.
           */
          self.alert(self.config.success, 'success');

          /**
           * Remover o valor atual do editor.
           */
          self.removeValue();

          /**
           * Caso o membro que tiver postado seja da equipe,
           * pinte a borda do post de acordo com a cor do
           * seu grupo.
           */
          self.border();

          /**
           * Remover o status de disabled.
           */
          $link
            .removeClass('is-disabled')
            .prop('disabled', false)
          ;

          /**
           * Alterar o ícone.
           */
          var $img = $('.post:last').find('.topic-title > img');
          $('.post').not(':last').each(function () {
            var $this = $(this);

            $this.find('.topic-title > img').attr('src', $img.attr('src'));
          });
        });
      });
    });
  };

  /**
   * Verifica se a página atual é um tópico.
   *
   * @method  idTopic
   * @return  {boolean}
   */
  Post.prototype.isTopic = function () {
    return /^\/t(\d+)(p\d+-|-).*$/i.test(location.pathname);
  };

  /**
   * Recupera os dados que devem ser enviados
   * à requisição de postar a mensagem.
   *
   * @method  getData
   * @return  {object}
   */
  Post.prototype.getData = function () {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Caso o editor de texto não esteja presente,
     * notifique o usuário do erro e pare a execução
     * do script.
     */
    if (!$.sceditor) {
      return {
        status  : false,
        response: self.config.sceditorError
      };
    }

    /**
     * Instância do SCEditor.
     *
     * @var {object}
     */
    var $sceditor = $('#text_editor_textarea').sceditor('instance');

    /**
     * Caso o valor do SCEditor seja menor
     * que 5 caracteres, notifique o usuário
     * e pare a execução do script.
     */
    if ($sceditor.val().length < 5) {
      return {
        status  : false,
        response: self.config.min
      };
    }

    /**
     * Caso o valor do SCEditor seja maior
     * que 25.000 caracteres, notifique o usuário
     * e pare a execução do script.
     */
    if ($sceditor.val().length > 25000) {
      return {
        status  : false,
        response: self.config.max
      };
    }

    /**
     * Objeto jQuery do input do tid.
     *
     * @var {object}
     */
    var $tid = $('[name="tid"]');

    /**
     * Objeto jQuery do input do ícone.
     */
    var $icon = self.$form.find('[name="post_icon"]');

    /**
     * Retorno (esperado) da função.
     */
    return {
      t         : location.pathname.replace(/^\/t(\d+)(p\d+-|-).*$/i, '$1'),
      post_icon : $icon.serialize().replace(/^.*=(\d+)$/i, '$1'),
      message   : $sceditor.val(),
      tid       : $tid.val()  || '',
      mode      : 'reply',
      attach_sig: 1,
      status    : true,
      post      : 1
    };
  };

  /**
   * Posta a mensagem de forma assíncrona.
   *
   * @method  post
   * @param   {object}
   * @param   {function}
   * @return  {void}
   */
  Post.prototype.post = function (data, callback) {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Executar a requisição.
     */
    $.post('/post', data)
      .done(function () {
        /**
         * Caso a requisição tenha sido completada,
         * execute o callback sem lançar erros.
         */
        callback.apply(self);
      })
      .fail(function () {
        /**
         * Caso a requisição não tenha sido completa,
         * execute o callback lançando o erro.
         */
        callback.apply(self, [ self.config.postAjax ]);
      })
    ;
  };

  /**
   * Recupera a mensagem postada de forma assíncrona.
   *
   * @method  get
   * @param   {object}
   * @return  {void}
   */
  Post.prototype.get = function (callback) {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Capturar o ID do tópico atual.
     *
     * @var {int}
     */
    var topic = location.pathname.replace(/^\/t(\d+)(p\d+-|-).*$/i, '$1');

    /**
     * Executar a requisição.
     */
    $.get('/viewtopic', {
      t: topic,
      view: 'newest'
    })
      .done(function (context) {
        /**
         * Caso a requisição tenha sido completada,
         * recupere o post, inserindo-o após
         * o último post atual, e execute o callback.
         */
        var $post = $('.post:last', context);

        $post
          .hide()
          .insertAfter('.post:last')
          .slideDown()
        ;

        $('html, body').stop().animate({
          scrollTop: $post.offset().top - 120
        });

        callback.apply(self);
      })
      .fail(function () {
        /**
         * Caso a requisição não tenha sido completa,
         * execute o callback lançando o erro.
         */
        callback.apply(self, [ self.config.getAjax ]);
      })
    ;
  };

  /**
   * Colorir a borda do último post.
   *
   * @method  border
   * @return  {void}
   */
  Post.prototype.border = function () {
    var $post = $('.post:last');
    var $user = $post.find('.postprofile strong > a > span[style]');

    if (!$user.length) return;
    if (!$user.css('color').length) return;

    $post
      .find('.inner')
        .css('border-top-color', $user.css('color'))
    ;
  };

  /**
   * Remove o valor atual do editor.
   *
   * @method  removeValue
   * @return  {void}
   */
  Post.prototype.removeValue = function () {
    $('#text_editor_textarea')
      .sceditor('instance')
      .val('')
    ;
  };

  /**
   * Insere uma alerta acima do editor.
   *
   * @method  alert
   * @param   {string}
   * @param   {string}
   * @return  {void}
   */
  Post.prototype.alert = function (content, type) {
    /**
     * Caso nenhum tipo for especificado,
     * o tipo padrão será `success`.
     */
    if (!type) {
      type = 'success';
    }

    /**
     * Se alertas já existirem, remova-as.
     */
    $('.fa-post-alert').remove();

    /**
     * Criar a alerta.
     */
    $('<div>', {
      'class': 'fa-post-alert ' + type,
      'html' : content
    }).insertBefore('#textarea_content');
  };

  /**
   * Inserir os estilos.
   *
   * @method  styles
   * @return  {void}
   */
  Post.prototype.styles = function () {
    $('<style>')
      .text([
        '.fa-post-alert {',
        '  width: 70%;',
        '  margin: 10px auto 20px auto;',
        '  background-color: #ddd;',
        '  border: solid 1px #d0d0d0;',
        '  color: #555;',
        '  padding: 20px;',
        '  border-radius: 3px;',
        '  font-size: 13px;',
        '  font-style: normal !important;',
        '  box-sizing: border-box;',
        '}',
        '',
        '.fa-post-alert.error {',
        '  background-color: #d32f2f;',
        '  border-color: #d32f2f;',
        '  color: #fff;',
        '}',
        '',
        '.fa-post-alert.success {',
        '  background-color: #80c25e;',
        '  border-color: #80c25e;',
        '  color: #fff;',
        '}',
        '',
        '.fa-post-alert.info {',
        '  background-color: #00bcd4;',
        '  border-color: #00bcd4;',
        '  color: #fff;',
        '}'
      ].join('\n'))
      .appendTo('head')
    ;
  };

  $(function () {
    /**
     * Instanciar a classe e iniciar.
     */
    (new window.FA.Ajax.Post(config)).init();
  });
}(jQuery));
/*globals jQuery*/

/**
 *! POSTAR EM AJAX COM AVISOS
 *
 * @author  Luiz Felipe F.
 * @see     {@link https://lffg.github.io}
 */

(function ($) {
  'use strict';

  var config = {
    loading      : '<i class="fa fa-refresh fa-spin"></i> Postando sua mensagem...',
    success      : '<i class="fa fa-check-circle"></i> Mensagem postada com sucesso!',
    sceditorError: '<i class="fa fa-exclamation-circle"></i> O SCEditor não está disponível nessa página.',
    min          : '<i class="fa fa-exclamation-circle"></i> Você deve postar uma mensagem com no mínimo 5 caracteres.',
    max          : '<i class="fa fa-exclamation-circle"></i> Você deve postar uma mensagem com no máximo 25000 caracteres.',
    postAjax     : '<i class="fa fa-exclamation-circle"></i> Não foi possível postar a sua mensagem, tendo em vista que um erro AJAX ocorreu.',
    getAjax      : '<i class="fa fa-exclamation-circle"></i> A sua mensagem foi postada com sucesso, no entanto, não foi possível carregá-la aqui.'
  };

  window.FA = window.FA || {};
  window.FA.Ajax = window.FA.Ajax || {};

  var Post;
  /**
   * Construtor da classe.
   * Setar as configurações.
   *
   * @return  {void}
   */
  window.FA.Ajax.Post = Post = function (userConfig) {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Configurações padrão.
     */
    self.defaults = {
      loading      : 'Postando sua mensagem...',
      success      : 'Mensagem postada com sucesso!',
      sceditorError: 'O SCEditor não está disponível nessa página.',
      min          : 'Você deve postar uma mensagem com no mínimo 5 caracteres.',
      max          : 'Você deve postar uma mensagem com no máximo 25000 caracteres.',
      postAjax     : 'Não foi possível postar a sua mensagem, tendo em vista que um erro AJAX ocorreu.',
      getAjax      : 'A sua mensagem foi postada com sucesso, no entanto, não foi possível carregá-la aqui.'
    };

    /**
     * Tranformar as configurações do usuário
     * nas configurações da classe.
     */
    self.config = $.extend({}, self.defaults, userConfig);
  };

  /**
   * Inicializa e faz os callback's das ações
   * que são realizadas por este script.
   *
   * @method  init
   * @return  {void}
   */
  Post.prototype.init = function () {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Caso a página atual não seja
     * um tópico, pare a execução
     * do script.
     */
    if (!self.isTopic()) {
      return;
    }

    /**
     * Inserir os estilos.
     */
    self.styles();

    /**
     * Instância do formulário.
     *
     * @var {object}
     */
    self.$form = $('#quick_reply');

    /**
     * Verifica quando o formulário de
     * respostas rápidas for submetido para
     * iniciar as ações AJAX do script.
     */
    self.$form.find('input[type="submit"][name="post"]').on('click', function (event) {
      event.preventDefault();

      /**
       * Instância jQuery do link.
       *
       * @var {object}
       */
      var $link = $(this);

      /**
       * Dados que devem ser enviados
       * à requisição assíncrona.
       */
      var data = self.getData();

      /**
       * Caso algum erro tenha vindo
       * da função de capturar os dados,
       * jogue-os numa alerta e pare
       * a execução do script.
       */
      if (!data.status) {
        self.alert(data.response, 'error');
        return;
      }

      /**
       * Caso o botão tenha sido clicado 2x,
       * previna o envio de duas mensagens.
       */
      if ($link.is('.is-disabled')) {
        return;
      }

      $link
        .addClass('is-disabled')
        .prop('disabled', true)
      ;

      /**
       * Emitir um alerta de que as
       * requisições assíncronas
       * estão ocorrendo.
       */
      self.alert(self.config.loading, 'info');

      /**
       * Fazer a requisição para postar
       * a mensagem.
       */
      self.post(data, function (err) {
        /**
         * Caso exista algum erro.
         */
        if (err) {
          self.alert(err, 'error');
          return;
        }

        /**
         * Fazer a requisição para recuperar
         * a mensagem postada.
         */
        self.get(function (err, post) {
          /**
           * Caso exista algum erro.
           */
          if (err) {
            self.alert(err, 'error');
            return;
          }

          /**
           * Caso a mensagem tenha sido postada e recuperada
           * com sucesso, jogue uma alerta de sucesso.
           */
          self.alert(self.config.success, 'success');

          /**
           * Remover o valor atual do editor.
           */
          self.removeValue();

          /**
           * Caso o membro que tiver postado seja da equipe,
           * pinte a borda do post de acordo com a cor do
           * seu grupo.
           */
          self.border();

          /**
           * Remover o status de disabled.
           */
          $link
            .removeClass('is-disabled')
            .prop('disabled', false)
          ;

          /**
           * Alterar o ícone.
           */
          var $img = $('.post:last').find('.topic-title > img');
          $('.post').not(':last').each(function () {
            var $this = $(this);

            $this.find('.topic-title > img').attr('src', $img.attr('src'));
          });
        });
      });
    });
  };

  /**
   * Verifica se a página atual é um tópico.
   *
   * @method  idTopic
   * @return  {boolean}
   */
  Post.prototype.isTopic = function () {
    return /^\/t(\d+)(p\d+-|-).*$/i.test(location.pathname);
  };

  /**
   * Recupera os dados que devem ser enviados
   * à requisição de postar a mensagem.
   *
   * @method  getData
   * @return  {object}
   */
  Post.prototype.getData = function () {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Caso o editor de texto não esteja presente,
     * notifique o usuário do erro e pare a execução
     * do script.
     */
    if (!$.sceditor) {
      return {
        status  : false,
        response: self.config.sceditorError
      };
    }

    /**
     * Instância do SCEditor.
     *
     * @var {object}
     */
    var $sceditor = $('#text_editor_textarea').sceditor('instance');

    /**
     * Caso o valor do SCEditor seja menor
     * que 5 caracteres, notifique o usuário
     * e pare a execução do script.
     */
    if ($sceditor.val().length < 5) {
      return {
        status  : false,
        response: self.config.min
      };
    }

    /**
     * Caso o valor do SCEditor seja maior
     * que 25.000 caracteres, notifique o usuário
     * e pare a execução do script.
     */
    if ($sceditor.val().length > 25000) {
      return {
        status  : false,
        response: self.config.max
      };
    }

    /**
     * Objeto jQuery do input do tid.
     *
     * @var {object}
     */
    var $tid = $('[name="tid"]');

    /**
     * Objeto jQuery do input do ícone.
     */
    var $icon = self.$form.find('[name="post_icon"]');
    var val   = $icon.serialize().replace(/^.*=(\d+)$/i, '$1');

    /**
     * Retorno (esperado) da função.
     */
    var data = {
      t         : location.pathname.replace(/^\/t(\d+)(p\d+-|-).*$/i, '$1'),
      message   : $sceditor.val(),
      tid       : $tid.val()  || '',
      mode      : 'reply',
      attach_sig: 1,
      status    : true,
      post      : 1
    };

    /**
     * Correção do ícone.
     */
    if ($icon.length !== 0) {
      if (val !== '') {
        console.log('[FQR] Ícone encontrado e incluído.');
        data.post_icon = val;
      } else {
        console.log('[FQR] Ícone encontrado e NÃO incluído.');
      }
    } else {
      console.log('[FQR] Não foi encontrado ícone.');
    }

    return data;
  };

  /**
   * Posta a mensagem de forma assíncrona.
   *
   * @method  post
   * @param   {object}
   * @param   {function}
   * @return  {void}
   */
  Post.prototype.post = function (data, callback) {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Executar a requisição.
     */
    $.post('/post', data)
      .done(function () {
        /**
         * Caso a requisição tenha sido completada,
         * execute o callback sem lançar erros.
         */
        callback.apply(self);
      })
      .fail(function () {
        /**
         * Caso a requisição não tenha sido completa,
         * execute o callback lançando o erro.
         */
        callback.apply(self, [ self.config.postAjax ]);
      })
    ;
  };

  /**
   * Recupera a mensagem postada de forma assíncrona.
   *
   * @method  get
   * @param   {object}
   * @return  {void}
   */
  Post.prototype.get = function (callback) {
    /**
     * Instância da classe.
     *
     * @var {object}
     */
    var self = this;

    /**
     * Capturar o ID do tópico atual.
     *
     * @var {int}
     */
    var topic = location.pathname.replace(/^\/t(\d+)(p\d+-|-).*$/i, '$1');

    /**
     * Executar a requisição.
     */
    $.get('/viewtopic', {
      t: topic,
      view: 'newest'
    })
      .done(function (context) {
        /**
         * Caso a requisição tenha sido completada,
         * recupere o post, inserindo-o após
         * o último post atual, e execute o callback.
         */
        var $post = $('.post:last', context);

        $post
          .hide()
          .insertAfter('.post:last')
          .slideDown()
        ;

        $('html, body').stop().animate({
          scrollTop: $post.offset().top - 120
        });

        callback.apply(self);
      })
      .fail(function () {
        /**
         * Caso a requisição não tenha sido completa,
         * execute o callback lançando o erro.
         */
        callback.apply(self, [ self.config.getAjax ]);
      })
    ;
  };

  /**
   * Colorir a borda do último post.
   *
   * @method  border
   * @return  {void}
   */
  Post.prototype.border = function () {
    var $post = $('.post:last');
    var $user = $post.find('.postprofile strong > a > span[style]');

    if (!$user.length) return;
    if (!$user.css('color').length) return;

    $post
      .find('.inner')
        .css('border-top-color', $user.css('color'))
    ;
  };

  /**
   * Remove o valor atual do editor.
   *
   * @method  removeValue
   * @return  {void}
   */
  Post.prototype.removeValue = function () {
    $('#text_editor_textarea')
      .sceditor('instance')
      .val('')
    ;
  };

  /**
   * Insere uma alerta acima do editor.
   *
   * @method  alert
   * @param   {string}
   * @param   {string}
   * @return  {void}
   */
  Post.prototype.alert = function (content, type) {
    /**
     * Caso nenhum tipo for especificado,
     * o tipo padrão será `success`.
     */
    if (!type) {
      type = 'success';
    }

    /**
     * Se alertas já existirem, remova-as.
     */
    $('.fa-post-alert').remove();

    /**
     * Criar a alerta.
     */
    $('<div>', {
      'class': 'fa-post-alert ' + type,
      'html' : content
    }).insertBefore('#textarea_content');
  };

  /**
   * Inserir os estilos.
   *
   * @method  styles
   * @return  {void}
   */
  Post.prototype.styles = function () {
    $('<style>')
      .text([
        '.fa-post-alert {',
        '  width: 70%;',
        '  margin: 10px auto 20px auto;',
        '  background-color: #ddd;',
        '  border: solid 1px #d0d0d0;',
        '  color: #555;',
        '  padding: 20px;',
        '  border-radius: 3px;',
        '  font-size: 13px;',
        '  font-style: normal !important;',
        '  box-sizing: border-box;',
        '}',
        '',
        '.fa-post-alert.error {',
        '  background-color: #d32f2f;',
        '  border-color: #d32f2f;',
        '  color: #fff;',
        '}',
        '',
        '.fa-post-alert.success {',
        '  background-color: #80c25e;',
        '  border-color: #80c25e;',
        '  color: #fff;',
        '}',
        '',
        '.fa-post-alert.info {',
        '  background-color: #00bcd4;',
        '  border-color: #00bcd4;',
        '  color: #fff;',
        '}'
      ].join('\n'))
      .appendTo('head')
    ;
  };

  $(function () {
    /**
     * Instanciar a classe e iniciar.
     */
    (new window.FA.Ajax.Post(config)).init();
  });
}(jQuery));
