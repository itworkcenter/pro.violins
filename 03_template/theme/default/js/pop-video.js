+ function (win, doc) {
    // EXTENSION JSON OBJECT
    function extendJson(one, two) {
        if (one && two) {
            for (var i in two) {
                one[i] = two[i];
            }
        }
        return one;
    }
    // CREATE ELEMENT
    function tagCreate(tagStr, attrs) {
        var tag = doc.createElement(tagStr);
        if (attrs) {
            for (var i in attrs) {
                tag.setAttribute(i, attrs[i]);
            }
        }
        return tag;
    }
    //GET TAG
    function getTag(tagStr) {
        return doc.getElementsByTagName(tagStr);
    }
    // GET CLASS
    function getClass(classStr) {
        return doc.getElementsByClassName(classStr);
    }
    // GET CLASS
    function getId(classStr) {
        return doc.getElementById(classStr);
    }
    // QUERY ALL
    function getAll(selector, target) {
        var obj = doc;

        if (target) {
            obj = target;
        }
        return obj.querySelectorAll(selector);
    }
    // ADD CHILD
    function tagAdd(target, tags) {
        function add(o) {
            target.appendChild(o);
        }
        if (tags.length > 0) {
            for (var i in tags) {
                if (tags[i]) {
                    add(tags[i]);
                }
            }
        } else {
            add(tags);
        }
        return;
    }
    
    //FIXED EVENTS
    var isTouch = ("ontouchstart" in window),
    event = isTouch ? "touch" : "mouse",
    startEvent = event + (isTouch ? "start" : "down"),
    endEvent = event + (isTouch ? "end" : "up"),
    clickEvent = isTouch ? "touchstart" : "click",
    moveEvent = event + "move",
    outEvent = event + "out";

    // OBJECT DEFINITAION
    var OBJ = function (options) {
        var names = {};

        if (options && options.names) {
            names = options.names;
        }

        this.names = extendJson(OBJ.NAMES, names);
        this.options = extendJson(OBJ.DEFAULTS, options);

        this.init();
    };
    OBJ.NAMES = {
        el: "popVideo",
        elInner: "popVideo-inner",
        box: "popVideo-box",
        boxInner: "popVideo-box-inner",
        close: "popVideo-close",
        show: "popVideo-show",
        styleId: "PopVideoStyle",
        info: "popVideo-info"
    }
    OBJ.DEFAULTS = {
        with: 800,
        height: 472,
        ratio: 1,
        src: "",
        initialized: function(){},
        infoContent: "",
        style: '.popVideo{position: fixed;top: 0;bottom: 0;left: 0;right: 0;display: none;background: rgba(0, 0, 0, .8);z-index: 1000;text-align: center;overflow-y: auto;padding-top: 20px}.popVideo.open{display: block}.popVideo-inner{position: relative;display: inline-block;min-width: 640px;vertical-align: middle}.popVideo-box:before{content: "";display: block;padding-top: 57%}.popVideo-box{position: relative;width: 100%;background: #000}.popVideo-box-inner{position: absolute;top: 0;left: 0;right: 0;bottom: 0;padding: 10px}.popVideo-close:before,.popVideo-close:after{content: "";position: absolute;top: 50%;left: 10%;margin-top: -1px;width: 80%;height: 2px;background: #fff;-ms-transform: rotate(45deg);-webkit-transform: rotate(45deg);transform: rotate(45deg)}.popVideo-close:after{-ms-transform: rotate(135deg);-webkit-transform: rotate(135deg);transform: rotate(135deg)}.popVideo-close{position: absolute;top: -10px;right: -10px;width: 24px;height: 24px;border-radius: 12px;box-sizing: border-box;border: 2px solid #fff;cursor: pointer;background: #000}.popVideo:before{content: "";display: inline-block;height: 100%;vertical-align: middle}.popVideo-show{display: inline-block;width: 100%;height: 100%;vertical-align: middle}@media screen and (max-width: 768px){.popVideo-inner{width: 95%;min-width: auto}}.popVideo-info,.popVideo-info *{color: white;line-height: 24px;margin: 0}.popVideo-info{padding: 15px}',
        elSelector: "." + OBJ.NAMES.el,
        boxSelector: "." + OBJ.NAMES.box,
        boxInnerSelector: "." + OBJ.NAMES.boxInner,
        closeSelector: "." + OBJ.NAMES.close,
        showSelector: "." + OBJ.NAMES.show,
        styleSelector: "#" + OBJ.NAMES.styleId,
        infoSelector: "." + OBJ.NAMES.info,
        templateFun: function (src) {
            return '<div class="' + OBJ.NAMES.elInner + '">' +
                   '    <div class="' + OBJ.NAMES.box + '">' +
                   '        <div class="' + OBJ.NAMES.boxInner + '">' +
                   '            <div class="' + OBJ.NAMES.close + '"></div>' +
                   '            <iframe class="' + OBJ.NAMES.show + '" frameborder="0" hspace="0" scrolling="auto" src="' + src + '"></iframe>' +
                   '        </div>' +
                   '    </div>'+
                   '    <div class="' + OBJ.NAMES.info + '"></div>'+
                   '</div>';
        }
    };
    // ALIAS
    OBJ.fn = OBJ.prototype;

    OBJ.fn.init = function () {
        var self = this,
            $style = (self.$style = tagCreate("style", {
                id: self.names.styleId
            })),
            $el = (self.$el = tagCreate("div", {
                id: self.names.el + (new Date()).getTime(),
                class: self.names.el + " open",
            }));

        $el.innerHTML = self.options.templateFun(self.options.src);
        $style.innerHTML = self.options.style;
        self.$body = getTag("body")[0];
        self.$close = getAll(self.options.closeSelector, self.$el);
        self.$info = getAll(self.options.infoSelector, self.$el);
        
        if(self.options.infoContent){
            self.$info[0].innerHTML = self.options.infoContent;
        }

        // INITAILIZE TAG
        tagAdd(self.$body, $el);

        if (!getId(self.names.styleId)) {
            tagAdd(getTag("head")[0], $style);
        }

        // INITIALIZED CALLBACK

        if(self.options.initialized){
            self.options.initialized($el);
        }

        function close() {
            self.$body.removeChild(self.$el);
        }

        // CLOSE
        self.$close[0].addEventListener(clickEvent, function (e) {
            e.stopPropagation();
            e.preventDefault();
            close();
            return false;
        });
        self.$el.addEventListener(clickEvent, function (e) {
            if(e.target.id){
                e.stopPropagation();
                e.preventDefault();
                close();
                return false;
            }
        });

    }
    win.PopVideo = OBJ;
}(window, document);
