/*globals jQuery, _userdata*/

/**
 *! Completar automaticamente o histórico de advertências.
 *
 *  Este script é parte do Fórum dos Fóruns.
 *  Não está autorizada nenhuma cópia sem a autorização
 *  prévia da administração.
 */
 
(function ($) {
  'use strict';

  var field = '#profile_field_2_-20';

  $(function () {
    /**
     * Escutar pelo evento de focus no campo.
     */
    $('body').on('focus', field, function () {
      var $this = $(this);

      /**
       * Conteúdo que será colocado dinâmicamente
       * no campo escolhido. Os parâmetros:
       *
       *     day | month | year | username
       *
       */
      var content = '{{day}}/{{month}}/{{year}} - ([b]{{username}}[/b]) : ';
      var regex   = '{{day}}/{{month}}/{{year}} - \\(\\[b\\]{{username}}\\[/b\\]\\) : ';

      /**
       * Parâmetros que serão substituídos.
       */
      var replace = {
        day     : (new Date()).getDate().toString(),
        month   : ((new Date()).getMonth() + 1).toString(),
        year    : (new Date()).getFullYear().toString().replace(/^\d{2}/, ''),
        username: _userdata.username
      };

      /**
       * Iterar sobre o objeto a fim de substituir os parâmetros
       * pelo seu respectivo valor, de maneira dinâmica.
       */
      $.each(replace, function (key, value) {
        content = content.replace(new RegExp('{{' + key + '}}', 'gi'), value);
        regex   = regex.replace(new RegExp('{{' + key + '}}', 'gi'), value);
      });

      /**
       * Caso a caixa esteja vazia, insira somente
       * o conteúdo, sem quebras de linha.
       */
      if (!$this.val().length) {
        $this.val(content);
        return;
      }

      /**
       * Testar usando a expressão regular,
       * a fim de evitar inserções desnecessárias.
       */
      if ((new RegExp(regex + '[\\n\\s]*$')).test($this.val())) {
        return;
      }

      /**
       * Inserir quebras de linha, caso
       * houver necessidade.
       */
      $this.val($this.val() + '\n' + content);
    });
  });
}(jQuery));
