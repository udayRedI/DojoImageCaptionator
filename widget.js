require([
    "dojo/_base/declare", "dojo/parser", "dojo/ready", "dojo/on", "dojo/mouse", "dojo/dom-style",
    "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/_base/lang"
], function(declare, parser, ready, on, mouse, style, _WidgetBase, _TemplatedMixin, lang){

    declare("ImageCaptionator", [_WidgetBase, _TemplatedMixin], {
        templateString:
            "<div class='imageCaptionator'>" +
                "<div class='caption' data-dojo-attach-point='captionNode'></div>" +
                "<img data-dojo-attach-point='imageNode'></img>" +
            "</div>",

        caption: "unknown",
        _setCaptionAttr: { node: "captionNode", type: "innerHTML" },

        image: null,
        _setImageAttr: {node: "imageNode", type: "attribute", attribute: "src" },

        imageHeight: "100px",
        _setImageHeightAttr: function(height){
            style.set(this.imageNode, "height", height);
            style.set(this.domNode, "height", height);
        },

        imageWidth: "50px",
        _setImageWidthAttr: function(width){
            style.set(this.captionNode, "width", width);
            style.set(this.imageNode, "width", width);
            style.set(this.domNode, "width", width);
        },

        captionPosition: "bottom",
        _setCaptionPositionAttr: function(position){
            this.captionPosition = position;
        },

        postCreate: function(){
            style.set(this.captionNode, "display", "block");
            if(this.captionPosition == "top" || this.captionPosition == "Top" || this.captionPosition == "TOP"){
                var captionHeight = style.get(this.captionNode, "height");
                var padding = style.get(this.captionNode, "padding");
                var imageHeight = style.get(this.imageNode, "height")
                var topValue = imageHeight - captionHeight - (2 * padding);
                style.set(this.captionNode, "top", "-"+topValue+"px");
            } else if(this.captionPosition == "bottom" || this.captionPosition == "Bottom" || this.captionPosition == "BOTTOM"){
                var imageHeight = style.get(this.imageNode, "height")
                style.set(this.captionNode, "top", imageHeight+"px");
            }

            on(this.imageNode, mouse.enter, lang.hitch(this,"_mouseEnter"));
            on(this.imageNode, mouse.leave, lang.hitch(this,"_mouseLeave"));
        },

        _mouseEnter: function(){
            if(this.captionPosition == "top" || this.captionPosition == "Top" || this.captionPosition == "TOP"){
                this._topPositionSlideDown();
            } else if(this.captionPosition == "bottom" || this.captionPosition == "Bottom" || this.captionPosition == "BOTTOM"){
                this._bottomPositionSlideUp();
            }
        },
        
        _mouseLeave: function(){
            if(this.captionPosition == "top" || this.captionPosition == "Top" || this.captionPosition == "TOP"){
                this._topPositionSlideUp();
            } else if(this.captionPosition == "bottom" || this.captionPosition == "Bottom" || this.captionPosition == "BOTTOM"){
                this._bottomPositionSlideDown();
            }
        },

        _topPositionSlideUp: function(){
             var captionHeight = style.get(this.captionNode, "height");
             var padding = style.get(this.captionNode, "padding");
             var imageHeight = style.get(this.imageNode, "height")
             var topValue = imageHeight - captionHeight - (2 * padding);
             style.set(this.captionNode, "top", "-"+topValue+"px");
        },

        _topPositionSlideDown: function(){
            style.set(this.captionNode, "top", "0px");
        },

        _bottomPositionSlideUp: function(){
            var captionHeight = style.get(this.captionNode, "height");
            var padding = style.get(this.captionNode, "padding");
            var imageHeight = style.get(this.imageNode, "height");
            var topValue = imageHeight - captionHeight - (2 * padding);
            style.set(this.captionNode, "top", topValue+"px");
        },

        _bottomPositionSlideDown: function(){
            var imageHeight = style.get(this.imageNode, "height");
            style.set(this.captionNode, "top", imageHeight+"px");
        }
    });
    ready(function(){
        parser.parse();
    });
});
