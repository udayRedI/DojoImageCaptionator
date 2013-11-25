require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/parser", "dojo/dom-style", "dojo/ready",
    "dijit/_WidgetBase",
], function(declare, domConstruct, parser, domStyle, ready, _WidgetBase){
    declare("imageCaptionator", [_WidgetBase], {
        // counter
        _i: 0,

        buildRendering: function(){
            // create the DOM for this widget
            imageURL = this.srcNodeRef.getAttribute('src');
            height = this.srcNodeRef.getAttribute('height');
            width = this.srcNodeRef.getAttribute('width');
            position = this.srcNodeRef.getAttribute('caption-position');

            if(position == "top" || position == "Top"){
                captionHeight = "0px";
            } else if(position == "bottom" || position == "Bottom") {
                captionHeight = parseInt(height)-20+"px";
            }

            this.domNode = domConstruct.create("div", {innerHTML:'<img src="'+imageURL+'"  height="'+height+'" width="'+width+'"/><div style="top:'+captionHeight+'" class="caption">Hello</div>' });
            domStyle.set(this.domNode, "max-width", width);
            domStyle.set(this.domNode, "position", "relative");
        },

        postCreate: function(){
            // every time the user clicks the button, increment the counter
            this.connect(this.domNode, "onmouseover", "captionVisible");
            this.connect(this.domNode, "onmouseout", "captionInvisible");
        },

        captionInvisible: function(){
           var captionNode = this.domNode.childNodes[1];
           domStyle.set(captionNode, "display", 'none');
        },

        captionVisible: function(){
            //this.domNode.innerHTML = ++this._i;
           var captionNode = this.domNode.childNodes[1];
           domStyle.set(captionNode, "display", 'block');
        }
    });

    ready(function(){
        // Call the parser manually so it runs after our widget is defined, and page has finished loading
        parser.parse();
    });
});

