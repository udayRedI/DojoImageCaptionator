
            require([
                "dojo/_base/declare", "dojo/parser", "dojo/ready", "dojo/on", "dojo/mouse", "dojo/dom-style",
                "dijit/_WidgetBase", "dijit/_TemplatedMixin"
            ], function(declare, parser, ready, on, mouse, style, _WidgetBase, _TemplatedMixin){
           
                declare("BusinessCard", [_WidgetBase, _TemplatedMixin], {
                    templateString:
                        "<div class='imageCaptionator'>" +
                            "<div class='caption' data-dojo-attach-point='captionNode'></div>" +
                            "<img data-dojo-attach-point='imageNode'></img>" +
                        "</div>",
           
                    caption: "unknown",
                    _setCaptionAttr: { node: "captionNode", type: "innerHTML" },
           
                    image: null,
                    _setImageAttr: {node: "imageNode", type: "attribute", attribute: "src" },
           
                    height: "100px",
                    _setHeightAttr: function(height){
                        style.set(this.imageNode, "height", this.height);
                        style.set(this.domNode, "height", this.height);
                    },
                    //{node: "imageNode", type: "attribute", attribute: "height" },

                    width: "50px",
                    _setWidthAttr: function(width){
                        style.set(this.captionNode, "width", this.width);
                        style.set(this.imageNode, "width", this.width);
                        style.set(this.domNode, "width", this.width);
                    },

                    captionPosition: "bottom",
                    _setCaptionPositionAttr: function(position){
                        this.captionPosition = position;
                    },

                    postCreate: function(){
                        if(this.captionPosition == "top" || this.captionPosition == "Top" || this.captionPosition == "TOP"){
                            style.set(this.captionNode, "top", "0px");
                        } else if(this.captionPosition == "bottom" || this.captionPosition == "Bottom" || this.captionPosition == "BOTTOM"){
                            var captionWidth = style.get(this.captionNode, "height");
                            var padding = style.get(this.captionNode, "padding");
                            var topValue = style.get(this.imageNode, "height") - captionWidth - 2 * padding;
                            style.set(this.captionNode, "top", topValue+"px");
                        }
                            style.set(this.captionNode, "display", "block");
                    }
                });
                ready(function(){
                    parser.parse();
                });
            });
