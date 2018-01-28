/*globals jQuery, _userdata*/

/**
 *! Inserir ícones de tópicos acima do editor.
 *
 *  Este script é parte do Fórum dos Fóruns.
 *  Não está autorizada nenhuma cópia sem a autorização
 *  prévia da administração.
 */

(function ($, css) {
  'use strict';

  var icons = [
    { img: 'https://i.imgur.com/NfiDTCN.png', id: 1 }, // Em curso
    { img: 'https://i.imgur.com/N0UIwZW.png', id: 4 }, // Resolvido
    { img: 'https://i.imgur.com/pj3DCqm.png', id: 3 }, // Único
    { img: 'https://i.imgur.com/GzcpwZV.png', id: 2 }, // Admin
    { img: 'https://i.imgur.com/N4VLo0E.png', id: 6 }, // Astúcia
    { img: 'https://i.imgur.com/xTLc0mS.png', id: 11 }, // Aceito
    { img: 'https://i.imgur.com/v0PhT6I.png', id: 10 }, // Recusado
    { img: 'https://i.imgur.com/9yStjvf.png', id: 5 } // Importante
  ];

  $(function () {
    /**
     * Parar a execução do script caso o usuário
     * não seja um moderador ou administrador do
     * fórum.
     */
    if (_userdata.user_level !== 1 && _userdata.user_level !== 2) {
      return;
    }

    /**
     * Criar um wrapper para os ícones.
     */
    var $div = $('<div>');

    /**
     * Criar o label para nenhum ícone.
     */
    $div.html([
      '<label>',
      '  <input type="radio" name="post_icon" value="0">',
      '  <span class="fa-post-icon-label">Nenhum</span>',
      '</label>'
    ].join('\n'));

    /**
     * Iterar sobre todos os ícones do array,
     * populando o wrapper de ícones.
     */
    $.each(icons, function (index, icon) {
      /**
       * Criando o label.
       */
      var $label = $('<label>');

      /**
       * Criar o radio button do ícone para o label.
       */
      $('<input />')
        .attr('type', 'radio')
        .attr('name', 'post_icon')
        .attr('value', icon.id)
        .appendTo($label)
      ;

      /**
       * Inserir o ícone da iteração atual
       * no wrapper.
       */
      $label
        .css('background-image', 'url("' + icon.img + '")')
        .addClass('fa-post-icon')
        .appendTo($div)
      ;
    });

    /**
     * Inserir o wrapper de ícones acima
     * do editor de texto.
     */
    $div
      .addClass('fa-post-icons-wrapper')
      .prependTo('#quick_reply')
    ;

    /**
     * Inserir os estilos.
     */
    $('<style>')
      .text(css.join('\n'))
      .appendTo('head')
    ;
  });
}(jQuery, [
  '/**',
  ' * Estilos para os ícones',
  ' * de mensagens.',
  ' */',
  '',
  '.fa-post-icons-wrapper {',
  '  text-align: center;',
  '  margin: 10px auto 20px auto;',
  '  width: 70%;',
  '  line-height: 50px;',
  '}',
  '',
  '.fa-post-icons-wrapper .fa-post-icon {',
  '  position: relative;',
  '  display: inline-block;',
  '  width: 100px;',
  '  height: 30px;',
  '  background-size: 90px;',
  '  background-repeat: no-repeat;',
  '  background-position: right center;',
  '  vertical-align: middle;',
  '  margin-left: 13px;',
  '}',
  '',
  '.fa-post-icons-wrapper > label:first-child {',
  '  margin-right: -10px;',
  '}',
  '',
  '.fa-post-icons-wrapper .fa-post-icon input {',
  '  position: absolute;',
  '  top: 50%;',
  '  left: 0;',
  '  transform: translateY(-50%);',
  '}'
]));
