(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-person-person-avatar-index"],{"02d29":function(t,e,n){"use strict";(function(t){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.getUserInfo=l,n("96cf");var i=a(n("1da1")),r=a(n("1dd9")),o=a(n("43c8"));function l(){return c.apply(this,arguments)}function c(){return c=(0,i.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading(),e.next=3,r.default.getUserInfoApi().then(function(){var t=(0,i.default)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200!==e.status){t.next=5;break}return t.next=3,o.default.dispatch("setUser",e.info);case 3:t.next=8;break;case 5:return t.next=7,r.default.logoutApi();case 7:o.default.dispatch("exitLogin");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch(function(){var e=(0,i.default)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.default.logoutApi();case 2:return e.next=4,o.default.dispatch("exitLogin");case 4:t.log(n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:return e.next=5,r.default.initMenuApi({return:0}).catch((function(t){return t}));case 5:uni.hideLoading();case 6:case"end":return e.stop()}}),e)}))),c.apply(this,arguments)}}).call(this,n("5a52")["default"])},"12bb":function(t,e,n){"use strict";n.r(e);var a=n("6ef8"),i=n("d1ef");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("9a0a");var o,l=n("f0c5"),c=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,"6fefbe5a",null,!1,a["a"],o);e["default"]=c.exports},2106:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={uNavbar:n("12bb").default,uButton:n("6012").default,uModal:n("f817").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"column"}},[n("u-navbar",{attrs:{title:"编辑头像","title-color":"black","back-text":"返回"},on:{"custom-back":function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[n("v-uni-view",{staticStyle:{"margin-right":"10rpx"},attrs:{slot:"right"},slot:"right"},[n("u-button",{staticStyle:{height:"66rpx",width:"116rpx","letter-spacing":"2rpx"},attrs:{type:"success"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.save.apply(void 0,arguments)}}},[t._v("保存")])],1)],1),n("v-uni-view",{staticClass:"u-avatar-wrap"},[n("v-uni-image",{staticClass:"u-avatar-demo",attrs:{src:t.avatar,mode:"aspectFill"}})],1),n("u-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseAvatar.apply(void 0,arguments)}}},[t._v("更换头像")]),n("u-modal",{attrs:{"show-confirm-button":t.showConfirm,"show-cancel-button":t.showCancel,width:"500rpx",title:t.modalTitle},on:{cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.modalShow=!1}},model:{value:t.modalShow,callback:function(e){t.modalShow=e},expression:"modalShow"}},[n("v-uni-view",{staticStyle:{height:"50rpx",width:"10rpx"}})],1)],1)},r=[]},"2bc2":function(t,e,n){"use strict";(function(t){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("1da1")),r=n("02d29"),o={data:function(){return{avatar:"",modalShow:!1,btnLoading:!1,showConfirm:!0,showCancel:!1,modalTitle:"",form:{avatar:""}}},onLoad:function(){},created:function(){var t=this;this.isLogin?this.$isEmpty(this.$store.getters.user)||(Object.assign(this.form,this.$store.getters.user),this.avatar=this.$isEmpty(this.userInfo["avatar"])?"/static/icon/user.png":this.$baseURL+this.$addBaseURL(this.userInfo["avatar"])):uni.switchTab({url:"/pages/person/index"}),uni.$on("uAvatarCropper",function(){var e=(0,i.default)(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.avatar=n,uni.showLoading(),e.next=4,t.$api.uploadApi(n).then((function(t){return t})).catch((function(t){return t}));case 4:a=e.sent,a=JSON.parse(a),200===a.status?t.form.avatar=a.res[0]["path"]:(t.modalTitle="上传失败",t.modalShow=!0),uni.hideLoading();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},methods:{goBack:function(){t.log("-1")},chooseAvatar:function(){this.$u.route({url:"/uview-ui/components/u-avatar-cropper/u-avatar-cropper",params:{destWidth:300,rectWidth:200,fileType:"jpg"}})},save:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={avatar:e.form.avatar},uni.showLoading(),n.next=4,e.$api.updateUserInfoApi(a).then(function(){var t=(0,i.default)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:uni.hideLoading(),200===n.status?uni.switchTab({url:"/pages/person/index"}):e.$isEmpty(n["msg"])?(e.modalTitle="发生未知错误",e.modalShow=!0):(e.modalTitle=n["msg"],e.modalShow=!0);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(n){t.log(n),uni.hideLoading(),e.modalTitle="发生未知错误",e.modalShow=!0}));case 4:(0,r.getUserInfo)();case 5:case"end":return n.stop()}}),n)})))()}},computed:{isLogin:function(){return!this.$isEmpty(this.$store.getters.token)},userInfo:function(){return this.$store.getters.user}},components:{},mounted:function(){}};e.default=o}).call(this,n("5a52")["default"])},"3d49":function(t,e,n){var a=n("631b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("3c69dab1",a,!0,{sourceMap:!1,shadowMode:!1})},"4dda":function(t,e,n){"use strict";var a=n("6184"),i=n.n(a);i.a},5593:function(t,e,n){"use strict";n.r(e);var a=n("2bc2"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},6012:function(t,e,n){"use strict";n.r(e);var a=n("b904"),i=n("ac67");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("7e46");var o,l=n("f0c5"),c=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,"5c660135",null,!1,a["a"],o);e["default"]=c.exports},6184:function(t,e,n){var a=n("bcff");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("517fbbe0",a,!0,{sourceMap:!1,shadowMode:!1})},"631b":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-navbar[data-v-6fefbe5a]{width:100%}.u-navbar-fixed[data-v-6fefbe5a]{position:fixed;left:0;right:0;top:0;z-index:991}.u-status-bar[data-v-6fefbe5a]{width:100%}.u-navbar-inner[data-v-6fefbe5a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;position:relative;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-back-wrap[data-v-6fefbe5a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-flex:0;-webkit-flex-grow:0;flex-grow:0;padding:%?14?% %?14?% %?14?% %?24?%}.u-back-text[data-v-6fefbe5a]{padding-left:%?4?%;font-size:%?30?%}.u-navbar-content-title[data-v-6fefbe5a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;position:absolute;left:0;right:0;height:%?60?%;text-align:center;-webkit-flex-shrink:0;flex-shrink:0}.u-navbar-centent-slot[data-v-6fefbe5a]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-title[data-v-6fefbe5a]{line-height:%?60?%;font-size:%?32?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-navbar-right[data-v-6fefbe5a]{-webkit-box-flex:1;-webkit-flex:1;flex:1;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.u-slot-content[data-v-6fefbe5a]{-webkit-box-flex:1;-webkit-flex:1;flex:1;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}',""]),t.exports=e},6709:function(t,e,n){"use strict";n.r(e);var a=n("2106"),i=n("5593");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("4dda");var o,l=n("f0c5"),c=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,"62cf7150",null,!1,a["a"],o);e["default"]=c.exports},"6ef8":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={uIcon:n("1210").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{},[n("v-uni-view",{staticClass:"u-navbar",class:{"u-navbar-fixed":t.isFixed,"u-border-bottom":t.borderBottom},style:[t.navbarStyle]},[n("v-uni-view",{staticClass:"u-status-bar",style:{height:t.statusBarHeight+"px"}}),n("v-uni-view",{staticClass:"u-navbar-inner",style:[t.navbarInnerStyle]},[t.isBack?n("v-uni-view",{staticClass:"u-back-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{attrs:{name:t.backIconName,color:t.backIconColor,size:t.backIconSize}})],1),t.backText?n("v-uni-view",{staticClass:"u-icon-wrap u-back-text u-line-1",style:[t.backTextStyle]},[t._v(t._s(t.backText))]):t._e()],1):t._e(),t.title?n("v-uni-view",{staticClass:"u-navbar-content-title",style:[t.titleStyle]},[n("v-uni-view",{staticClass:"u-title u-line-1",style:{color:t.titleColor,fontSize:t.titleSize+"rpx",fontWeight:t.titleBold?"bold":"normal"}},[t._v(t._s(t.title))])],1):t._e(),n("v-uni-view",{staticClass:"u-slot-content"},[t._t("default")],2),n("v-uni-view",{staticClass:"u-slot-right"},[t._t("right")],2)],1)],1),t.isFixed&&!t.immersive?n("v-uni-view",{staticClass:"u-navbar-placeholder",style:{width:"100%",height:Number(t.navbarHeight)+t.statusBarHeight+"px"}}):t._e()],1)},r=[]},"7e46":function(t,e,n){"use strict";var a=n("aaeb"),i=n.n(a);i.a},"89d0":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=uni.getSystemInfoSync(),i={},r={name:"u-navbar",props:{height:{type:[String,Number],default:""},backIconColor:{type:String,default:"#606266"},backIconName:{type:String,default:"nav-back"},backIconSize:{type:[String,Number],default:"44"},backText:{type:String,default:""},backTextStyle:{type:Object,default:function(){return{color:"#606266"}}},title:{type:String,default:""},titleWidth:{type:[String,Number],default:"250"},titleColor:{type:String,default:"#606266"},titleBold:{type:Boolean,default:!1},titleSize:{type:[String,Number],default:32},isBack:{type:[Boolean,String],default:!0},background:{type:Object,default:function(){return{background:"#ffffff"}}},isFixed:{type:Boolean,default:!0},immersive:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},zIndex:{type:[String,Number],default:""},customBack:{type:Function,default:null}},data:function(){return{menuButtonInfo:i,statusBarHeight:a.statusBarHeight}},computed:{navbarInnerStyle:function(){var t={};return t.height=this.navbarHeight+"px",t},navbarStyle:function(){var t={};return t.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.navbar,Object.assign(t,this.background),t},titleStyle:function(){var t={};return t.left=(a.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.right=(a.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.width=uni.upx2px(this.titleWidth)+"px",t},navbarHeight:function(){return this.height?this.height:44}},created:function(){},methods:{goBack:function(){"function"===typeof this.customBack?this.customBack.bind(this.$u.$parent.call(this))():uni.navigateBack()}}};e.default=r},"9a0a":function(t,e,n){"use strict";var a=n("3d49"),i=n.n(a);i.a},"9c67":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-btn[data-v-5c660135]::after{border:none}.u-btn[data-v-5c660135]{position:relative;border:0;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;overflow:visible;line-height:1;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;cursor:pointer;padding:0 %?40?%;z-index:1;box-sizing:border-box;-webkit-transition:all .15s;transition:all .15s}.u-btn--bold-border[data-v-5c660135]{border:1px solid #fff}.u-btn--default[data-v-5c660135]{color:#606266;border-color:#c0c4cc;background-color:#fff}.u-btn--primary[data-v-5c660135]{color:#fff;border-color:#2979ff;background-color:#2979ff}.u-btn--success[data-v-5c660135]{color:#fff;border-color:#19be6b;background-color:#19be6b}.u-btn--error[data-v-5c660135]{color:#fff;border-color:#fa3534;background-color:#fa3534}.u-btn--warning[data-v-5c660135]{color:#fff;border-color:#f90;background-color:#f90}.u-btn--default--disabled[data-v-5c660135]{color:#fff;border-color:#e4e7ed;background-color:#fff}.u-btn--primary--disabled[data-v-5c660135]{color:#fff!important;border-color:#a0cfff!important;background-color:#a0cfff!important}.u-btn--success--disabled[data-v-5c660135]{color:#fff!important;border-color:#71d5a1!important;background-color:#71d5a1!important}.u-btn--error--disabled[data-v-5c660135]{color:#fff!important;border-color:#fab6b6!important;background-color:#fab6b6!important}.u-btn--warning--disabled[data-v-5c660135]{color:#fff!important;border-color:#fcbd71!important;background-color:#fcbd71!important}.u-btn--primary--plain[data-v-5c660135]{color:#2979ff!important;border-color:#a0cfff!important;background-color:#ecf5ff!important}.u-btn--success--plain[data-v-5c660135]{color:#19be6b!important;border-color:#71d5a1!important;background-color:#dbf1e1!important}.u-btn--error--plain[data-v-5c660135]{color:#fa3534!important;border-color:#fab6b6!important;background-color:#fef0f0!important}.u-btn--warning--plain[data-v-5c660135]{color:#f90!important;border-color:#fcbd71!important;background-color:#fdf6ec!important}.u-hairline-border[data-v-5c660135]:after{content:" ";position:absolute;pointer-events:none;box-sizing:border-box;-webkit-transform-origin:0 0;transform-origin:0 0;left:0;top:0;width:199.8%;height:199.7%;-webkit-transform:scale(.5);transform:scale(.5);border:1px solid currentColor;z-index:1}.u-wave-ripple[data-v-5c660135]{z-index:0;position:absolute;border-radius:100%;background-clip:padding-box;pointer-events:none;-webkit-user-select:none;user-select:none;-webkit-transform:scale(0);transform:scale(0);opacity:1;-webkit-transform-origin:center;transform-origin:center}.u-wave-ripple.u-wave-active[data-v-5c660135]{opacity:0;-webkit-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1s linear,-webkit-transform .4s linear;transition:opacity 1s linear,-webkit-transform .4s linear;transition:opacity 1s linear,transform .4s linear;transition:opacity 1s linear,transform .4s linear,-webkit-transform .4s linear}.u-round-circle[data-v-5c660135]{border-radius:%?100?%}.u-round-circle[data-v-5c660135]::after{border-radius:%?100?%}.u-loading[data-v-5c660135]::after{background-color:hsla(0,0%,100%,.35)}.u-size-default[data-v-5c660135]{font-size:%?30?%;height:%?80?%;line-height:%?80?%}.u-size-medium[data-v-5c660135]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;width:auto;font-size:%?26?%;height:%?70?%;line-height:%?70?%;padding:0 %?80?%}.u-size-mini[data-v-5c660135]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;width:auto;font-size:%?22?%;padding-top:1px;height:%?50?%;line-height:%?50?%;padding:0 %?20?%}.u-primary-plain-hover[data-v-5c660135]{color:#fff!important;background:#2b85e4!important}.u-default-plain-hover[data-v-5c660135]{color:#2b85e4!important;background:#ecf5ff!important}.u-success-plain-hover[data-v-5c660135]{color:#fff!important;background:#18b566!important}.u-warning-plain-hover[data-v-5c660135]{color:#fff!important;background:#f29100!important}.u-error-plain-hover[data-v-5c660135]{color:#fff!important;background:#dd6161!important}.u-info-plain-hover[data-v-5c660135]{color:#fff!important;background:#82848a!important}.u-default-hover[data-v-5c660135]{color:#2b85e4!important;border-color:#2b85e4!important;background-color:#ecf5ff!important}.u-primary-hover[data-v-5c660135]{background:#2b85e4!important;color:#fff}.u-success-hover[data-v-5c660135]{background:#18b566!important;color:#fff}.u-info-hover[data-v-5c660135]{background:#82848a!important;color:#fff}.u-warning-hover[data-v-5c660135]{background:#f29100!important;color:#fff}.u-error-hover[data-v-5c660135]{background:#dd6161!important;color:#fff}',""]),t.exports=e},aaeb:function(t,e,n){var a=n("9c67");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("89237ebc",a,!0,{sourceMap:!1,shadowMode:!1})},ac67:function(t,e,n){"use strict";n.r(e);var a=n("d795"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},b904:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-button",{staticClass:"u-btn u-line-1 u-fix-ios-appearance",class:["u-size-"+t.size,t.plain?"u-btn--"+t.type+"--plain":"",t.loading?"u-loading":"","circle"==t.shape?"u-round-circle":"",t.hairLine?t.showHairLineBorder:"u-btn--bold-border","u-btn--"+t.type,t.disabled?"u-btn--"+t.type+"--disabled":""],style:[t.customStyle,{overflow:t.ripple?"hidden":"visible"}],attrs:{id:"u-wave-btn","hover-start-time":Number(t.hoverStartTime),"hover-stay-time":Number(t.hoverStayTime),disabled:t.disabled,"form-type":t.formType,"open-type":t.openType,"app-parameter":t.appParameter,"hover-stop-propagation":t.hoverStopPropagation,"send-message-title":t.sendMessageTitle,"send-message-path":"sendMessagePath",lang:t.lang,"data-name":t.dataName,"session-from":t.sessionFrom,"send-message-img":t.sendMessageImg,"show-message-card":t.showMessageCard,"hover-class":t.getHoverClass,loading:t.loading},on:{getphonenumber:function(e){arguments[0]=e=t.$handleEvent(e),t.getphonenumber.apply(void 0,arguments)},getuserinfo:function(e){arguments[0]=e=t.$handleEvent(e),t.getuserinfo.apply(void 0,arguments)},error:function(e){arguments[0]=e=t.$handleEvent(e),t.error.apply(void 0,arguments)},opensetting:function(e){arguments[0]=e=t.$handleEvent(e),t.opensetting.apply(void 0,arguments)},launchapp:function(e){arguments[0]=e=t.$handleEvent(e),t.launchapp.apply(void 0,arguments)},click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.click(e)}}},[t._t("default"),t.ripple?n("v-uni-view",{staticClass:"u-wave-ripple",class:[t.waveActive?"u-wave-active":""],style:{top:t.rippleTop+"px",left:t.rippleLeft+"px",width:t.fields.targetWidth+"px",height:t.fields.targetWidth+"px","background-color":t.rippleBgColor||"rgba(0, 0, 0, 0.15)"}}):t._e()],2)},r=[]},bcff:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-62cf7150]{background-color:#f4f6f8}.u-avatar-wrap[data-v-62cf7150]{margin-top:%?80?%;overflow:hidden;margin-bottom:%?80?%;text-align:center}.u-avatar-demo[data-v-62cf7150]{width:%?150?%;height:%?150?%;border-radius:%?100?%}body.?%PAGE?%[data-v-62cf7150]{background-color:#f4f6f8}',""]),t.exports=e},d1ef:function(t,e,n){"use strict";n.r(e);var a=n("89d0"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},d795:function(t,e,n){"use strict";n("c975"),n("a9e3"),n("d3b7"),n("ac1f"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-button",props:{hairLine:{type:Boolean,default:!0},type:{type:String,default:"default"},size:{type:String,default:"default"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},openType:{type:String,default:""},formType:{type:String,default:""},appParameter:{type:String,default:""},hoverStopPropagation:{type:Boolean,default:!1},lang:{type:String,default:"en"},sessionFrom:{type:String,default:""},sendMessageTitle:{type:String,default:""},sendMessagePath:{type:String,default:""},sendMessageImg:{type:String,default:""},showMessageCard:{type:Boolean,default:!1},hoverBgColor:{type:String,default:""},rippleBgColor:{type:String,default:""},ripple:{type:Boolean,default:!1},hoverClass:{type:String,default:""},customStyle:{type:Object,default:function(){return{}}},dataName:{type:String,default:""},throttleTime:{type:[String,Number],default:1e3},hoverStartTime:{type:[String,Number],default:20},hoverStayTime:{type:[String,Number],default:150}},computed:{getHoverClass:function(){if(this.loading||this.disabled||this.ripple||this.hoverClass)return"";var t="";return t=this.plain?"u-"+this.type+"-plain-hover":"u-"+this.type+"-hover",t},showHairLineBorder:function(){return["primary","success","error","warning"].indexOf(this.type)>=0&&!this.plain?"":"u-hairline-border"}},data:function(){return{rippleTop:0,rippleLeft:0,fields:{},waveActive:!1}},methods:{click:function(t){var e=this;this.$u.throttle((function(){!0!==e.loading&&!0!==e.disabled&&(e.ripple&&(e.waveActive=!1,e.$nextTick((function(){this.getWaveQuery(t)}))),e.$emit("click",t))}),this.throttleTime)},getWaveQuery:function(t){var e=this;this.getElQuery().then((function(n){var a=n[0];if(a.width&&a.width&&(a.targetWidth=a.height>a.width?a.height:a.width,a.targetWidth)){e.fields=a;var i="",r="";i=t.touches[0].clientX,r=t.touches[0].clientY,e.rippleTop=r-a.top-a.targetWidth/2,e.rippleLeft=i-a.left-a.targetWidth/2,e.$nextTick((function(){e.waveActive=!0}))}}))},getElQuery:function(){var t=this;return new Promise((function(e){var n="";n=uni.createSelectorQuery().in(t),n.select(".u-btn").boundingClientRect(),n.exec((function(t){e(t)}))}))},getphonenumber:function(t){this.$emit("getphonenumber",t)},getuserinfo:function(t){this.$emit("getuserinfo",t)},error:function(t){this.$emit("error",t)},opensetting:function(t){this.$emit("opensetting",t)},launchapp:function(t){this.$emit("launchapp",t)}}};e.default=a}}]);