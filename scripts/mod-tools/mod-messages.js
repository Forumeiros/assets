/*globals jQuery*/

/**
 * Create a messages button for the sceditor.
 *
 * @author   Luiz Felipe F.
 * @see      https://lffg.github.io
 * @version  2.0.1
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
        {
          name: 'Pedido resolvido',
          content: [
            '[table class="mod-action art"][tr][td class="icon fa fa-check"][/td][td][h4]Pedido finalizado[/h4]',
            '',
            'Pedido finalizado e membro satisfeito! [b]Tópico movido para "Pedidos Finalizados".[/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Fórum recente (< 14 dias)',
          help: 'Para fóruns que não tenham, no mínimo, 14 dias de "vida".',
          content: [
            '[table class="mod-action art"][tr][td class="icon fa fa-flag"][/td][td][h4]Fórum recente[/h4]',
            '',
            'Seu fórum foi criado a menos de 14 dias. E, de acordo com as regras, até que ele possua o período de tempo estipulado, seu tópico permanecerá trancado.',
            '[size=10]Nota: O pedido será liberado em < DATA_DA_LIBERAÇÃO >.[/size]',
            '',
            'Aconselhamos também a leitura atenta das [url=http://ajuda.forumeiros.com/t32850-]regras do Setor Gráfico[/url].',
            '',
            '[i][b]Tópico pendente.[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Pedido cancelado pelo autor (com propostas)',
          help: 'Usado para quando um pedido for cancelado a pedido do autor mas tiver propostas.',
          content: [
            '[table class="mod-action art"][tr][td class="icon fa fa-archive"][/td][td][h4]Tópico arquivado[/h4]',
            '',
            'A pedido do autor, este pedido gráfico foi cancelado. No entanto, com a existência de respostas sob a forma de imagens, o tópico será movido para os arquivos de pedidos finalizados para que o autor deste mesmo tópico (ou outros membros) possam apreciar as sugestões e utilizá-las nos seus fóruns.',
            '',
            '[i][b]Tópico movido para "Pedidos Finalizados".[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Pedido cancelado pelo autor (sem propostas)',
          help: 'Usado para quando um pedido for cancelado a pedido do autor mas NÃO tiver propostas.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Pedido cancelado[/h4]',
            '',
            'A pedido do autor, este pedido gráfico foi cancelado.',
            '',
            '[i][b]Tópico movido para a "Lixeira".[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Pedido cancelado (abandonado) (com propostas)',
          help: 'Usado para tópicos abandonados por mais de 2 dias mas que tenham propostas.',
          content: [
            '[table class="mod-action art"][tr][td class="icon fa fa-archive"][/td][td][h4]Tópico arquivado[/h4]',
            '',
            'Pedido finalizado após uma data igual ou superior a 2 dias sem respostas. No entanto, com a existência de respostas sob a forma de imagens, o tópico será movido para os pedidos finalizados para que o autor deste mesmo tópico (ou outros membros) possam apreciar as sugestões e utilizá-las nos seus fóruns.',
            '',
            '[i][b]Tópico movido para "Pedidos Finalizados".[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Pedido cancelado (abandonado) (sem propostas)',
          help: 'Usado para tópicos abandonados por mais de 2 dias mas que NÃO tenham recebido propostas.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Pedido cancelado[/h4]',
            '',
            'Pedido cancelado após uma data igual ou superior a 2 dias sem respostas do autor.',
            '',
            '[b]Tópico movido para a "Lixeira".[/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Autor banido (com propostas)',
          help: 'Usado para quando o autor do tópico for banido, mas o pedido tiver propostas',
          content: [
            '[table class="mod-action art"][tr][td class="icon fa fa-archive"][/td][td][h4]Tópico arquivado[/h4]',
            '',
            'Dado que o autor encontra-se atualmente banido, este pedido gráfico foi cancelado. No entanto, com a existência de respostas sob a forma de imagens, o tópico será movido para os pedidos finalizados para que o autor deste mesmo tópico (ou outros membros) possam apreciar as sugestões e utilizá-las nos seus fóruns.',
            '',
            '[i][b]Tópico movido para "Pedidos Finalizados".[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Autor banido (sem propostas)',
          help: 'Usado para quando o autor do tópico for banido e NÃO tiverem propostas',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Pedido cancelado[/h4]',
            '',
            'Dado que o autor do tópico encontra-se atualmente banido, este pedido gráfico foi cancelado.',
            '',
            '[i][b]Tópico movido para a "Lixeira".[/b][/i][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Formulário (pedido) incompleto',
          help: 'Usado para tópicos em que o formulário não foi completo.',
          content: [
            '[table class="mod-action warning"][tr][td class="icon fa fa-question"][/td][td][h4]Pedido incompleto[/h4]',
            '',
            'O formulário do seu pedido gráfico está incompleto. Para que possamos avançar, é necessário que todos os campos sejam devidamente preenchidos. Salientamos que o(a) senhor(a) terá dois dias para completar o pedido. Caso isso não ocorra, seu tópico será descartado.',
            '',
            '[b]Em seu pedido está faltando:[/b] < Indicar o que falta, por exemplo: Link do fórum >',
            '',
            'Aconselhamos também a leitura atenta das [url=http://ajuda.forumeiros.com/t32850-]regras do Setor Gráfico[/url].',
            '',
            '[b][i]Tópico pendente.[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Duplo pedido',
          help: 'Só é permitido um pedido por vez.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Pedido cancelado[/h4]',
            '',
            'Lamentamos o inconveniente, mas só é possível ter um pedido por vez para um mesmo fórum na área de criações gráficas. E foi constatado que existe(m) outro(s) tópico(s) no setor gráfico para este mesmo fórum. Sendo assim, pedimos que aguarde pela resolução do tópico mais antigo e que depois crie um novo.',
            '',
            '[b][i]Tópico movido para a "Lixeira".[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Setor incorreta (suporte à códigos)',
          help: 'Para tópicos que pedem suporte no setor gráfico',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-code"][/td][td][h4]Setor incorreto[/h4]',
            '',
            'Dúvidas referentes a aparência do fórum ou sobre códigos para ele, devem ser tratadas no setor de suporte específicos, uma vez que esta área é exclusiva para as Criações Gráficas para usuários Forumeiros. Assim sendo o seu tópico será descartado.',
            '',
            'Aconselhamos você a criar um tópico no [url=http://ajuda.forumeiros.com/c3-]Setor de Suporte[/url].',
            '',
            '[b][i]Tópico movido para a "Lixeira".[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Pedido muito avançado',
          content: [
            '[table class="mod-action art"][tr][td class="icon fa fa-info"][/td][td][h4]Pedido muito avançado[/h4]',
            '',
            'O seu pedido é composto por uma animação avançada. Sendo que a nossa equipe é voluntária e não é especializada nesse tipo de programas e/ou formatos, é possível que o seu pedido não seja atendido. Por isso, recomendamos que edite o seu pedido e peça uma animação simples para que nossa equipe possa chegar em um resultado aproximado do desejado.',
            '',
            'Você tem toda a liberdade de escolher se deseja ou não permanecer com o tópico do modo que está. Mas saiba que se o tópico não for alterado, terá somente 2 dias para ser atendido. Se não for atendido nesse prazo, o seu pedido será cancelado.',
            '',
            '[b][i]Tópico pendente.[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Fórum ilegal',
          help: 'Para tópicos em que o fórum não cumpre as CGU\'s.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Pedido cancelado[/h4]',
            '',
            'Lamento, mas o seu fórum contém conteúdos ilícitos e não respeita as [url=https://www.forumeiros.com/condicoes-gerais]Condições Gerais de Utilização[/url] do serviço Forumeiros. Por esse motivo, o seu pedido não será atendido.',
            '',
            '[b][i]Tópico movido para a "Lixeira".[/i][/b][/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Fórum não-Forumeiros',
          help: 'Para tópicos em que o fórum não é da Forumeiros.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-trash-o"][/td][td][h4]Pedido cancelado[/h4]',
            '',
            'Como o fórum posto no formulário não pertence ao serviço Forumeiros.com, este tópico está sendo descartado.',
            '',
            '[b][i]Tópico movido para a "Lixeira".[/i][/b][/td][/tr][/table]'
          ].join('\n')
        }
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
        {
          name: 'Análise em curso',
          help: 'Usada para análises que foram aceitas e que estão sendo feitas.',
          content: [
            '[table class="mod-action pub"][tr][td class="icon fa fa-refresh"][/td][td][h4]Análise em curso[/h4]',
            '',
            'O fórum será analisado e o resultado será postado em um prazo aceitável, baseado em minha disponibilidade. Antes de tudo, vale ressaltar que pedindo uma análise, você leu e concordou com as [url=http://ajuda.forumeiros.com/t49717-]regras do setor de análises[/url].[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Análise concluída',
          help: 'Usado para anunciar que a análise foi concluída.',
          content: [
            '[table class="mod-action pub"][tr][td class="icon fa fa-check"][/td][td][h4]Análise concluída[/h4]',
            '',
            'A sua análise foi concluída. Você pode conferir na [url=http://ajuda.forumeiros.com/f6-]lista de análises concluídas[/url].[/td][/tr][/table]'
          ].join('\n')
        },
        {
          name: 'Análise recusada',
          help: 'Mensagem que deve ser usada quando uma análise é recusada.',
          content: [
            '[table class="mod-action danger"][tr][td class="icon fa fa-ban"][/td][td][h4]Análise recusada[/h4]',
            '',
            'Baseando-se nas [url=http://ajuda.forumeiros.com/t49717-]regras do setor de análises[/url], a sua análise foi recusada pelo seguinte motivo:',
            '',
            '  < Motivo >',
            '',
            '[i][b]Tópico movido para a "Lixeira".[/b][/i][/td][/tr][/table]'
          ].join('\n')
        }
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
    if (_userdata.user_level !== 1 && _userdata.user_level !== 2) return;
    if (! $.sceditor) return;

    this.$editor = this.getEditorInstance();
    this.$group  = this.createButtonGroup();

    /** Append the button to the group: */
    this.$button.prependTo(this.$group);

    /** Append the dropdown to the body: */
    this.$dropdown.appendTo('body');

    this.listenForEvents();
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
    }).css('background-image', 'url(https://i.imgur.com/2JqY8il.png)');

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
        .css('top', self.$button.offset().top + 1);

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
  
  // The editor is only available when the page is loaded.
  $(window).on('load', function() {
    (new window.FA.Mod.Messages(categories)).init();
  });
})(jQuery);
