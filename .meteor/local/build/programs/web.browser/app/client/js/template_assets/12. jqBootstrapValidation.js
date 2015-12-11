(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/12. jqBootstrapValidation.js              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/* jqBootstrapValidation                                               //
 * A plugin for automating validation on Twitter Bootstrap formatted forms.
 *                                                                     //
 * v1.3.6                                                              //
 *                                                                     //
 * License: MIT <http://opensource.org/licenses/mit-license.php> - see LICENSE file
 *                                                                     //
 * http://ReactiveRaven.github.com/jqBootstrapValidation/              //
 */                                                                    //
                                                                       //
(function ($) {                                                        // 11
                                                                       //
  var createdElements = [];                                            // 13
                                                                       //
  var defaults = {                                                     // 15
    options: {                                                         // 16
      prependExistingHelpBlock: false,                                 // 17
      sniffHtml: true, // sniff for 'required', 'maxlength', etc       // 18
      preventSubmit: true, // stop the form submit event from firing if validation fails
      submitError: false, // function called if there is an error when trying to submit
      submitSuccess: false, // function called just before a successful submit event is sent to the server
      semanticallyStrict: false, // set to true to tidy up generated HTML output
      autoAdd: {                                                       // 23
        helpBlocks: true                                               // 24
      },                                                               //
      filter: function () {                                            // 26
        // return $(this).is(":visible"); // only validate elements you can see
        return true; // validate everything                            // 28
      }                                                                //
    },                                                                 //
    methods: {                                                         // 31
      init: function (options) {                                       // 32
                                                                       //
        var settings = $.extend(true, {}, defaults);                   // 34
                                                                       //
        settings.options = $.extend(true, settings.options, options);  // 36
                                                                       //
        var $siblingElements = this;                                   // 38
                                                                       //
        var uniqueForms = $.unique($siblingElements.map(function () {  // 40
          return $(this).parents("form")[0];                           // 42
        }).toArray());                                                 //
                                                                       //
        $(uniqueForms).bind("submit", function (e) {                   // 46
          var $form = $(this);                                         // 47
          var warningsFound = 0;                                       // 48
          var $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
          $inputs.trigger("submit.validation").trigger("validationLostFocus.validation");
                                                                       //
          $inputs.each(function (i, el) {                              // 52
            var $this = $(el),                                         // 53
                $controlGroup = $this.parents(".control-group").first();
            if ($controlGroup.hasClass("warning")) {                   // 55
              $controlGroup.removeClass("warning").addClass("error");  // 58
              warningsFound++;                                         // 59
            }                                                          //
          });                                                          //
                                                                       //
          $inputs.trigger("validationLostFocus.validation");           // 63
                                                                       //
          if (warningsFound) {                                         // 65
            if (settings.options.preventSubmit) {                      // 66
              e.preventDefault();                                      // 67
            }                                                          //
            $form.addClass("error");                                   // 69
            if ($.isFunction(settings.options.submitError)) {          // 70
              settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", true));
            }                                                          //
          } else {                                                     //
            $form.removeClass("error");                                // 74
            if ($.isFunction(settings.options.submitSuccess)) {        // 75
              settings.options.submitSuccess($form, e);                // 76
            }                                                          //
          }                                                            //
        });                                                            //
                                                                       //
        return this.each(function () {                                 // 81
                                                                       //
          // Get references to everything we're interested in          //
          var $this = $(this),                                         // 84
              $controlGroup = $this.parents(".control-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first(),  //
              $form = $this.parents("form").first(),                   //
              validatorNames = [];                                     //
                                                                       //
          // create message container if not exists                    //
          if (!$helpBlock.length && settings.options.autoAdd && settings.options.autoAdd.helpBlocks) {
            $helpBlock = $('<div class="help-block" />');              // 92
            $controlGroup.find('.controls').append($helpBlock);        // 93
            createdElements.push($helpBlock[0]);                       // 94
          }                                                            //
                                                                       //
          // =============================================================
          //                                     SNIFF HTML FOR VALIDATORS
          // =============================================================
                                                                       //
          // *snort sniff snuffle*                                     //
                                                                       //
          if (settings.options.sniffHtml) {                            // 103
            var message = "";                                          // 104
            // ---------------------------------------------------------
            //                                                   PATTERN
            // ---------------------------------------------------------
            if ($this.attr("pattern") !== undefined) {                 // 108
              message = "Not in the expected format<!-- data-validation-pattern-message to override -->";
              if ($this.data("validationPatternMessage")) {            // 110
                message = $this.data("validationPatternMessage");      // 111
              }                                                        //
              $this.data("validationPatternMessage", message);         // 113
              $this.data("validationPatternRegex", $this.attr("pattern"));
            }                                                          //
            // ---------------------------------------------------------
            //                                                       MAX
            // ---------------------------------------------------------
            if ($this.attr("max") !== undefined || $this.attr("aria-valuemax") !== undefined) {
              var max = $this.attr("max") !== undefined ? $this.attr("max") : $this.attr("aria-valuemax");
              message = "Too high: Maximum of '" + max + "'<!-- data-validation-max-message to override -->";
              if ($this.data("validationMaxMessage")) {                // 122
                message = $this.data("validationMaxMessage");          // 123
              }                                                        //
              $this.data("validationMaxMessage", message);             // 125
              $this.data("validationMaxMax", max);                     // 126
            }                                                          //
            // ---------------------------------------------------------
            //                                                       MIN
            // ---------------------------------------------------------
            if ($this.attr("min") !== undefined || $this.attr("aria-valuemin") !== undefined) {
              var min = $this.attr("min") !== undefined ? $this.attr("min") : $this.attr("aria-valuemin");
              message = "Too low: Minimum of '" + min + "'<!-- data-validation-min-message to override -->";
              if ($this.data("validationMinMessage")) {                // 134
                message = $this.data("validationMinMessage");          // 135
              }                                                        //
              $this.data("validationMinMessage", message);             // 137
              $this.data("validationMinMin", min);                     // 138
            }                                                          //
            // ---------------------------------------------------------
            //                                                 MAXLENGTH
            // ---------------------------------------------------------
            if ($this.attr("maxlength") !== undefined) {               // 143
              message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->";
              if ($this.data("validationMaxlengthMessage")) {          // 145
                message = $this.data("validationMaxlengthMessage");    // 146
              }                                                        //
              $this.data("validationMaxlengthMessage", message);       // 148
              $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"));
            }                                                          //
            // ---------------------------------------------------------
            //                                                 MINLENGTH
            // ---------------------------------------------------------
            if ($this.attr("minlength") !== undefined) {               // 154
              message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->";
              if ($this.data("validationMinlengthMessage")) {          // 156
                message = $this.data("validationMinlengthMessage");    // 157
              }                                                        //
              $this.data("validationMinlengthMessage", message);       // 159
              $this.data("validationMinlengthMinlength", $this.attr("minlength"));
            }                                                          //
            // ---------------------------------------------------------
            //                                                  REQUIRED
            // ---------------------------------------------------------
            if ($this.attr("required") !== undefined || $this.attr("aria-required") !== undefined) {
              message = settings.builtInValidators.required.message;   // 166
              if ($this.data("validationRequiredMessage")) {           // 167
                message = $this.data("validationRequiredMessage");     // 168
              }                                                        //
              $this.data("validationRequiredMessage", message);        // 170
            }                                                          //
            // ---------------------------------------------------------
            //                                                    NUMBER
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "number") {
              message = settings.builtInValidators.number.message;     // 176
              if ($this.data("validationNumberMessage")) {             // 177
                message = $this.data("validationNumberMessage");       // 178
              }                                                        //
              $this.data("validationNumberMessage", message);          // 180
            }                                                          //
            // ---------------------------------------------------------
            //                                                     EMAIL
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "email") {
              message = "Not a valid email address<!-- data-validator-validemail-message to override -->";
              if ($this.data("validationValidemailMessage")) {         // 187
                message = $this.data("validationValidemailMessage");   // 188
              } else if ($this.data("validationEmailMessage")) {       //
                message = $this.data("validationEmailMessage");        // 190
              }                                                        //
              $this.data("validationValidemailMessage", message);      // 192
            }                                                          //
            // ---------------------------------------------------------
            //                                                MINCHECKED
            // ---------------------------------------------------------
            if ($this.attr("minchecked") !== undefined) {              // 197
              message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->";
              if ($this.data("validationMincheckedMessage")) {         // 199
                message = $this.data("validationMincheckedMessage");   // 200
              }                                                        //
              $this.data("validationMincheckedMessage", message);      // 202
              $this.data("validationMincheckedMinchecked", $this.attr("minchecked"));
            }                                                          //
            // ---------------------------------------------------------
            //                                                MAXCHECKED
            // ---------------------------------------------------------
            if ($this.attr("maxchecked") !== undefined) {              // 208
              message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->";
              if ($this.data("validationMaxcheckedMessage")) {         // 210
                message = $this.data("validationMaxcheckedMessage");   // 211
              }                                                        //
              $this.data("validationMaxcheckedMessage", message);      // 213
              $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked"));
            }                                                          //
          }                                                            //
                                                                       //
          // =============================================================
          //                                       COLLECT VALIDATOR NAMES
          // =============================================================
                                                                       //
          // Get named validators                                      //
          if ($this.data("validation") !== undefined) {                // 223
            validatorNames = $this.data("validation").split(",");      // 224
          }                                                            //
                                                                       //
          // Get extra ones defined on the element's data attributes   //
          $.each($this.data(), function (i, el) {                      // 228
            var parts = i.replace(/([A-Z])/g, ",$1").split(",");       // 229
            if (parts[0] === "validation" && parts[1]) {               // 230
              validatorNames.push(parts[1]);                           // 231
            }                                                          //
          });                                                          //
                                                                       //
          // =============================================================
          //                                     NORMALISE VALIDATOR NAMES
          // =============================================================
                                                                       //
          var validatorNamesToInspect = validatorNames;                // 239
          var newValidatorNamesToInspect = [];                         // 240
                                                                       //
          do // repeatedly expand 'shortcut' validators into their real validators
          {                                                            // 243
            // Uppercase only the first letter of each name            //
            $.each(validatorNames, function (i, el) {                  // 245
              validatorNames[i] = formatValidatorName(el);             // 246
            });                                                        //
                                                                       //
            // Remove duplicate validator names                        //
            validatorNames = $.unique(validatorNames);                 // 250
                                                                       //
            // Pull out the new validator names from each shortcut     //
            newValidatorNamesToInspect = [];                           // 253
            $.each(validatorNamesToInspect, function (i, el) {         // 254
              if ($this.data("validation" + el + "Shortcut") !== undefined) {
                // Are these custom validators?                        //
                // Pull them out!                                      //
                $.each($this.data("validation" + el + "Shortcut").split(","), function (i2, el2) {
                  newValidatorNamesToInspect.push(el2);                // 259
                });                                                    //
              } else if (settings.builtInValidators[el.toLowerCase()]) {
                // Is this a recognised built-in?                      //
                // Pull it out!                                        //
                var validator = settings.builtInValidators[el.toLowerCase()];
                if (validator.type.toLowerCase() === "shortcut") {     // 265
                  $.each(validator.shortcut.split(","), function (i, el) {
                    el = formatValidatorName(el);                      // 267
                    newValidatorNamesToInspect.push(el);               // 268
                    validatorNames.push(el);                           // 269
                  });                                                  //
                }                                                      //
              }                                                        //
            });                                                        //
                                                                       //
            validatorNamesToInspect = newValidatorNamesToInspect;      // 275
          } while (validatorNamesToInspect.length > 0);                //
                                                                       //
          // =============================================================
          //                                       SET UP VALIDATOR ARRAYS
          // =============================================================
                                                                       //
          var validators = {};                                         // 283
                                                                       //
          $.each(validatorNames, function (i, el) {                    // 285
            // Set up the 'override' message                           //
            var message = $this.data("validation" + el + "Message");   // 287
            var hasOverrideMessage = message !== undefined;            // 288
            var foundValidator = false;                                // 289
            message = message ? message : "'" + el + "' validation failed <!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message -->";
                                                                       //
            $.each(settings.validatorTypes, function (validatorType, validatorTemplate) {
              if (validators[validatorType] === undefined) {           // 301
                validators[validatorType] = [];                        // 302
              }                                                        //
              if (!foundValidator && $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) !== undefined) {
                validators[validatorType].push($.extend(true, {        // 305
                  name: formatValidatorName(validatorTemplate.name),   // 309
                  message: message                                     // 310
                }, validatorTemplate.init($this, el)));                //
                foundValidator = true;                                 // 315
              }                                                        //
            });                                                        //
                                                                       //
            if (!foundValidator && settings.builtInValidators[el.toLowerCase()]) {
                                                                       //
              var validator = $.extend(true, {}, settings.builtInValidators[el.toLowerCase()]);
              if (hasOverrideMessage) {                                // 323
                validator.message = message;                           // 324
              }                                                        //
              var validatorType = validator.type.toLowerCase();        // 326
                                                                       //
              if (validatorType === "shortcut") {                      // 328
                foundValidator = true;                                 // 329
              } else {                                                 //
                $.each(settings.validatorTypes, function (validatorTemplateType, validatorTemplate) {
                  if (validators[validatorTemplateType] === undefined) {
                    validators[validatorTemplateType] = [];            // 335
                  }                                                    //
                  if (!foundValidator && validatorType === validatorTemplateType.toLowerCase()) {
                    $this.data("validation" + el + formatValidatorName(validatorTemplate.name), validator[validatorTemplate.name.toLowerCase()]);
                    validators[validatorType].push($.extend(validator, validatorTemplate.init($this, el)));
                    foundValidator = true;                             // 345
                  }                                                    //
                });                                                    //
              }                                                        //
            }                                                          //
                                                                       //
            if (!foundValidator) {                                     // 352
              $.error("Cannot find validation info for '" + el + "'");
            }                                                          //
          });                                                          //
                                                                       //
          // =============================================================
          //                                         STORE FALLBACK VALUES
          // =============================================================
                                                                       //
          $helpBlock.data("original-contents", $helpBlock.data("original-contents") ? $helpBlock.data("original-contents") : $helpBlock.html());
                                                                       //
          $helpBlock.data("original-role", $helpBlock.data("original-role") ? $helpBlock.data("original-role") : $helpBlock.attr("role"));
                                                                       //
          $controlGroup.data("original-classes", $controlGroup.data("original-clases") ? $controlGroup.data("original-classes") : $controlGroup.attr("class"));
                                                                       //
          $this.data("original-aria-invalid", $this.data("original-aria-invalid") ? $this.data("original-aria-invalid") : $this.attr("aria-invalid"));
                                                                       //
          // =============================================================
          //                                                    VALIDATION
          // =============================================================
                                                                       //
          $this.bind("validation.validation", function (event, params) {
                                                                       //
            var value = getValue($this);                               // 405
                                                                       //
            // Get a list of the errors to apply                       //
            var errorsFound = [];                                      // 408
                                                                       //
            $.each(validators, function (validatorType, validatorTypeArray) {
              if (value || value.length || params && params.includeEmpty || !!settings.validatorTypes[validatorType].blockSubmit && params && !!params.submitting) {
                $.each(validatorTypeArray, function (i, validator) {   // 412
                  if (settings.validatorTypes[validatorType].validate($this, value, validator)) {
                    errorsFound.push(validator.message);               // 414
                  }                                                    //
                });                                                    //
              }                                                        //
            });                                                        //
                                                                       //
            return errorsFound;                                        // 420
          });                                                          //
                                                                       //
          $this.bind("getValidators.validation", function () {         // 424
            return validators;                                         // 427
          });                                                          //
                                                                       //
          // =============================================================
          //                                             WATCH FOR CHANGES
          // =============================================================
          $this.bind("submit.validation", function () {                // 434
            return $this.triggerHandler("change.validation", { submitting: true });
          });                                                          //
          $this.bind(["keyup", "focus", "blur", "click", "keydown", "keypress", "change"].join(".validation ") + ".validation", function (e, params) {
                                                                       //
            var value = getValue($this);                               // 452
                                                                       //
            var errorsFound = [];                                      // 454
                                                                       //
            $controlGroup.find("input,textarea,select").each(function (i, el) {
              var oldCount = errorsFound.length;                       // 457
              $.each($(el).triggerHandler("validation.validation", params), function (j, message) {
                errorsFound.push(message);                             // 459
              });                                                      //
              if (errorsFound.length > oldCount) {                     // 461
                $(el).attr("aria-invalid", "true");                    // 462
              } else {                                                 //
                var original = $this.data("original-aria-invalid");    // 464
                $(el).attr("aria-invalid", original !== undefined ? original : false);
              }                                                        //
            });                                                        //
                                                                       //
            $form.find("input,select,textarea").not($this).not("[name=\"" + $this.attr("name") + "\"]").trigger("validationLostFocus.validation");
                                                                       //
            errorsFound = $.unique(errorsFound.sort());                // 471
                                                                       //
            // Were there any errors?                                  //
            if (errorsFound.length) {                                  // 474
              // Better flag it up as a warning.                       //
              $controlGroup.removeClass("success error").addClass("warning");
                                                                       //
              // How many errors did we find?                          //
              if (settings.options.semanticallyStrict && errorsFound.length === 1) {
                // Only one? Being strict? Just output it.             //
                $helpBlock.html(errorsFound[0] + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : ""));
              } else {                                                 //
                // Multiple? Being sloppy? Glue them together into an UL.
                $helpBlock.html("<ul role=\"alert\"><li>" + errorsFound.join("</li><li>") + "</li></ul>" + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : ""));
              }                                                        //
            } else {                                                   //
              $controlGroup.removeClass("warning error success");      // 489
              if (value.length > 0) {                                  // 490
                $controlGroup.addClass("success");                     // 491
              }                                                        //
              $helpBlock.html($helpBlock.data("original-contents"));   // 493
            }                                                          //
                                                                       //
            if (e.type === "blur") {                                   // 496
              $controlGroup.removeClass("success");                    // 497
            }                                                          //
          });                                                          //
          $this.bind("validationLostFocus.validation", function () {   // 501
            $controlGroup.removeClass("success");                      // 502
          });                                                          //
        });                                                            //
      },                                                               //
      destroy: function () {                                           // 506
                                                                       //
        return this.each(function () {                                 // 508
                                                                       //
          var $this = $(this),                                         // 511
              $controlGroup = $this.parents(".control-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first();  //
                                                                       //
          // remove our events                                         //
          $this.unbind('.validation'); // events are namespaced.       // 517
          // reset help text                                           //
          $helpBlock.html($helpBlock.data("original-contents"));       // 519
          // reset classes                                             //
          $controlGroup.attr("class", $controlGroup.data("original-classes"));
          // reset aria                                                //
          $this.attr("aria-invalid", $this.data("original-aria-invalid"));
          // reset role                                                //
          $helpBlock.attr("role", $this.data("original-role"));        // 525
          // remove all elements we created                            //
          if (createdElements.indexOf($helpBlock[0]) > -1) {           // 527
            $helpBlock.remove();                                       // 528
          }                                                            //
        });                                                            //
      },                                                               //
      collectErrors: function (includeEmpty) {                         // 535
                                                                       //
        var errorMessages = {};                                        // 537
        this.each(function (i, el) {                                   // 538
          var $el = $(el);                                             // 539
          var name = $el.attr("name");                                 // 540
          var errors = $el.triggerHandler("validation.validation", { includeEmpty: true });
          errorMessages[name] = $.extend(true, errors, errorMessages[name]);
        });                                                            //
                                                                       //
        $.each(errorMessages, function (i, el) {                       // 545
          if (el.length === 0) {                                       // 546
            delete errorMessages[i];                                   // 547
          }                                                            //
        });                                                            //
                                                                       //
        return errorMessages;                                          // 551
      },                                                               //
      hasErrors: function () {                                         // 554
                                                                       //
        var errorMessages = [];                                        // 556
                                                                       //
        this.each(function (i, el) {                                   // 558
          errorMessages = errorMessages.concat($(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", { submitting: true }) : []);
        });                                                            //
                                                                       //
        return errorMessages.length > 0;                               // 564
      },                                                               //
      override: function (newDefaults) {                               // 566
        defaults = $.extend(true, defaults, newDefaults);              // 567
      }                                                                //
    },                                                                 //
    validatorTypes: {                                                  // 570
      callback: {                                                      // 571
        name: "callback",                                              // 572
        init: function ($this, name) {                                 // 573
          return {                                                     // 574
            validatorName: name,                                       // 575
            callback: $this.data("validation" + name + "Callback"),    // 576
            lastValue: $this.val(),                                    // 577
            lastValid: true,                                           // 578
            lastFinished: true                                         // 579
          };                                                           //
        },                                                             //
        validate: function ($this, value, validator) {                 // 582
          if (validator.lastValue === value && validator.lastFinished) {
            return !validator.lastValid;                               // 584
          }                                                            //
                                                                       //
          if (validator.lastFinished === true) {                       // 587
            validator.lastValue = value;                               // 589
            validator.lastValid = true;                                // 590
            validator.lastFinished = false;                            // 591
                                                                       //
            var rrjqbvValidator = validator;                           // 593
            var rrjqbvThis = $this;                                    // 594
            executeFunctionByName(validator.callback, window, $this, value, function (data) {
              if (rrjqbvValidator.lastValue === data.value) {          // 601
                rrjqbvValidator.lastValid = data.valid;                // 602
                if (data.message) {                                    // 603
                  rrjqbvValidator.message = data.message;              // 604
                }                                                      //
                rrjqbvValidator.lastFinished = true;                   // 606
                rrjqbvThis.data("validation" + rrjqbvValidator.validatorName + "Message", rrjqbvValidator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {                               // 609
                  rrjqbvThis.trigger("change.validation");             // 610
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }                                                        //
            });                                                        //
          }                                                            //
                                                                       //
          return false;                                                // 617
        }                                                              //
      },                                                               //
      ajax: {                                                          // 621
        name: "ajax",                                                  // 622
        init: function ($this, name) {                                 // 623
          return {                                                     // 624
            validatorName: name,                                       // 625
            url: $this.data("validation" + name + "Ajax"),             // 626
            lastValue: $this.val(),                                    // 627
            lastValid: true,                                           // 628
            lastFinished: true                                         // 629
          };                                                           //
        },                                                             //
        validate: function ($this, value, validator) {                 // 632
          if ("" + validator.lastValue === "" + value && validator.lastFinished === true) {
            return validator.lastValid === false;                      // 634
          }                                                            //
                                                                       //
          if (validator.lastFinished === true) {                       // 637
            validator.lastValue = value;                               // 639
            validator.lastValid = true;                                // 640
            validator.lastFinished = false;                            // 641
            $.ajax({                                                   // 642
              url: validator.url,                                      // 643
              data: "value=" + value + "&field=" + $this.attr("name"),
              dataType: "json",                                        // 645
              success: function (data) {                               // 646
                if ("" + validator.lastValue === "" + data.value) {    // 647
                  validator.lastValid = !!data.valid;                  // 648
                  if (data.message) {                                  // 649
                    validator.message = data.message;                  // 650
                  }                                                    //
                  validator.lastFinished = true;                       // 652
                  $this.data("validation" + validator.validatorName + "Message", validator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {                             // 655
                    $this.trigger("change.validation");                // 656
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }                                                      //
              },                                                       //
              failure: function () {                                   // 660
                validator.lastValid = true;                            // 661
                validator.message = "ajax call failed";                // 662
                validator.lastFinished = true;                         // 663
                $this.data("validation" + validator.validatorName + "Message", validator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {                               // 666
                  $this.trigger("change.validation");                  // 667
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }                                                        //
            });                                                        //
          }                                                            //
                                                                       //
          return false;                                                // 673
        }                                                              //
      },                                                               //
      regex: {                                                         // 677
        name: "regex",                                                 // 678
        init: function ($this, name) {                                 // 679
          return { regex: regexFromString($this.data("validation" + name + "Regex")) };
        },                                                             //
        validate: function ($this, value, validator) {                 // 682
          return !validator.regex.test(value) && !validator.negative || validator.regex.test(value) && validator.negative;
        }                                                              //
      },                                                               //
      required: {                                                      // 687
        name: "required",                                              // 688
        init: function ($this, name) {                                 // 689
          return {};                                                   // 690
        },                                                             //
        validate: function ($this, value, validator) {                 // 692
          return !!(value.length === 0 && !validator.negative) || !!(value.length > 0 && validator.negative);
        },                                                             //
        blockSubmit: true                                              // 696
      },                                                               //
      match: {                                                         // 698
        name: "match",                                                 // 699
        init: function ($this, name) {                                 // 700
          var element = $this.parents("form").first().find("[name=\"" + $this.data("validation" + name + "Match") + "\"]").first();
          element.bind("validation.validation", function () {          // 702
            $this.trigger("change.validation", { submitting: true });  // 703
          });                                                          //
          return { "element": element };                               // 705
        },                                                             //
        validate: function ($this, value, validator) {                 // 707
          return value !== validator.element.val() && !validator.negative || value === validator.element.val() && validator.negative;
        },                                                             //
        blockSubmit: true                                              // 711
      },                                                               //
      max: {                                                           // 713
        name: "max",                                                   // 714
        init: function ($this, name) {                                 // 715
          return { max: $this.data("validation" + name + "Max") };     // 716
        },                                                             //
        validate: function ($this, value, validator) {                 // 718
          return parseFloat(value, 10) > parseFloat(validator.max, 10) && !validator.negative || parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative;
        }                                                              //
      },                                                               //
      min: {                                                           // 723
        name: "min",                                                   // 724
        init: function ($this, name) {                                 // 725
          return { min: $this.data("validation" + name + "Min") };     // 726
        },                                                             //
        validate: function ($this, value, validator) {                 // 728
          return parseFloat(value) < parseFloat(validator.min) && !validator.negative || parseFloat(value) >= parseFloat(validator.min) && validator.negative;
        }                                                              //
      },                                                               //
      maxlength: {                                                     // 733
        name: "maxlength",                                             // 734
        init: function ($this, name) {                                 // 735
          return { maxlength: $this.data("validation" + name + "Maxlength") };
        },                                                             //
        validate: function ($this, value, validator) {                 // 738
          return value.length > validator.maxlength && !validator.negative || value.length <= validator.maxlength && validator.negative;
        }                                                              //
      },                                                               //
      minlength: {                                                     // 743
        name: "minlength",                                             // 744
        init: function ($this, name) {                                 // 745
          return { minlength: $this.data("validation" + name + "Minlength") };
        },                                                             //
        validate: function ($this, value, validator) {                 // 748
          return value.length < validator.minlength && !validator.negative || value.length >= validator.minlength && validator.negative;
        }                                                              //
      },                                                               //
      maxchecked: {                                                    // 753
        name: "maxchecked",                                            // 754
        init: function ($this, name) {                                 // 755
          var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
          elements.bind("click.validation", function () {              // 757
            $this.trigger("change.validation", { includeEmpty: true });
          });                                                          //
          return { maxchecked: $this.data("validation" + name + "Maxchecked"), elements: elements };
        },                                                             //
        validate: function ($this, value, validator) {                 // 762
          return validator.elements.filter(":checked").length > validator.maxchecked && !validator.negative || validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative;
        },                                                             //
        blockSubmit: true                                              // 766
      },                                                               //
      minchecked: {                                                    // 768
        name: "minchecked",                                            // 769
        init: function ($this, name) {                                 // 770
          var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
          elements.bind("click.validation", function () {              // 772
            $this.trigger("change.validation", { includeEmpty: true });
          });                                                          //
          return { minchecked: $this.data("validation" + name + "Minchecked"), elements: elements };
        },                                                             //
        validate: function ($this, value, validator) {                 // 777
          return validator.elements.filter(":checked").length < validator.minchecked && !validator.negative || validator.elements.filter(":checked").length >= validator.minchecked && validator.negative;
        },                                                             //
        blockSubmit: true                                              // 781
      }                                                                //
    },                                                                 //
    builtInValidators: {                                               // 784
      email: {                                                         // 785
        name: "Email",                                                 // 786
        type: "shortcut",                                              // 787
        shortcut: "validemail"                                         // 788
      },                                                               //
      validemail: {                                                    // 790
        name: "Validemail",                                            // 791
        type: "regex",                                                 // 792
        regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,4}",    // 793
        message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
      },                                                               //
      passwordagain: {                                                 // 796
        name: "Passwordagain",                                         // 797
        type: "match",                                                 // 798
        match: "password",                                             // 799
        message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
      },                                                               //
      positive: {                                                      // 802
        name: "Positive",                                              // 803
        type: "shortcut",                                              // 804
        shortcut: "number,positivenumber"                              // 805
      },                                                               //
      negative: {                                                      // 807
        name: "Negative",                                              // 808
        type: "shortcut",                                              // 809
        shortcut: "number,negativenumber"                              // 810
      },                                                               //
      number: {                                                        // 812
        name: "Number",                                                // 813
        type: "regex",                                                 // 814
        regex: "([+-]?\\\d+(\\\.\\\d*)?([eE][+-]?[0-9]+)?)?",          // 815
        message: "Must be a number<!-- data-validator-number-message to override -->"
      },                                                               //
      integer: {                                                       // 818
        name: "Integer",                                               // 819
        type: "regex",                                                 // 820
        regex: "[+-]?\\\d+",                                           // 821
        message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
      },                                                               //
      positivenumber: {                                                // 824
        name: "Positivenumber",                                        // 825
        type: "min",                                                   // 826
        min: 0,                                                        // 827
        message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
      },                                                               //
      negativenumber: {                                                // 830
        name: "Negativenumber",                                        // 831
        type: "max",                                                   // 832
        max: 0,                                                        // 833
        message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
      },                                                               //
      required: {                                                      // 836
        name: "Required",                                              // 837
        type: "required",                                              // 838
        message: "This is required<!-- data-validator-required-message to override -->"
      },                                                               //
      checkone: {                                                      // 841
        name: "Checkone",                                              // 842
        type: "minchecked",                                            // 843
        minchecked: 1,                                                 // 844
        message: "Check at least one option<!-- data-validation-checkone-message to override -->"
      }                                                                //
    }                                                                  //
  };                                                                   //
                                                                       //
  var formatValidatorName = function (name) {                          // 850
    return name.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
      return p1 + p2.toUpperCase();                                    // 856
    });                                                                //
  };                                                                   //
                                                                       //
  var getValue = function ($this) {                                    // 862
    // Extract the value we're talking about                           //
    var value = $this.val();                                           // 864
    var type = $this.attr("type");                                     // 865
    if (type === "checkbox") {                                         // 866
      value = $this.is(":checked") ? value : "";                       // 867
    }                                                                  //
    if (type === "radio") {                                            // 869
      value = $('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : "";
    }                                                                  //
    return value;                                                      // 872
  };                                                                   //
                                                                       //
  function regexFromString(inputstring) {                              // 875
    return new RegExp("^" + inputstring + "$");                        // 876
  }                                                                    //
                                                                       //
  /**                                                                  //
   * Thanks to Jason Bunting via StackOverflow.com                     //
   *                                                                   //
   * http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#answer-359910
   * Short link: http://tinyurl.com/executeFunctionByName              //
  **/                                                                  //
  function executeFunctionByName(functionName, context /*, args*/) {   // 885
    var args = Array.prototype.slice.call(arguments).splice(2);        // 886
    var namespaces = functionName.split(".");                          // 887
    var func = namespaces.pop();                                       // 888
    for (var i = 0; i < namespaces.length; i++) {                      // 889
      context = context[namespaces[i]];                                // 890
    }                                                                  //
    return context[func].apply(this, args);                            // 892
  }                                                                    //
                                                                       //
  $.fn.jqBootstrapValidation = function (method) {                     // 895
                                                                       //
    if (defaults.methods[method]) {                                    // 897
      return defaults.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {                //
      return defaults.methods.init.apply(this, arguments);             // 900
    } else {                                                           //
      $.error('Method ' + method + ' does not exist on jQuery.jqBootstrapValidation');
      return null;                                                     // 903
    }                                                                  //
  };                                                                   //
                                                                       //
  $.jqBootstrapValidation = function (options) {                       // 908
    $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments);
  };                                                                   //
})(jQuery);                                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
