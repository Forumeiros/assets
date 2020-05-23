/*
 *! Form Generator v2.0 Code.
 *
 * Developed by Luiz Felipe Gonçalves <https://luizfelipe.dev>
 * Translated by Chanp <https://ajuda.forumeiros.com/u64199>
 *
 * All Forumotion Support Forums may use this code.
 * DO NOT REDISTRIBUTE OR EDIT WITHOUT THE AUTHOR'S CONSENT.
 *
 * Do not modify the origin of any script or style sheet without contacting
 * the generator's author (Luiz Felipe Gonçalves - https://luizfelipe.dev/).
 *
 * Copyright (c) Luiz Felipe Gonçalves. 2017-current.
 */

/*globals jQuery, Clipboard*/

(function ($) {
  'use strict';

  /**
   * Variáveis globais do script:
   */
  var $addField, $editField;
  var number = 0;

  $(function () {

    /**
     *! BEGIN PARTE 1 !
     */
    var $zone = $('.entry-prev');
    var $table = $('.presets-table table');

    /**
     * Cria o modal e o overlay (para gerar um novo campo):
     * @role Criação de HTML.
     */
    function addField () {
      /**
       * HTML do modal de criação do novo campo:
       */
      $addField = $([
        '<div class="modal-wrap">',
        '  <div class="modal add-field">',
        '    <h3>Scegli il tipo del nuovo campo</h3>',
        '    <p class="part-obs">Scegli il tipo del nuovo campo che desideri creare:</p>',
        '    <form class="field-types" id="radio-select-input-type">',
        '      <div class="modal-padding">',
        '        <div class="radio-group">',
        '          <input type="radio" id="text-input" value="text" name="in-type" required />',
        '          <label for="text-input">Input di testo</label>',
        '        </div>',
        '        <div class="radio-group">',
        '          <input type="radio" id="textarea-input" value="textarea" name="in-type" required />',
        '          <label for="textarea-input">Zona di testo</label>',
        '        </div>',
        '        <div class="radio-group">',
        '          <input type="radio" id="date-input" value="date" name="in-type" required />',
        '          <label for="date-input">Input data</label>',
        '        </div>',
        '        <div class="radio-group">',
        '          <input type="radio" id="color-input" value="color" name="in-type" required />',
        '          <label for="color-input">Input di colore</label>',
        '        </div>',
        '        <div class="radio-group">',
        '          <input type="radio" id="number-input" value="number" name="in-type" required />',
        '          <label for="number-input">Input numerico</label>',
        '        </div>',
        '        <div class="radio-group">',
        '          <input type="radio" id="select-u-input" value="selectU" name="in-type" required />',
        '          <label for="select-u-input">Input di selezione unica</label>',
        '        </div> ',
        '        <div class="radio-group">',
        '          <input type="radio" id="select-m-input" value="selectM" name="in-type" required />',
        '          <label for="select-m-input">Input di selezione multipla</label>',
        '        </div>',
        '        <hr class="pa-1-hr" />',
        '        <div class="radio-group">',
        '          <input type="radio" id="add-subtitle" value="subtitle" name="in-type" required />',
        '          <label for="add-subtitle">Sottotitolo di sessione</label>',
        '        </div>',
        '        <div class="radio-group">',
        '          <input type="radio" id="add-paragraph" value="exp-paragraph" name="in-type" required />',
        '          <label for="add-paragraph">Paragrafo esplicativo</label>',
        '        </div>',
        '      </div>',
        '',
        '      <footer class="form-footer">',
        '        <button type="submit" id="radio-to-continue">Continua</button>',
        '        <a href="javascript:void(0)" class="close-modal">Chiudi</a>',
        '      </footer>',
        '    </form>',
        '  </div>',
        '  <div class="modal-overlay"></div>',
        '</div>',
      ].join('\n'))
        .appendTo('body')
      ;

      /**
       * Trigger para fechar o modal ao clicar no overlay ou no link de fechar:
       * @role Trigger.
       */
      $addField
        .find('.modal-overlay, .close-modal')
          .on('click', closeModal)
      ;

      /**
       * Criação de cada tipo de input, com base no seu tipo:
       * @role Trigger
       */
      $addField
        .find('#radio-select-input-type')
          .on('submit', function (event) {
            event.preventDefault();

            var inputType = $('[name="in-type"]:checked').val();
            generate(inputType);
          })
      ;
    }

    /**
     * Função para editar um campo,
     * tanto como posição, quanto como seus atributos.
     */
    function editField () {
      var $this = $('#edit-field');

      if ($zone.find('.fa-form-group').length === 0 && $this.find('i').is('.fa-pencil')) {
        alert('Devi creare almeno un input prima di modificarli.');
        return;
      }

      if ($this.find('i').is('.fa-check')) {
        $this
          .find('i.fa')
            .removeClass('fa-check')
              .addClass('fa-pencil')
                .attr('title', 'Fai clic qui per modificare un campo già creato.')
        ;

        $this
          .parents('.edit-section')
            .find('i.fa-plus, i.fa-minus')
              .show()
        ;

        $zone
          .find('.input-edit-trigger')
            .remove()
        ;

        $zone
          .find('.input-edit-trigger')
            .remove()
        ;

        $zone
          .find('.fa-move-trigger')
            .remove()
        ;

        return false;
      }

      $this
        .find('i.fa')
          .removeClass('fa-pencil')
            .addClass('fa-check')
              .attr('title', 'Fai clic qui per salvare le modifiche.')
      ;

      $this
        .parents('.edit-section')
          .find('i.fa-plus, i.fa-minus')
            .hide()
      ;

      $zone
        .find('.fa-form-group')
          .append('<i class="fa fa-pencil-square input-edit-trigger"></i>')
      ;

      /**
       * Trigger para abrir o modal de edição:
       * @role Trigger
       */
      $zone
        .find('.input-edit-trigger')
          .on('click', function () {

            var $this = $(this);
            var $parent = $this.parents('.fa-form-group');

            var inType = $parent.find('input').attr('type');

            if (!inType) {
              inType = $parent.find('textarea, select, .data-text').prop('tagName').toLowerCase();
            }

            console.log('Tipo: ' + inType);

            var label = $parent.find('label').text();
            var placeholder = $parent.find('input, textarea, select').attr('placeholder');
            var required = $parent.find('input, textarea, select').prop('required');
            var requiredCheckbox;

            if (required) {
              requiredCheckbox = '<input type="checkbox" id="is-required-modal" checked />';
            } else {
              requiredCheckbox = '<input type="checkbox" id="is-required-modal" />';
            }

            $editField = $([
              '<div class="modal-wrap">',
              '  <div class="modal edit-field">',
              '    <h3>Modifica il campo...</h3>',
              '    <p class="part-obs">Modifica gli attributi del campo selezionato qui sotto:</p>',
              '    <form id="atributes-edition">',
              '      <div class="modal-padding">',
              '        <div class="form-group">',
              '          <label for="edit-input-label">Label:</label>',
              '          <input id="edit-input-label" value="' + label + '" required />',
              '        </div>',
              '        <div class="form-group placeholder-edit">',
              '          <label for="edit-input-placeholder">Placeholder:</label>',
              '          <input id="edit-input-placeholder" value="' + placeholder + '" />',
              '        </div>',
              '        <div class="form-group required-check">',
              '          <label for="is-required-modal">Obbligatorio?</label>',
              '          ' + requiredCheckbox,
              '          <label for="is-required-modal" class="pseudo-checkbox-edition"></label>',
              '        </div>',
              '      </div>',
              '      <footer class="form-footer">',
              '        <button type="submit" id="edit-finish">Salva</button>',
              '        <a href="javascript:void(0)" class="close-modal">Chiudi</a>',
              '      </footer>',
              '    </form>',
              '  </div>',
              '  <div class="modal-overlay"></div>',
              '</div>',
            ].join('\n'))
              .appendTo('body')
            ;

            if (inType === 'date' || inType === 'color' || inType === 'select') {
              $('.placeholder-edit').remove();
            }

            if (inType === 'color') {
              $('.required-check').remove();
            }

            if (inType === 'number') {

              var maxLgt = $parent.find('input[type="number"]').attr('max');
              var minLgt = $parent.find('input[type="number"]').attr('min');

              $editField = $([
                '<div class="modal-wrap">',
                '  <div class="modal edit-field">',
                '    <h3>Modifica il campo...</h3>',
                '    <p class="part-obs">Modifica gli attributi del campo selezionato qui sotto:</p>',
                '    <form id="atributes-edition">',
                '      <div class="modal-padding">',
                '        <div class="form-group">',
                '          <label for="edit-input-label">Label:</label>',
                '          <input id="edit-input-label" value="' + label + '" required />',
                '        </div>',
                '        <div class="form-group placeholder-edit">',
                '          <label for="edit-input-placeholder">Placeholder:</label>',
                '          <input id="edit-input-placeholder" value="' + placeholder + '" />',
                '        </div>',
                '        <div class="form-group">',
                '          <label for="edit-input-max">Valore massimo di input:</label>',
                '          <input type="text" id="edit-input-max" value="' + maxLgt + '" />',
                '        </div>',
                '        <div class="form-group">',
                '          <label for="edit-input-min">Valore minimo di input:</label>',
                '          <input type="text" id="edit-input-min" value="' + minLgt + '" />',
                '        </div>',
                '        <div class="form-group required-check">',
                '          <label for="is-required-modal">Obbligatorio?</label>',
                '          ' + requiredCheckbox,
                '          <label for="is-required-modal" class="pseudo-checkbox-edition"></label>',
                '        </div>',
                '      </div>',
                '      <footer class="form-footer">',
                '        <button type="submit" id="edit-finish">Salva</button>',
                '        <a href="javascript:void(0)" class="close-modal">Chiudi</a>',
                '      </footer>',
                '    </form>',
                '  </div>',
                '  <div class="modal-overlay"></div>',
                '</div>',
              ].join('\n'))
                .appendTo('body')
              ;
            }

            if (inType === 'p' || inType === 'h4') {

              if ($('.modal-wrap').length > 0) {
                $('.modal-wrap').remove();
              }

              var expText = $parent.find('.data-text').text();

              $editField = $([
                '<div class="modal-wrap">',
                '  <div class="modal edit-field">',
                '    <h3>Modifica il testo...</h3>',
                '    <p class="part-obs">Completa i campi sottostanti:</p>',
                '    <form id="atributes-edition">',
                '      <div class="modal-padding">',
                '        <div class="form-group">',
                '          <label for="edit-field-text">Testo:</label>',
                '          <input id="edit-field-text" value="' + expText + '" required />',
                '        </div>',
                '      </div>',
                '      <footer class="form-footer">',
                '        <button type="submit" id="edit-finish">Salva</button>',
                '        <a href="javascript:void(0)" class="close-modal">Chiudi</a>',
                '      </footer>',
                '    </form>',
                '  </div>',
                '  <div class="modal-overlay"></div>',
                '</div>',
              ].join('\n'))
                .appendTo('body')
              ;

              $editField
                .find('#atributes-edition')
                  .on('submit', function (event) {
                    event.preventDefault();

                    var $form = $(this);
                    var editedText = $form.find('#edit-field-text').val();

                    $parent.find('.data-text').text(editedText);

                    closeModal();
                  })
              ;

              $editField
                .find('.modal-overlay, .close-modal')
                  .on('click', closeModal)
              ;

              return;
            }

            if (inType === 'select') {
              $editField = $([
                '<div class="modal-wrap">',
                '  <div class="modal edit-field">',
                '    <h3>Modifica il campo...</h3>',
                '    <p class="part-obs">Modifica gli attributi del campo selezionato qui sotto:</p>',
                '    <form id="atributes-edition">',
                '      <div class="modal-padding">',
                '        <div class="form-group">',
                '          <label for="edit-input-label">Label:</label>',
                '          <input id="edit-input-label" value="' + label + '" required />',
                '        </div>',
                '        <div class="form-group">',
                '          <label for="edit-vals-select">Valori:</label>',
                '          <textarea id="edit-vals-select" class="fa-valores" required></textarea>',
                '        </div>',
                '        <div class="form-group required-check">',
                '          <label for="is-required-modal">Obbligatorio?</label>',
                '          ' + requiredCheckbox,
                '          <label for="is-required-modal" class="pseudo-checkbox-edition"></label>',
                '        </div>',
                '      </div>',
                '      <footer class="form-footer">',
                '        <button type="submit" id="edit-finish">Salva</button>',
                '        <a href="javascript:void(0)" class="close-modal">Chiudi</a>',
                '      </footer>',
                '    </form>',
                '  </div>',
                '  <div class="modal-overlay"></div>',
                '</div>',
              ].join('\n'))
                .appendTo('body')
              ;

              var $opt = $parent.find('select option');
              $opt.each(function () {

                var $this = $(this);
                var optText = $this.text();

                if ($this.is(':last-child')) {
                  $('#edit-vals-select').text($('#edit-vals-select').text() + optText);
                  return;
                }

                $('#edit-vals-select').text($('#edit-vals-select').text() + optText + '\n');
              });
            }

            $editField
              .find('#atributes-edition')
                .on('submit', function (event) {
                  event.preventDefault();

                  var $form = $(this);
                  var editedLabel = $form.find('#edit-input-label').val();
                  var editedPlaceholder = $form.find('#edit-input-placeholder').val();
                  var editedRequiredStatus = $form.find('#is-required-modal').prop('checked');

                  $parent.find('label').text(editedLabel);
                  $parent.find('input, textarea').attr('placeholder', editedPlaceholder);

                  if (inType === 'number') {
                    var editedMax = $form.find('#edit-input-max').val();
                    var editedMin = $form.find('#edited-input-min').val();

                    $parent.find('input').attr('max', editedMax);
                    $parent.find('input').attr('min', editedMin);
                  }

                  if (inType === 'select') {

                    $parent
                      .find('select option')
                        .remove()
                    ;

                    var editedVals = $editField.find('#edit-vals-select').val().split('\n');
                    $.each(editedVals, function (index, text) {

                    	var reg = /\S/gi;
                    	if (!reg.test(text)) {
                    		return;
                      }

                      $parent
                        .find('select')
                          .append('<option value="' + text + '">' + text + '</option>\n');
                    });
                  }

                  if (editedRequiredStatus) {
                    $parent.find('input, textarea, select').attr('required', 'required');
                  } else {
                    $parent.find('input, textarea, select').removeAttr('required');
                  }

                  closeModal();
                })
            ;

            /**
             * Trigger para fechar o modal ao clicar no overlay ou no link de fechar:
             * @role Trigger.
             */
            $editField
              .find('.modal-overlay, .close-modal')
                .on('click', closeModal)
            ;

          })
      ;

      /**
       * Criação dos botões de edição
       * para subir ou descer um grupo de input.
       */
      var $group = $zone.find('.fa-form-group');
      $group.each(function () {
        var $this = $(this);

        $this.append([
          '<i class="fa fa-angle-up fa-move-trigger fa-move-to-top"></i>',
          '<i class="fa fa-angle-down fa-move-trigger fa-move-to-bottom"></i>',
        ].join('\n'));
      });

      /**
       * Trigger dos botões para subir ou descer um grupo de input.
       */
      $zone
        .find('.fa-move-to-top')
          .on('click', function () {

            var $this = $(this);
            var $group = $this.parents('.fa-form-group');

            $group
              .insertBefore($this.parents('.fa-form-group').prev())
            ;

          })
      ;

      $zone
        .find('.fa-move-to-bottom')
          .on('click', function () {

            var $this = $(this);
            var $group = $this.parents('.fa-form-group');

            $group
              .insertAfter($this.parents('.fa-form-group').next())
            ;

          })
      ;

      $zone
        .find('.fa-move-trigger, .input-edit-trigger')
          .on({
            mouseenter: function () {
              $(this)
                .closest('.fa-form-group')
                  .attr('style', [
                    '-webkit-box-shadow: inset 0 0 30px -9px rgb(0, 0, 0);',
                    '-moz-box-shadow: inset 0 0 30px -9px rgb(0, 0, 0);',
                    '-ms-box-shadow: inset 0 0 30px -9px rgb(0, 0, 0);',
                    '-o-box-shadow: inset 0 0 30px -9px rgb(0, 0, 0);',
                    'box-shadow: inset 0 0 30px -9px rgb(0, 0, 0);',
                  ].join(' '))
              ;
            },

            mouseleave: function () {
              $(this)
                .closest('.fa-form-group')
                  .removeAttr('style')
              ;
            },

            click: function () {
              setTimeout(function () {
                $(this)
                  .closest('.fa-form-group')
                    .removeAttr('style')
                ;
              }, 800);
            }
          })
      ;

    }

    /**
     * Função para remover um grupo de input.
     */
    function removeField () {
      var $this = $('#remove-field');

      if ($zone.find('.fa-form-group').length === 0 && $this.find('i').is('.fa-minus')) {
        alert('Devi creare almeno un input prima di modificarne uno!');
        return;
      }

      if ($this.find('i').is('.fa-check')) {
        $this
          .find('i.fa')
            .removeClass('fa-check')
              .addClass('fa-minus')
                .attr('title', 'Fai clic qui per eliminare un campo già creato.')
        ;

        $this
          .parents('.edit-section')
            .find('i.fa-plus, i.fa-pencil')
              .show()
        ;

        $zone
          .find('.input-remove-trigger')
            .remove()
        ;

        return false;
      }

      $this
        .find('i.fa')
          .removeClass('fa-minus')
            .addClass('fa-check')
              .attr('title', 'Fai clic qui per salvare le modifiche.')
      ;

      $this
        .parents('.edit-section')
          .find('i.fa-plus, i.fa-pencil')
            .hide()
      ;

      $zone
        .find('.fa-form-group')
          .append('<i class="fa fa-minus-circle input-remove-trigger"></i>')
      ;

      $zone
        .find('.input-remove-trigger')
          .on('click', function () {
            $(this)
              .parents('.fa-form-group')
                .remove()
            ;

            console.info('[Generator] A input has been removed!');
          })
      ;

    }

    /**
     * Trigger para criar, editar ou remover um grupo de input.
     * @role Trigger.
     */
    $('#add-field').on('click', addField);
    $('#edit-field').on('click', editField);
    $('#remove-field').on('click', removeField);

    var generate = function (type) {

      console.info('[Generator] The selected mode was: ' + type);

      // ID generator:
      number++;
      console.info('[Generator] This new input\'s ID is: ' + number);
      $('body').attr('data-number', number);

      $addField
        .find('#radio-select-input-type')
          .remove()
      ;

      $addField
        .find('h3')
          .text('Set the input you have chosen!')
      ;

      /**
       * Criação dum input tipo texto:
       */
      if (type === 'text') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>input</em> di <strong>testo</strong>! Questo è un <em>inputs</em> che accetta qualsiasi tipo di testo!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID Input (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label di Input:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-placeholder">Placeholder di Input:</label>',
              '      <input type="text" id="input-placeholder" value="" />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-required">Obbligatorio?</label>',
              '      <input type="checkbox" id="input-required" value="required" checked />',
              '      <label for="input-required" class="pseudo-checkbox"></label>',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Input tipo texto:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();
              var inputPlaceholder = $this.find('#input-placeholder').val();
              var inputRequired = '';

              if ($('#input-required').is(':checked')) {
                inputRequired = 'required';
              }

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <input type="text" data-type="text" id="' + inputId + '" placeholder="' + inputPlaceholder + '" ' + inputRequired + ' />',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Input di testo generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Textarea:
       */
      if (type === 'textarea') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>zona</em> di <strong>testo</strong>! Questa è una <em>textareas</em> che accetta qualsiasi tipo di testo!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID della Zona di testo (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label della Zona di testo:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-placeholder">Placeholder della Zona di testo:</label>',
              '      <input type="text" id="input-placeholder" value="" />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-required">Obbligatorio?</label>',
              '      <input type="checkbox" id="input-required" value="required" checked />',
              '      <label for="input-required" class="pseudo-checkbox"></label>',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Criação do input criado:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();
              var inputPlaceholder = $this.find('#input-placeholder').val();
              var inputRequired = '';

              if ($('#input-required').is(':checked')) {
                inputRequired = 'required';
              }

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <textarea data-type="textarea" id="' + inputId + '" placeholder="' + inputPlaceholder + '" ' + inputRequired + '></textarea>',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Textarea generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Input de tipo data:
       */
      if (type === 'date') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>input</em> di <strong>data</strong>! Questo è un <em>inputs</em> che accetta solo dati!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID del Input di data (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label del Input di data:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-required">Obbligatorio?</label>',
              '      <input type="checkbox" id="input-required" value="required" checked />',
              '      <label for="input-required" class="pseudo-checkbox"></label>',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Criação do input criado:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();
              var inputRequired = '';

              if ($('#input-required').is(':checked')) {
                inputRequired = 'required';
              }

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <input type="date" data-type="date" id="' + inputId + '" ' + inputRequired + ' />',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Input of date generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Input de tipo cor:
       */
      if (type === 'color') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>input</em> di <strong>colore</strong>! Questo è un <em>inputs</em> che accetta solo colori!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID del Input di colore (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label del Input di colore:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Criação do input criado:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <input type="color" data-type="color" id="' + inputId + '" />',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Input di colore generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Criação dum input tipo número:
       */
      if (type === 'number') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>input</em> di <strong>numero</strong>! Questo è un <em>inputs</em> che accetta solo numeri!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID del Input di numero (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label del Input di numero:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-placeholder">Placeholder del Input di numero:</label>',
              '      <input type="text" id="input-placeholder" value="" />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-max">Valore massimo di input:</label>',
              '      <input type="text" id="input-max" value="20" />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-min">Valore minimo di input:</label>',
              '      <input type="text" id="input-min" value="1" />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-required">Obbligatorio?</label>',
              '      <input type="checkbox" id="input-required" value="required" checked />',
              '      <label for="input-required" class="pseudo-checkbox"></label>',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Input tipo texto:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();
              var inputPlaceholder = $this.find('#input-placeholder').val();
              var inputMax = $this.find('#input-max').val();
              var inputMin = $this.find('#input-min').val();
              var inputRequired = '';

              if ($('#input-required').is(':checked')) {
                inputRequired = 'required';
              }

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <input type="number" data-type="number" id="' + inputId + '" placeholder="' + inputPlaceholder + '" max="' + inputMax + '" min="' + inputMin + '" ' + inputRequired + ' />',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Input di numero generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Criação dum input tipo select (único):
       */
      if (type === 'selectU') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>input</em> di <strong>selezione unica</strong>! Questo è un <em>inputs</em> che accetta solo un valore prestabilito da te!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID del Input (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label del Campo:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-vals">Valori del Campo (separarli con un\'interruzione di riga):</label>',
              '      <textarea id="input-vals" class="fa-valores" required></textarea>',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-required">Obbligatorio?</label>',
              '      <input type="checkbox" id="input-required" value="required" checked />',
              '      <label for="input-required" class="pseudo-checkbox"></label>',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Input tipo texto:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();
              var inputVals = $this.find('#input-vals').val();
              var inputRequired = '';

              if ($('#input-required').is(':checked')) {
                inputRequired = 'required';
              }

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <select data-type="select" id="' + inputId + '" ' + inputRequired + ' /></select>',
                '</div>',
                '',
              ].join('\n'));

              var valsOfSelect = inputVals.split('\n');
              $.each(valsOfSelect, function (index, text) {

              	var reg = /\S/gi;
              	if (!reg.test(text)) {
              		return;
                }

                if ($zone.find('select#' + inputId).find('option').length === 0) {
                  $zone
                    .find('select#' + inputId)
                      .append('\n<!-- First -->\n<option value="' + text + '">' + text + '</option>\n')
                  ;
                  return;
                }

              	$zone
                  .find('select#' + inputId)
                    .append('<option value="' + text + '">' + text + '</option>\n')
                ;
              });

              console.info('[Generator] Select (single) input generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Criação dum input tipo select (múltiplo):
       */
      if (type === 'selectM') {
        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <em>input</em> di <strong>selezione multipla</strong>! Questo è un <em>inputs</em> che accetta uno o più valori prestabilito da te!</p>',
              '<p class="part-obs">Completa i campi sottostanti con i dettagli del tuo nuovo campo.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="input-id">ID del Input (Automatico):</label>',
              '      <input type="text" id="input-id" value="campo' + number + '" readonly />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-label">Label del Campo:</label>',
              '      <input type="text" id="input-label" value="" required />',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-vals">Valori del Campo (separarli con un\'interruzione di riga):</label>',
              '      <textarea id="input-vals" required></textarea>',
              '    </div>',
              '    <div class="form-group">',
              '      <label for="input-required">Obbligatorio?</label>',
              '      <input type="checkbox" id="input-required" value="required" checked />',
              '      <label for="input-required" class="pseudo-checkbox"></label>',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Campo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Input tipo texto:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var inputId = $this.find('#input-id').val();
              var inputLabel = $this.find('#input-label').val();
              var inputVals = $this.find('#input-vals').val();
              var inputRequired = '';

              if ($('#input-required').is(':checked')) {
                inputRequired = 'required';
              }

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <label for="' + inputId + '">' + inputLabel + '</label>',
                '  <select multiple data-type="select" id="' + inputId + '" ' + inputRequired + ' /></select>',
                '</div>',
                '',
              ].join('\n'));

              var valsOfSelect = inputVals.split('\n');
              $.each(valsOfSelect, function (index, text) {

              	var reg = /\S/gi;
              	if (!reg.test(text)) {
              		return;
                }

                if ($zone.find('select#' + inputId).find('option').length === 0) {
                  $zone
                    .find('select#' + inputId)
                      .append('\n<!-- First -->\n<option value="' + text + '">' + text + '</option>\n')
                  ;
                  return;
                }

              	$zone
                  .find('select#' + inputId)
                    .append('<option value="' + text + '">' + text + '</option>\n')
                ;
              });

              console.info('[Generator] Select (multiple) input generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Criação dum subtítulo
       */
      if (type === 'subtitle') {

        $addField
          .find('h3')
            .text('Crea il testo del sottotitolo!')
        ;

        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <strong>sottotitolo</strong>!</p>',
              '<p class="part-obs">Completa i campi sottostanti.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="subtitle-text">Testo:</label>',
              '      <input type="text" id="subtitle-text" required />',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Sottotitolo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Input tipo texto:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var subText = $this.find('#subtitle-text').val();

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <h4 class="form-subtitle data-text">' + subText +'</h4>',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Subtitle generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Criação dum parágrafo explicativo.
       */
      if (type === 'exp-paragraph') {

        $addField
          .find('h3')
            .text('Crea il testo del tuo paragrafo!')
        ;

        $addField
          .find('.modal')
            .append([
              '<p class="part-obs">Hai scelto un <strong>paragrafo esplicativo</strong>!</p>',
              '<p class="part-obs">Completa i campi sottostanti.</p>',
              '<form class="configure-input">',
              '  <div class="modal-padding">',
              '    <div class="form-group">',
              '      <label for="par-text">Testo:</label>',
              '      <input type="text" id="par-text" required />',
              '    </div>',
              '  </div>',
              '  <footer class="form-footer">',
              '    <button type="submit" class="button-create-new">Genera Paragrafo</button>',
              '    <a href="javascript:void(0)" class="reset-create-field">Indietro</a>',
              '  </footer>',
              '</form>',
            ].join('\n'))
        ;

        /**
         * Input tipo texto:
         */
        $addField
          .find('.configure-input')
            .on('submit', function (event) {
              event.preventDefault();

              var $this = $(this);
              var parText = $this.find('#par-text').val();

              $zone.append([
                '<div class="fa-form-group clearfix">',
                '  <p class="form-paragraph data-text">' + parText +'</p>',
                '</div>',
                '',
              ].join('\n'));

              console.info('[Generator] Exp.-paragraph generated successfully!');

              closeModal();

            })
        ;
      }

      /**
       * Trigger dotão para voltar à seleção do tipo do input:
       * @role Trigger.
       */
      $addField
        .find('.reset-create-field')
          .on('click', function () {

            $addField.remove();
            addField();

            $addField
              .find('input[value="' + type + '"]')
                .prop('checked', true)
            ;

          })
      ;
    };

    /**
     * Função para remover qualquer modal aberto
     * na página. Basta chamar:
     * closeModal();
     */
    function closeModal () {
      var $modal = $('.modal-wrap');
      $modal.remove();
    }

    /**
     * Função para identificar quando um editor
     * está ativado:
     */
    $('#edit-field, #remove-field').on('click', function () {

      if ($('body').is('.is-editing')) {
        $('body').removeClass('is-editing');
        return;
      }

      if ($('.entry-prev').find('.fa-form-group').length > 0) {
        $('body').addClass('is-editing');
      }
    });

    /**
     *! END PARTE 1 !
     */

     /**
      *! BEGIN PARTE 2 !
      *
      */

    /**
     * Navegação via menu:
     */
    $('#step-1').on('click', function () {
      $('.global-part-2, .global-part-3').slideUp();
      $('.global-part-1').slideDown();
    });

    $('#step-1, #step-2, .back-part-btn').on('click', function () {
      $('#step-3').addClass('inactive');
      $('.global-part-3').slideUp();
    });

    /**
     * Back Btns:
     */
    $('.global-part-2 .back-part-btn').on('click', function () {
      $('.global-part-2, .global-part-3').slideUp();
      $('.global-part-1').slideDown();
    });

    $('.global-part-3 .back-part-btn').on('click', function () {
      $('.global-part-3, .global-part-1').slideUp();
      $('.global-part-2').slideDown();
    });

    /**
     * Adicionar/remover o cursor not-allowed,
     * no menu ou no botão, caso necessário:
     */
    $('#create-text-btn, #step-2').on({
      mouseenter: function () {
        if ($('.entry-prev').find('.fa-form-group').length === 0 || $('body').is('.is-editing')) {
          $(this).css('cursor', 'not-allowed');
          return;
        }

        $(this).css('cursor', 'pointer');
      },

      mouseleave: function () {
        $(this).css('cursor', 'pointer');
      }
    });

    /**
     * Botão da parte 1 que leva à 2:
     */
    $('#create-text-btn, #step-2, #back-to-2').on('click', function () {
      if ($('.entry-prev').find('.fa-form-group input, .fa-form-group select, .fa-form-group textarea').length === 0) {
        alert('Devi creare almeno un campo!');
        return;
      }

      if ($('body').is('.is-editing')) {
        alert('Completa prima la tua azione! (Fai clic sull\'icona di spunta nella barra laterale di modifica).');
        return;
      }

      $('#step-2').removeClass('inactive');
      $('.global-part-1').slideUp();
      $('.global-part-2').slideDown();

      generateTable();
    });

    /**
     * Gerar a tabela dos {{campos}}:
     */
    function generateTable () {

      $table
        .find('tbody *')
          .remove()
      ;

      var $target = $zone.find('input, select, textarea');
      $target.each(function () {

        var $this = $(this);
        var eachLabel = $this.prev('label').text();
        var eachField = '{{' + $this.attr('id') + '}}';

        $table
          .find('tbody')
            .append([
              '<tr>',
              '  <td>' + eachLabel + '</td>',
              '  <td>' + eachField + '</td>',
              '</tr>',
            ].join('\n'))
        ;

      });

      /**
       * Arrumar a parte 2.
       */
      var presetesTableHeight = $('.presets-table').height() - 1;
      $('.config-form').css('min-height', presetesTableHeight + 'px');
    }

    /**
     * Saber qual será o destino do formulário que
     * está sendo gerado.
     */
    var $formFunction = $('#form-function');
    $formFunction.on('change', function () {

      var $this = $(this);
      var func = $this.val();

      $('.config-part').not('[data-toggle="' + func + '"]').slideUp();
      $('.config-part[data-toggle="' + func + '"]').slideDown();

      $('.next-part-fake').remove();

    });

    $('.config-part').on('submit', function (event) {
      event.preventDefault();

      $('.global-part-1, .global-part-2').hide();
      $('.global-part-3').show();
      $('#step-3').removeClass('inactive');

      $('html, body').stop().animate({scrollTop: 0}, 'fast');

      var $this = $(this);
      var $button = $this.find('button.generate-code');
      var typeOfCode = $button.attr('data-code');

      console.log('[Generator] Generating code! Type: ' + typeOfCode);
      generateCode(typeOfCode);
    });

    /**
     * Parte 03:
     * Função para gerar o código:
     * topiccode, postcode
     */

    var $install = $('.install-wrapper');

    var generateCode = function (codeType) {

      $.getScript('https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');

      if (codeType === 'topiccode') {
        $install.find('h2.part-title span.html-form-type').text('New Topic');

        var POSTformTitle = $('.part-fa-newtopic #fa-form-title').val();
        var POSTtopicTitle = $('.part-fa-newtopic #fa-newtopic-title').val();
        var POSTforumValue = $('.part-fa-newtopic #fa-newtopic-number').val();
        var POSTtopicMessage = $('.part-fa-newtopic #fa-newtopic-message').val().trim();

        registerForm('NEW_TOPIC', POSTformTitle);

        var POSTgeneratedCode = [
          '<!DOCTYPE html>',
          '<html>',
          '<!-- ->',
          '/**',
          ' * Generato in <aiuto.forumattivo.it>.',
          ' * Generatore (2.0) fatto da Luiz Felipe G. <https://luizfelipe.dev>',
          ' * Tradotto da Chanp <https://ajuda.forumeiros.com/u64199>',
          ' *',
          ' * Se hai problemi o dubbi, visita <aiuto.forumattivo.it>',
          ' */',
          '<!- -->',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <meta http-equiv="X-UA-Compatible" content="ie=edge">',
          '  <title>' + POSTformTitle + '</title>',
          '',
          '  <link rel="stylesheet" href="https://forumeiros.github.io/assets/src/form-generator/form-styles.css" />',
          '</head>',
          '<body>',
          '',
          '  <form id="fa-generated-form">',
          '    <div class="fa-form-wrapper">',
          '      <h1>' + POSTformTitle + '</h1>',
          '      <!-- BEGIN Generated HTML Code -->',
          '      ' + $('.entry-prev').html().trim(),
          '      <!-- END Generated HTML Code -->',
          '    </div>',
          '    <div class="fa-submit">',
          '      <button class="post-button" type="submit">Inviare il Modulo</button>',
          '    </div>',
          '  </form>',
          '',
          '',
          '',
          '  <!-- Javascript\'s -->',
          '  <!-- La modifica al di sotto di questa riga non è consigliata. -->',
          '',
          '  <textarea style="display: none;" id="fa-generated-message">' + POSTtopicMessage + '</textarea>',
          '  <input type="hidden" id="fa-generated-title" value="' + POSTtopicTitle + '" />',
          '',
          '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>',
          '  <script src="https://forumeiros.github.io/assets/src/form-generator/form-replace.js" type="text/javascript"></script>',
          '  <script type="text/javascript">',
          '    (function ($) {',
          '    	\'use strict\';',
          '',
          '    	$(window).on(\'load\', function () {',
          '    		$(\'#fa-generated-form\').on(\'submit\', function (event) {',
          '         event.preventDefault();',
          '         $(this).find(\'button[type="submit"]\').text(\'Invio...\');',
          '         setTimeout(function () {',
          '    			  $.post(\'/post\', {',
          '    			  	subject: $(\'#fa-generated-title\').val().trim(),',
          '    				  f: ' + POSTforumValue + ',',
          '    			  	message: $(\'#fa-generated-message\').val().trim(),',
          '    			  	mode: \'newtopic\',',
          '    			  	tid: $(\'[name="tid"]:first\').val(),',
          '    			  	post: 1,',
          '    		  	}).done(function () {',
          '    			  	alert(\'Postato con successo. Verrai reindirizzato al subforum con il nuovo argomento...\');',
          '    			  	location.pathname = \'/f' + POSTforumValue + '-\';',
          '    			  }).fail(function () {',
          '    			  	alert(\'Si è verificato un errore. Riprova!\');',
          '    			  });',
          '         }, 600);',
          '    		});',
          '    	});',
          '    }(jQuery));',
          '  </script>',
          '</body>',
          '</html>',
        ].join('\n');

        $('#generated-code-zone pre').text(POSTgeneratedCode);
      } // End topiccode

      if (codeType === 'postcode') {
        $install.find('h2.part-title span.html-form-type').text('Rispondi All\'argomento');

        var REPLYformTitle = $('.part-fa-newpost #fa-form-title').val();
        var REPLYtopicValue = $('.part-fa-newpost #fa-newpost-number').val();
        var REPLYtopicMessage = $('.part-fa-newpost #fa-newpost-message').val().trim();

        registerForm('REPLY', REPLYformTitle);


        var REPLYgeneratedCode = [
          '<!DOCTYPE html>',
          '<html>',
          '<!-- ->',
          '/**',
          ' * Generato in <aiuto.forumattivo.it>.',
          ' * Generatore (2.0) fatto da Luiz Felipe G. <https://luizfelipe.dev>',
          ' * Tradotto da Chanp <https://ajuda.forumeiros.com/u64199>',
          ' *',
          ' * Se hai problemi o dubbi, visita <aiuto.forumattivo.it>',
          ' */',
          '<!- -->',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <meta http-equiv="X-UA-Compatible" content="ie=edge">',
          '  <title>' + REPLYformTitle + '</title>',
          '',
          '  <link rel="stylesheet" href="https://forumeiros.github.io/assets/src/form-generator/form-styles.css" />',
          '</head>',
          '<body>',
          '',
          '  <form id="fa-generated-form">',
          '    <div class="fa-form-wrapper">',
          '      <h1>' + REPLYformTitle + '</h1>',
          '      <!-- BEGIN Generated HTML Code -->',
          '      ' + $('.entry-prev').html().trim(),
          '      <!-- END Generated HTML Code -->',
          '    </div>',
          '    <div class="fa-submit">',
          '      <button class="post-button" type="submit">Inviare il Modulo</button>',
          '    </div>',
          '  </form>',
          '',
          '',
          '',
          '  <!-- Javascript\'s -->',
          '  <!-- La modifica al di sotto di questa riga non è consigliata. -->',
          '',
          '  <textarea style="display: none;" id="fa-generated-message">' + REPLYtopicMessage + '</textarea>',
          '',
          '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>',
          '  <script src="https://forumeiros.github.io/assets/src/form-generator/form-replace.js" type="text/javascript"></script>',
          '  <script type="text/javascript">',
          '    (function ($) {',
          '    	\'use strict\';',
          '',
          '    	$(window).on(\'load\', function () {',
          '    		$(\'#fa-generated-form\').on(\'submit\', function (event) {',
          '         event.preventDefault();',
          '         $(this).find(\'button[type="submit"]\').text(\'Invio...\');',
          '         setTimeout(function () {',
          '    		  	$.post(\'/post\', {',
          '    			  	t: ' + REPLYtopicValue + ',',
          '    				  message: $(\'#fa-generated-message\').val().trim(),',
          '    				  mode: \'reply\',',
          '    				  tid: $(\'[name="tid"]:first\').val(),',
          '    				  post: 1,',
          '    		  	}).done(function () {',
          '    				  alert(\'Postato con successo. Verrai reindirizzato al subforum con il nuovo argomento...\');',
          '             location.href = \'http://\' + location.host + \'/t' + REPLYtopicValue + '-?view=newest\';',
          '    			  }).fail(function () {',
          '    				  alert(\'Si è verificato un errore. Riprova!\');',
          '    			  });',
          '         }, 600);',
          '    		});',
          '    	});',
          '    }(jQuery));',
          '  </script>',
          '</body>',
          '</html>',
        ].join('\n');

        $('#generated-code-zone pre').text(REPLYgeneratedCode);
      } // End postcode

      function registerForm(type, title) {
        var MAPPINGS = {
          text: dataType('text'),
          textarea: dataType('textarea'),
          date: dataType('date'),
          color: dataType('color'),
          number: dataType('number'),
          select: dataType('select', ':not([multiple])'),
          selectMultiple: dataType('select', '[multiple]'),
          subtitle: '.data-text.form-subtitle',
          paragraph: '.data-text.form-paragraph'
        };

        function dataType(selector, customSelector) {
          return '[data-type="' + selector + '"]' + (customSelector || '');
        }

        var fieldList = $('.entry-prev')
          .find('[data-type], .data-text')
          .map(function(index, node) {
            var $node = $(node);
            var currentName;

            $.each(MAPPINGS, function(name, selector) {
              if ($node.is(selector)) {
                currentName = name;
                return false;
              }
            });

            return currentName;
          })
          .get()
          .join();
      }

      /**
       * Gerar o código novamente caso saia da parte 3:
       */
      $('#back-to-2, #step-1, #step-2').on('click', function () {
        $install.find('h3 span.form-type').text('');
      });
    };

    /**
     * Copy Btn.
     */
    $('<a>', {
 	    class: 'fa fa-clipboard',
 	    id: 'fa-copy-content',
      style: [
        'position: absolute;',
        'top: 15px;',
        'right: 32px;',
        'z-index: 99;',
        'color: #3b3b3b;',
        'text-decoration: none!important;',
      ].join(' ')
    }).prependTo('.code-zone-to-append code');

    new Clipboard('#fa-copy-content', {
      target: function(trigger) {
        return trigger.nextElementSibling;
      }
    });

    console.info('Scripts requeridos carregados com sucesso!\n[ @version 1.2 ]');
  });
}(jQuery));
