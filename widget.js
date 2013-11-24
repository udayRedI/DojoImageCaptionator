require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/parser", "dojo/dom-style", "dojo/ready",
    "dijit/_WidgetBase",
], function(declare, domConstruct, parser, domStyle, ready, _WidgetBase){
    declare("Counter", [_WidgetBase], {
        // counter
        _i: 0,

        buildRendering: function(){
            // create the DOM for this widget
            imageURL = this.srcNodeRef.getAttribute('src');
            this.domNode = domConstruct.create("span", {innerHTML:'<img src="'+imageURL+'"  height=200px width=150px/><div class="caption">Hello</div>' });
        },

        postCreate: function(){
            // every time the user clicks the button, increment the counter
            this.connect(this.domNode, "onmouseover", "captionOut");
            this.connect(this.domNode, "onmouseout", "captionIn");
        },

        captionOut: function(){
            //this.domNode.innerHTML = ++this._i;
           var captionNode = this.domNode.childNodes[1];
           domStyle.set(captionNode, "display", 'none');
        },

        captionIn: function(){
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

