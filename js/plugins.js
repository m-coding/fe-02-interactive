/* Instafeed.js - http://instafeedjs.com/ */
(function(){var e;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?M=["","random"]:M=this.options.sortBy.split("-"),O=M[0]==="least"?!0:!1;switch(M[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",O);break;case"liked":e.data=this._sortBy(e.data,"likes.count",O);break;case"commented":e.data=this._sortBy(e.data,"comments.count",O);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){m=e.data,A=parseInt(this.options.limit,10),this.options.limit!=null&&m.length>A&&(m=m.slice(0,A)),u=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(m=this._filter(m,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){f="",d="",w="",D=document.createElement("div");for(c=0,N=m.length;c<N;c++){h=m[c],p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);E=p.width,y=p.height,b="square",E>y&&(b="landscape"),E<y&&(b="portrait"),v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),d=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:v,width:E,height:y,orientation:b,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),f+=d}D.innerHTML=f,i=[],r=0,n=D.childNodes.length;while(r<n)i.push(D.childNodes[r]),r+=1;for(x=0,C=i.length;x<C;x++)L=i[x],u.appendChild(L)}else for(T=0,k=m.length;T<k;T++){h=m[T],g=document.createElement("img"),p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),g.src=v,this.options.links===!0?(t=document.createElement("a"),t.href=h.link,t.appendChild(g),u.appendChild(t)):u.appendChild(g)}_=this.options.target,typeof _=="string"&&(_=document.getElementById(_));if(_==null)throw o='No element with id="'+this.options.target+'" on page.',new Error(o);_.appendChild(u),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),S="instafeedCache"+this.unique,window[S]=void 0;try{delete window[S]}catch(P){s=P}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))s=n.match(r)[1],o=(i=this._getObjectProperty(t,s))!=null?i:"",n=n.replace(r,function(){return""+o});return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],r=function(e){if(t(e))return n.push(e)};for(i=0,o=e.length;i<o;i++)s=e[i],r(s);return n},e}(),function(e,t){return typeof define=="function"&&define.amd?define([],t):typeof module=="object"&&module.exports?module.exports=t():e.Instafeed=t()}(this,function(){return e})}).call(this);

/* simplyScroll 2 - http://logicbox.net/jquery/simplyscroll/ */
(function(c,j,i){c.fn.simplyScroll=function(a){return this.each(function(){new c.simplyScroll(this,a)})};var h={customClass:"simply-scroll",frameRate:24,speed:1,orientation:"horizontal",auto:!0,autoMode:"loop",manualMode:"end",direction:"forwards",pauseOnHover:!0,pauseOnTouch:!0,pauseButton:!1,startOnLoad:!1};c.simplyScroll=function(a,b){var g=this;this.o=c.extend({},h,b||{});this.isAuto=!1!==this.o.auto&&null!==this.o.autoMode.match(/^loop|bounce$/);this.isRTL=(this.isHorizontal=null!==this.o.orientation.match(/^horizontal|vertical$/)&&
this.o.orientation==h.orientation)&&"rtl"==c("html").attr("dir");this.isForwards=!this.isAuto||this.isAuto&&(null!==this.o.direction.match(/^forwards|backwards$/)&&this.o.direction==h.direction)&&!this.isRTL;this.isLoop=this.isAuto&&"loop"==this.o.autoMode||!this.isAuto&&"loop"==this.o.manualMode;this.events=(this.supportsTouch="createTouch"in document)?{start:"touchstart MozTouchDown",move:"touchmove MozTouchMove",end:"touchend touchcancel MozTouchRelease"}:{start:"mouseenter",end:"mouseleave"};
this.$list=c(a);var d=this.$list.children();this.$list.addClass("simply-scroll-list").wrap('<div class="simply-scroll-clip"></div>').parent().wrap('<div class="'+this.o.customClass+' simply-scroll-container"></div>');this.isAuto?this.o.pauseButton&&(this.$list.parent().parent().prepend('<div class="simply-scroll-btn simply-scroll-btn-pause"></div>'),this.o.pauseOnHover=!1):this.$list.parent().parent().prepend('<div class="simply-scroll-forward"></div>').prepend('<div class="simply-scroll-back"></div>');
if(1<d.length){var f=!1,e=0;this.isHorizontal?(d.each(function(){e=e+c(this).outerWidth(true)}),f=d.eq(0).outerWidth(!0)*d.length!==e):(d.each(function(){e=e+c(this).outerHeight(true)}),f=d.eq(0).outerHeight(!0)*d.length!==e);f&&(this.$list=this.$list.wrap("<div></div>").parent().addClass("simply-scroll-list"),this.isHorizontal?this.$list.children().css({"float":"left",width:e+"px"}):this.$list.children().css({height:e+"px"}))}this.o.startOnLoad?c(j).load(function(){g.init()}):this.init()};c.simplyScroll.fn=
c.simplyScroll.prototype={};c.simplyScroll.fn.extend=c.simplyScroll.extend=c.extend;c.simplyScroll.fn.extend({init:function(){this.$items=this.$list.children();this.$clip=this.$list.parent();this.$container=this.$clip.parent();this.$btnBack=c(".simply-scroll-back",this.$container);this.$btnForward=c(".simply-scroll-forward",this.$container);this.isHorizontal?(this.itemMax=this.$items.eq(0).outerWidth(!0),this.clipMax=this.$clip.width(),this.dimension="width",this.moveBackClass="simply-scroll-btn-left",
this.moveForwardClass="simply-scroll-btn-right",this.scrollPos="Left"):(this.itemMax=this.$items.eq(0).outerHeight(!0),this.clipMax=this.$clip.height(),this.dimension="height",this.moveBackClass="simply-scroll-btn-up",this.moveForwardClass="simply-scroll-btn-down",this.scrollPos="Top");this.posMin=0;this.posMax=this.$items.length*this.itemMax;var a=Math.ceil(this.clipMax/this.itemMax);if(this.isAuto&&"loop"==this.o.autoMode)this.$list.css(this.dimension,this.posMax+this.itemMax*a+"px"),this.posMax+=
this.clipMax-this.o.speed,this.isForwards?(this.$items.slice(0,a).clone(!0).appendTo(this.$list),this.resetPosition=0):(this.$items.slice(-a).clone(!0).prependTo(this.$list),this.resetPosition=this.$items.length*this.itemMax,this.isRTL&&(this.$clip[0].dir="ltr",this.$items.css("float","right")));else if(!this.isAuto&&"loop"==this.o.manualMode){this.posMax+=this.itemMax*a;this.$list.css(this.dimension,this.posMax+this.itemMax*a+"px");this.posMax+=this.clipMax-this.o.speed;this.$items.slice(0,a).clone(!0).appendTo(this.$list);
this.$items.slice(-a).clone(!0).prependTo(this.$list);this.resetPositionForwards=this.resetPosition=a*this.itemMax;this.resetPositionBackwards=this.$items.length*this.itemMax;var b=this;this.$btnBack.bind(this.events.start,function(){b.isForwards=false;b.resetPosition=b.resetPositionBackwards});this.$btnForward.bind(this.events.start,function(){b.isForwards=true;b.resetPosition=b.resetPositionForwards})}else this.$list.css(this.dimension,this.posMax+"px"),this.isForwards?this.resetPosition=0:(this.resetPosition=
this.$items.length*this.itemMax,this.isRTL&&(this.$clip[0].dir="ltr",this.$items.css("float","right")));this.resetPos();this.interval=null;this.intervalDelay=Math.floor(1E3/this.o.frameRate);if(this.isAuto||"end"!=this.o.manualMode)for(;0!==this.itemMax%this.o.speed;)if(this.o.speed--,0===this.o.speed){this.o.speed=1;break}b=this;this.trigger=null;this.funcMoveBack=function(a){a!==i&&a.preventDefault();b.trigger=!b.isAuto&&b.o.manualMode=="end"?this:null;b.isAuto?b.isForwards?b.moveBack():b.moveForward():
b.moveBack()};this.funcMoveForward=function(a){a!==i&&a.preventDefault();b.trigger=!b.isAuto&&b.o.manualMode=="end"?this:null;b.isAuto?b.isForwards?b.moveForward():b.moveBack():b.moveForward()};this.funcMovePause=function(){b.movePause()};this.funcMoveStop=function(){b.moveStop()};this.funcMoveResume=function(){b.moveResume()};if(this.isAuto){this.paused=!1;var g=function(){if(b.paused===false){b.paused=true;b.funcMovePause()}else{b.paused=false;b.funcMoveResume()}return b.paused};this.supportsTouch&&
this.$items.find("a").length&&(this.supportsTouch=!1);if(this.isAuto&&this.o.pauseOnHover&&!this.supportsTouch)this.$clip.bind(this.events.start,this.funcMovePause).bind(this.events.end,this.funcMoveResume);else if(this.isAuto&&this.o.pauseOnTouch&&!this.o.pauseButton&&this.supportsTouch){var d,f;this.$clip.bind(this.events.start,function(a){g();var c=a.originalEvent.touches[0];d=b.isHorizontal?c.pageX:c.pageY;f=b.$clip[0]["scroll"+b.scrollPos];a.stopPropagation();a.preventDefault()}).bind(this.events.move,
function(a){a.stopPropagation();a.preventDefault();a=a.originalEvent.touches[0];a=d-(b.isHorizontal?a.pageX:a.pageY)+f;if(a<0)a=0;else if(a>b.posMax)a=b.posMax;b.$clip[0]["scroll"+b.scrollPos]=a;b.funcMovePause();b.paused=true})}else this.o.pauseButton&&(this.$btnPause=c(".simply-scroll-btn-pause",this.$container).bind("click",function(a){a.preventDefault();g()?c(this).addClass("active"):c(this).removeClass("active")}));this.funcMoveForward()}else this.$btnBack.addClass("simply-scroll-btn "+this.moveBackClass).bind(this.events.start,
this.funcMoveBack).bind(this.events.end,this.funcMoveStop),this.$btnForward.addClass("simply-scroll-btn "+this.moveForwardClass).bind(this.events.start,this.funcMoveForward).bind(this.events.end,this.funcMoveStop),"end"==this.o.manualMode&&(!this.isRTL?this.$btnBack.addClass("disabled"):this.$btnForward.addClass("disabled"))},moveForward:function(){var a=this;this.movement="forward";null!==this.trigger&&this.$btnBack.removeClass("disabled");a.interval=setInterval(function(){a.$clip[0]["scroll"+a.scrollPos]<
a.posMax-a.clipMax?a.$clip[0]["scroll"+a.scrollPos]+=a.o.speed:a.isLoop?a.resetPos():a.moveStop(a.movement)},a.intervalDelay)},moveBack:function(){var a=this;this.movement="back";null!==this.trigger&&this.$btnForward.removeClass("disabled");a.interval=setInterval(function(){a.$clip[0]["scroll"+a.scrollPos]>a.posMin?a.$clip[0]["scroll"+a.scrollPos]-=a.o.speed:a.isLoop?a.resetPos():a.moveStop(a.movement)},a.intervalDelay)},movePause:function(){clearInterval(this.interval)},moveStop:function(a){this.movePause();
null!==this.trigger&&("undefined"!==typeof a&&c(this.trigger).addClass("disabled"),this.trigger=null);this.isAuto&&"bounce"==this.o.autoMode&&("forward"==a?this.moveBack():this.moveForward())},moveResume:function(){"forward"==this.movement?this.moveForward():this.moveBack()},resetPos:function(){this.$clip[0]["scroll"+this.scrollPos]=this.resetPosition}})})(jQuery,window);