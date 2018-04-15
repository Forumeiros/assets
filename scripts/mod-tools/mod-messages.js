/*globals jQuery*/

/**
 * Create a messages button for the sceditor.
 *
 * @author   Luiz Felipe F.
 * @see      https://lffg.github.io
 * @version  2.0.0
 * @license  MIT
 */

(function($) {
  'use strict';

  var categories = [
    /**
     * ---------------------------------------------------------------------
     * MODERAÇÃO GLOBAL
     * ---------------------------------------------------------------------
     */
    {
      config: { name: 'Moderação Global', icon: 'fa fa-globe', color: '#7BB92B' },
      messages: [
        {
          name: 'Bem-vindo ao FDF',
          help: 'Mensagem de boas-vindas para novos usuários.',
          content: [
            '[table class="mod-action"][tr][td class="icon fa fa-comments-o"][/td][td][h4]Bem-vindo ao Fórum dos Fóruns![/h4]',
            '',
            'Seja bem-vindo ao Fórum dos Fóruns! Como acabou de se inscrever, veja aqui alguns links importantes a saber:',
            '',
            '[list]',
            '[*][url=http://ajuda.forumeiros.com/t82-]Regras do Fórum, e o que você não deve fazer neste fórum[/url];',
            '[*]Lista de [url=http://ajuda.forumeiros.com/t6745-]tutoriais[/url] e [url=http://ajuda.forumeiros.com/t23-]perguntas frequentes[/url];',
            '[*]A [url=http://ajuda.forumeiros.com/t7556-]Equipe de Suporte[/url];',
            '[*]A função de [url=http://ajuda.forumeiros.com/search.forum]busca[/url].[/list][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Fórum em manutenção',
          help: 'Usado para quando precisamos que o autor tire o fórum da manutenção',
          content: [
            '[table class="mod-action"][tr][td class="icon fa fa-cog"][/td][td][h4]Fórum em manutenção[/h4]',
            '',
            'Para que possamos dar continuidade, o seu fórum não pode estar em manutenção. Seu tópico ficará pendente até você retirar o modo de manutenção. Caso não seja retirado nos próximos dois dias, este será movido para lixeira.',
            '',
            '[i][b]Tópico pendente.[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Fórum não existe',
          help: 'Usado para arquivar tópicos que tratam de fóruns inexistentes.',
          content: [
            '[table class="mod-action"][tr][td class="icon fa fa-link"][/td][td][h4]Fórum inexistente[/h4]',
            '',
            'O seu fórum encontra-se inativo ou não existe. Para prosseguirmos com este tópico, pedimos que atualize o link com o de um fórum existente. Caso não o faça em 2 dias, o tópico será movido para a lixeira.',
            '',
            '[i][b]Tópico pendente.[/b][/i][/td][/tr][/table]'
          ].join('\n')
        }
      ]
    },
    /**
     * ---------------------------------------------------------------------
     * AJUDEIROS
     * ---------------------------------------------------------------------
     */
    {
      config: { name: 'Ajudeiros', icon: 'fa fa-life-ring fa-spin', color: '#F5AE42' },
      messages: [
        {
          name: 'Resolvido',
          help: 'Tópico marcado como resolvido pelo autor.',
          content: [
            '[table class="mod-action success"][tr][td class="icon fa fa-check"][/td][td][h4]Tópico resolvido[/h4]',
            '',
            'Movido para "Questões resolvidas".[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Abandonado c/ Solução',
          help: 'Tópico marcado como resolvido pela equipe por abandono do autor.',
          content: [
            '[table class="mod-action success"][tr][td class="icon fa fa-check"][/td][td][h4]Tópico resolvido[/h4]',
            '',
            'Tópico marcado como resolvido pela equipe por abandono do autor.[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Abandonado (5 dias) ',
          help: 'Tópico arquivado por ter 5 dias de inatividade.',
          content: [
            '[table class="mod-action warning"][tr][td class="icon fa fa-clock-o"][/td][td][h4]Tópico arquivado por inatividade[/h4]',
            '',
            'Segundo o [url=http://ajuda.forumeiros.com/t99571-]regulamento do Setor de Suporte[/url], tópicos inativos por mais de cinco dias devem ser arquivados por abandono do autor.',
            'Para saber mais, leia o regulamento do Setor de Suporte.[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Abandonado (3 dias) (JS)',
          help: 'Tópico arquivado por ser sobre JavaScript e ter 3 dias de inatividade.',
          content: [
            '[table class="mod-action warning"][tr][td class="icon fa fa-clock-o"][/td][td][h4]Tópico arquivado por inatividade[/h4]',
            '',
            'Segundo o [url=http://ajuda.forumeiros.com/t99571-]regulamento do Setor de Suporte[/url], tópicos inativos por mais de três dias que envolvam JavaScript devem ser arquivados por abandono do autor.',
            'Para saber mais, leia o regulamento do Setor de Suporte.[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Mensagens consecutivas (UP)',
          help: 'Aviso para mensagens consecutivas.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-exclamation"][/td][td][h4]Atenção![/h4]',
            '',
            'Você não pode postar mensagens consecutivas ou UP\'s antes de se completarem 24 horas desde a sua última mensagem em um tópico.',
            '',
            'Por este motivo, pedimos que leia as [url=http://ajuda.forumeiros.com/t99571-]regras do Setor de Suporte[/url] e as [url=http://ajuda.forumeiros.com/t82-]regras do Fórum dos Fóruns[/url] para não cometer novos erros.[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Tópico anulado pelo autor',
          help: 'Questão anulada a favor do autor do tópico. Será movida à lixeira por não ter conteúdo útil',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Questão anulada[/h4]',
            '',
            'Questão anulada a favor do autor do tópico. Visto que não se encontram soluções para esta questão, ela será enviada para a lixeira, tendo em vista que não será útil para outros usuários.',
            '',
            '[b][i]Tópico movido para a "Lixeira".[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Tópico/questão/fórum ilegal',
          help: 'Questão anulada por não estar de acordo com as regras do Fórum dos Fóruns',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-ban"][/td][td][h4]Questão anulada[/h4]',
            '',
            'Questão anulada e movida para a lixeira tendo em vista que não está de acordo com as normas do regulamento do Fórum dos Fóruns ou Setor de Suporte.',
            '',
            '[b][i]Tópico movido para a "Lixeira".[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Autor banido (com respostas válidas)',
          help: 'Usado para quando o autor do tópico é banido, mas foram colocada soluções válidas no tópico.',
          content: [
            '[table class="mod-action success"][tr][td class="icon fa fa-check"][/td][td][h4]Tópico resolvido[/h4]',
            '',
            'O autor do tópico foi banido, mas como apresentam-se soluções cabíveis para o problema, este tópico será arquivado.[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Autor banido (sem respostas válidas)',
          help: 'Usado para quando o autor do tópico é banido, mas não foram colocadas soluções válidas no tópico.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Tópico arquivado[/h4]',
            '',
            'Visto que o autor do tópico foi banido, este tópico será enviado para a Lixeira.[/td][/tr][/table]'
          ].join('\n')
        }
      ]
    },
    /**
     * ---------------------------------------------------------------------
     * ARTMEIROS
     * ---------------------------------------------------------------------
     */
    {
      config: { name: 'Artmeiros', icon: 'fa fa-paint-brush', color: '#787DEA' },
      messages: [
        { name: 'Teste ajrt 1', help: '1', content: 'teste aart 1!!' },
        { name: 'Teste ajrt 2', help: '2', content: 'teste aart 2!!' }
      ]
    },
    /**
     * ---------------------------------------------------------------------
     * PUBLICIDEIROS
     * ---------------------------------------------------------------------
     */
    {
      config: { name: 'Publicideiros', icon: 'fa fa-bullhorn', color: '#00B5D1' },
      messages: [
        { name: 'Teste pun 1', help: '1', content: 'teste pn 2!!' },
        { name: 'Teste pp 2', help: '2', content: 'teste pp 2!!' },
      ]
    },
    /**
     * ---------------------------------------------------------------------
     * OUTROS
     * ---------------------------------------------------------------------
     */
    {
      config: { name: 'Outros', icon: 'fa fa-reply-all', color: '#444' },
      messages: [
        {
          name: 'Sugestão aceita',
          content: [
            '[table class="mod-action success"][tr][td class="icon fa fa-check"][/td][td][h4]Sugestão aceita[/h4]',
            '',
            'Sugestão aceita e movida para "Sugestões Aceitas".[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Sugestão em estudo',
          content: [
            '[table class="mod-action"][tr][td class="icon fa fa-refresh"][/td][td][h4]Sugestão em estudo[/h4]',
            '',
            'Sugestão em estudo e movida para "Sugestões em Estudo".[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Sugestão recusada',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-times"][/td][td][h4]Sugestão recusada[/h4]',
            '',
            'Sugestão recusada e movida para "Sugestões Recusadas".[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Tópico bloqueado',
          content: '[table class="mod-action warning"][tr][td class="icon fa fa-lock"][/td][td][b]Tópico bloqueado.[/b][/td][/tr][/table]'
        },
        {
          name: 'Tópico desbloqueado',
          content: '[table class="mod-action warning"][tr][td class="icon fa fa-unlock"][/td][td][b]Tópico desbloqueado.[/b][/td][/tr][/table]'
        },
        {
          name: 'Movido para o lixo',
          help: 'Tópico movido para a lixeira.',
          content: '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][b]Tópico movido para a "Lixeira".[/b][/td][/tr][/table]'
        }
      ]
    }
  ];

  window.FA = window.FA || {};
  window.FA.Mod = window.FA.Mod || {};

  var Messages;
  /**
   * Class constructor.
   * Sets the messages and initializes the HTML generation process.
   * 
   * @class   window.FA.Mod.Messages
   * @return  {void}
   */
  window.FA.Mod.Messages = Messages = function(categories) {
    if (! $.sceditor) return;

    if (! Array.isArray(categories)) {
      throw new TypeError('The categories param must be an array. Got ' + typeof categories);
    }

    this.categories = categories;

    this.$button   = this.createButton();
    this.$dropdown = this.createDropdown();

    this.generateDropdownContent();
    this.generateStyles();
  };

  /**
   * Initializes the script and inserts the button in the editor.
   * 
   * @method    init
   * @memberof  window.FA.Mod.Messages
   * @return    {void}
   */
  Messages.prototype.init = function() {
    var self = this;

    $(function() {
    //$(window).on('load', function() {
      if (_userdata.user_level !== 1 && _userdata.user_level !== 2) return;
      if (! $.sceditor) return;

      self.$editor = self.getEditorInstance();
      self.$group  = self.createButtonGroup();
  
      /** Append the button to the group: */
      self.$button.prependTo(self.$group);
  
      /** Append the dropdown to the body: */
      self.$dropdown.appendTo('body');
  
      self.listenForEvents();
    });
  };

  /**
   * Creates the button's markup.
   * 
   * @method    createButton
   * @memberof  window.FA.Mod.Messages
   * @return    {object}
   */
  Messages.prototype.createButton = function() {
    var $div = $('<div>', {
      'text': 'Mensagens moderativas'
    }).css('background-image', 'url(https://i39.servimg.com/u/f39/18/21/41/30/tuto14.png)');

    return $('<a>', {
      'class': 'sceditor-button sceditor-mod-messages-button',
      'title': 'Mensagens moderativas da equipe',
      'html': $div.prop('outerHTML')
    });
  };

  /**
   * Creates the dropdown's markup.
   * 
   * @method    createButton
   * @memberof  window.FA.Mod.Messages
   * @return    {object}
   */
  Messages.prototype.createDropdown = function() {
    return $([
      '<div class="sceditor-dropdown fa-messages-dropdown">',
      '</div>'
    ].join('')).hide();
  };

  /**
   * Creates the dropdown's buttons.
   * 
   * @method    generateDropdownContent
   * @memberof  window.FA.Mod.Messages
   * @return    {object}
   */
  Messages.prototype.generateDropdownContent = function() {
    var self = this;

    $.each(self.categories, function(index, category) {
      if (! category.config || ! category.config.name || ! category.messages) return;

      var $category = $([
        '<div class="fa-messages-dropdown-category">',
        '  <label class="fa-messages-label"></label>',
        '  <div class="fa-messages-zone" style="display: none;"></div>',
        '</div>'
      ].join(''));

      $category.find('.fa-messages-label').html([
        $('<i>', { 'class': category.config.icon || '' }).prop('outerHTML'),
        $('<span>', { 'text': category.config.name }).prop('outerHTML'),
      ].join('')).css('color', category.config.color || '#39c');

      $.each(category.messages, function(index, message) {
        if (! message.content || ! message.name) return;

        $('<a>', {
          'data-message': message.content,
          'title': message.help || message.name,
          'class': 'message-insert-trigger',
          'text': message.name,
        }).appendTo($category.find('.fa-messages-zone'));
      });

      self.$dropdown.append($category);
    });
  };

  /**
   * Gets the sceditor instance and returns it.
   * 
   * @method    getEditorInstance
   * @memberof  window.FA.Mod.Messages
   * @return    {object}
   */
  Messages.prototype.getEditorInstance = function() {
    return $('#text_editor_textarea').sceditor('instance');
  };

  /**
   * Creates (or get) the group element and then returns it.
   * 
   * @method    createButtonGroup
   * @memberof  window.FA.Mod.Messages
   * @return    {object}
   */
  Messages.prototype.createButtonGroup = function() {
    if (!! $('.fa-mod-actions-group-sceditor-group').length) {
      return $('.fa-mod-actions-group-sceditor-group');
    }

    return $('<div>', {
      'class': 'sceditor-group fa-mod-actions-group-sceditor-group'
    }).insertAfter('.sceditor-group:last');
  };

  /**
   * Listen to the events.
   * 
   * @method    listenForEvents
   * @memberof  window.FA.Mod.Messages
   * @return    {void}
   */
  Messages.prototype.listenForEvents = function() {
    var self = this;

    /** Hide dropdown by document: */
    $(document).on('click', function(event) {
      if (self.$dropdown.is(':hidden')) return;

      event.preventDefault();
      self.$dropdown.hide();
    });

    /** Stop propagation from the dropdown: */
    this.$dropdown.on('click', function(event) {
      event.stopPropagation();
    });

    /** Show/hide the dropdown: */
    this.$button.on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      self.$dropdown
        .css('left', self.$button.offset().left)
        .css('top', self.$button.offset().top + 2);

      self.$dropdown.toggle();
    });

    /** Toggle categories: */
    this.$dropdown.find('.fa-messages-label').on('click', function() {
      self.$dropdown.find('.fa-messages-zone').not($(this).next('.fa-messages-zone')).hide();
      $(this).next('.fa-messages-zone').toggle();
    });

    /** Insert messages: */
    this.$dropdown.find('.message-insert-trigger[data-message]').on('click', function() {
      var message = $(this).attr('data-message');
      self.$editor.insertText(message);

      self.$dropdown.hide();
      self.$dropdown.find('.fa-messages-zone').hide();
    });
  };

  Messages.prototype.generateStyles = function() {
    $('<style>', { 'text': [
      '.fa-messages-dropdown,',
      '.fa-messages-dropdown * {',
      '  box-sizing: border-box;',
      '}',
      '',
      '.fa-messages-dropdown {',
      '  padding: 0 !important;',
      '  z-index: 10 !important;',
      '  overflow:  hidden !important;',
      '  border: solid 1px #ccc !important;',
      '  width: 200px;',
      '}',
      '',
      '.fa-messages-dropdown .fa-messages-label {',
      '  padding: 8px 10px;',
      '  font-size: 11px;',
      '  font-weight: bold;',
      '  cursor: pointer;',
      '  background-color: #fff;',
      '  border-bottom: solid 1px #ccc;',
      '}',
      '',
      '.fa-messages-dropdown .fa-messages-label:last-child {',
      '  border-bottom: none;',
      '}',
      '',
      '.fa-messages-dropdown .fa-messages-label:hover {',
      '  background-color: #eee;',
      '}',
      '',
      '.fa-messages-dropdown .fa-messages-label > i.fa {',
      '  font-size: 14px;',
      '  margin-right: 5px;',
      '  width: 20px;',
      '  text-align: center;',
      '}',
      '',
      '.fa-messages-dropdown .fa-messages-zone {',
      '  border-bottom: 1px solid #CCC;',
      '  max-height: 120px;',
      '  overflow-y: auto;',
      '}',
      '',
      '.fa-messages-dropdown .fa-messages-zone > a {',
      '  padding: 8px 10px;',
      '  display: block;',
      '  cursor: pointer;',
      '  color: #555;',
      '}'
    ].join('\n') }).appendTo('head');
  };

  (new window.FA.Mod.Messages(categories)).init();
})(jQuery);
