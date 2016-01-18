(function (root, factory) {

        "use strict";

        // CommonJS module is defined
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory(require('jquery')(root));
        }
        // AMD module is defined
        else if (typeof define === "function" && define.amd) {
            define("toggler", ["jquery"], function ($) {
                return factory($);
            });
        } else {
            // planted over the root!
            root.toggler = factory(root.jQuery);
        }

    }(this, function ($) {

        "use strict";

        var toggler = function (options) {

            this.defaultOptions = $.extend(true, {
                url: "",
                cls : {
                    1 : "btn-success",
                    2 : "btn-danger"
                },
                status: {
                    1: true,
                    2: false
                },
                aditionalData: {}
            }, toggler.defaultOptions);

            this.initOptions(options);
        };

        toggler.prototype = {

            pk: 0,
            $cont: [],
            $buttons: [],

            initOptions: function(options) {
                this.options = $.extend(true, this.defaultOptions, options);
                return this;
            },

            bindClickEvents: function(){

                var me = this;

                this.$buttons.on('click', function(e){

                    var $this = $(this),
                        $input = $this.find("input"),
                        val = $input.val();

                    //prevent for doing anything while waiting for ajax to finish
                    if (true === $this.hasClass("disabled")){
                        return false;
                    }
                    //make sure we do nothign if user clicks on the same status
                    if ( true === $this.hasClass(me.options.cls[val])){
                        return false;
                    }

                    me.$cont.trigger("toggleClick", [val, $this]);
                });
            },

            bindGlobalEvents: function(){
                this.$cont.on("toggleClick", $.proxy(this.onToggleClick, this) );
            },

            toggleOtherButtonClass: function($label, original_value){

                var $other_input = this.$cont.find('input[value="' + (original_value ? 2 : 1) + '"]'),
                    $other_label = $other_input.parent();

                $other_label.toggleClass("btn-secondary "+ this.options.cls[original_value ? 2 : 1]);
            },

            toggleButtonClasses: function(state, $label){

                $label.toggleClass("btn-secondary "+ this.options.cls[state ? 1 : 2]);

                this.toggleOtherButtonClass($label, state);
            },

            callAjax: function(val, label){

                var me = this,
                    formData = $.extend({
                        pk: this.pk,
                        status: this.options.status[val]
                    }, this.options.aditionalData);

                me.$buttons.addClass("disabled");

                $.get(this.options.url, formData).done(function(e) {

                    me.toggleButtonClasses(me.options.status[val], label);

                    me.$cont.trigger("onSuccess", [me, arguments]);
                })
                .fail(function() {

                    me.$cont.trigger("onError", [me, arguments]);
                }).always(function(){
                    me.$buttons.removeClass("disabled");
                });
            },

            onToggleClick: function(e, val, label){
                this.callAjax(val, label);
            },

            init: function(el){

                this.$cont = el;
                this.$buttons = el.find("label");
                this.pk = el.data('pk');

                this.bindGlobalEvents();
                this.bindClickEvents();

            }
        }

        $.fn.toggleButtons = function(options) {
            $(this).each(function(index, el){
                new toggler(options).init($(el));
            });
            return $(this);
        };

    })
);
