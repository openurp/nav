/**
 * AdminLTE Demo Menu
 */
$(function () {
    'use strict'

    $('[data-toggle="control-sidebar"]').controlSidebar()
    $('[data-toggle="push-menu"]').pushMenu()
    var $pushMenu = $('[data-toggle="push-menu"]').data('lte.pushmenu')
    var $controlSidebar = $('[data-toggle="control-sidebar"]').data('lte.controlsidebar')
    var $layout = $('body').data('lte.layout')
    $(window).on('load', function() {
        // Reinitialize variables on load
        $pushMenu = $('[data-toggle="push-menu"]').data('lte.pushmenu')
        $controlSidebar = $('[data-toggle="control-sidebar"]').data('lte.controlsidebar')
        $layout = $('body').data('lte.layout')
    })

    var mySkins = [
        'skin-blue',
        'skin-black',
        'skin-red',
        'skin-yellow',
        'skin-purple',
        'skin-green',
        'skin-blue-light',
        'skin-black-light',
        'skin-red-light',
        'skin-yellow-light',
        'skin-purple-light',
        'skin-green-light'
    ]

    function get(name) {
        if (typeof (Storage) !== 'undefined') {
            return localStorage.getItem(name)
        } else {
            window.alert('Please use a modern browser to properly view this template!')
        }
    }

    function store(name, val) {
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem(name, val)
        } else {
            window.alert('Please use a modern browser to properly view this template!')
        }
    }

    function changeLayout(cls) {
        $('body').toggleClass(cls)
        $layout.fixSidebar()
        if ($('body').hasClass('fixed') && cls == 'fixed') {
            $pushMenu.expandOnHover()
            $layout.activate()
        }
        $controlSidebar.fix()
    }

    function changeSkin(cls) {
        $.each(mySkins, function (i) {
            $('body').removeClass(mySkins[i])
        })

        $('body').addClass(cls)
        store('skin', cls)
        return false
    }
    function setup() {
        var tmp = get('skin')
        if (tmp && $.inArray(tmp, mySkins))
            changeSkin(tmp)

        // Add the change skin listener
        $('[data-skin]').on('click', function (e) {
            if ($(this).hasClass('knob'))
                return
            e.preventDefault()
            changeSkin($(this).data('skin'))
        })

        // Add the layout manager
        $('[data-layout]').on('click', function () {
            changeLayout($(this).data('layout'))
        })

        $('[data-controlsidebar]').on('click', function () {
            changeLayout($(this).data('controlsidebar'))
            var slide = !$controlSidebar.options.slide

            $controlSidebar.options.slide = slide
            if (!slide)
                $('.control-sidebar').removeClass('control-sidebar-open')
        })

        //  Reset options
        if ($('body').hasClass('fixed')) {
            $('[data-layout="fixed"]').attr('checked', 'checked')
        }
    }

    // Create the new tab
    var $tabPane = $('<div />', {
        'id': 'control-sidebar-theme-options-tab',
        'class': 'tab-pane active'
    })

    // Create the tab button
    var $tabButton = $('<li />', {'class': 'active'})
        .html('<a href=\'#control-sidebar-theme-options-tab\' data-toggle=\'tab\'>'
            + '<i class="fa fa-wrench"></i>'
            + '</a>')

    // Add the tab button to the right sidebar tabs
    $('[href="#control-sidebar-home-tab"]')
        .parent()
        .before($tabButton)

    // Create the menu
    var $demoSettings = $('<div />')

    // Layout options
    $demoSettings.append(
        '<h4 class="control-sidebar-heading">'
        + '布局选项'
        + '</h4>'
        // Fixed layout
        + '<div class="form-group">'
        + '<label class="control-sidebar-subheading">'
        + '<input type="checkbox"data-layout="fixed" class="pull-right"/> '
        + '固定头部导航'
        + '</label>'
        + '</div>'
    )
    var $skinsList = $('<ul />', {'class': 'list-unstyled clearfix'})

    // Dark sidebar skins
    var $skinBlue =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-blue" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px; background: #367fa9"></span><span class="bg-light-blue" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinBlue)
    var $skinBlack =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-black" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div style="box-shadow: 0 0 2px rgba(0,0,0,0.1)" class="clearfix"><span style="display:block; width: 20%; float: left; height: 7px; background: #fefefe"></span><span style="display:block; width: 80%; float: left; height: 7px; background: #fefefe"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #222"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinBlack)
    var $skinPurple =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-purple" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-purple-active"></span><span class="bg-purple" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinPurple)
    var $skinGreen =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-green" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-green-active"></span><span class="bg-green" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinGreen)
    var $skinRed =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-red" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-red-active"></span><span class="bg-red" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinRed)
    var $skinYellow =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-yellow" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-yellow-active"></span><span class="bg-yellow" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinYellow)


    // Light sidebar skins
    var $skinBlueLight =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-blue-light" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px; background: #367fa9"></span><span class="bg-light-blue" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinBlueLight)
    var $skinBlackLight =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-black-light" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div style="box-shadow: 0 0 2px rgba(0,0,0,0.1)" class="clearfix"><span style="display:block; width: 20%; float: left; height: 7px; background: #fefefe"></span><span style="display:block; width: 80%; float: left; height: 7px; background: #fefefe"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinBlackLight)
    var $skinPurpleLight =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-purple-light" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-purple-active"></span><span class="bg-purple" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinPurpleLight)
    var $skinGreenLight =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-green-light" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-green-active"></span><span class="bg-green" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinGreenLight)
    var $skinRedLight =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-red-light" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-red-active"></span><span class="bg-red" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinRedLight)
    var $skinYellowLight =
        $('<li />', {style: 'float:left; width: 33.33333%; padding: 5px;'})
            .append('<a href="javascript:void(0)" data-skin="skin-yellow-light" style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover">'
                + '<div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-yellow-active"></span><span class="bg-yellow" style="display:block; width: 80%; float: left; height: 7px;"></span></div>'
                + '<div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>'
                + '</a>')
    $skinsList.append($skinYellowLight)

    $demoSettings.append('<h4 class="control-sidebar-heading">皮肤</h4>')
    $demoSettings.append($skinsList)

    $tabPane.append($demoSettings)
    $('#control-sidebar-home-tab').after($tabPane)

    setup()

    try{
    $('[data-toggle="tooltip"]').tooltip()
    }catch(e){}
})

// urp nav
  function messageCallBack(c){
    jQuery('#newly-message-count').text(c)
  }

  if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
       return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

$(function () {
    'use strict'

 /**
  * @domainMenus
  *    {domain:{},children:[],appMenus:[{app:{},menus:[]},{app:{},menus:[]}]}
  */
  function Nav(app,home,domainMenus,params){
    this.home=home;
    this.app=app;
    this.apps=[];
    this.domains=[];
    this.appMenus={};
    this.menuDomId="menu_ul";
    this.navDomId="top_nav_bar";
    this.sysName=null;
    if(params){
      if(params.menuDomId){
        this.menuDomId=params.menuDomId;
      }
      if(params.navDomId){
        this.navDomId=params.navDomId;
      }
      if(params.sysName){
        this.sysName=params.sysName;
      }
    }
    this.currentDomainId="";
    //多个domain,参数是一个顶级domain,children是多个domain,且没有菜单
    if(domainMenus.appMenus==null || domainMenus.appMenus.length==0){
      this.domainMenus=domainMenus.children;
      for(var i=0;i < this.domainMenus.length; i++){
        this.domains.push(this.domainMenus[i].domain);
      }
    }else{//单一domain
      this.domainMenus=[domainMenus];
    }

    this.params=params;
    this.maxTopItem=8;

    this.menuTempalte='<li><a onclick="return bg.Go(this,\'main\')" href="{menu.entry}" target="main" ><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
    if(document.getElementById('main').tagName!='DIV'){
      this.menuTempalte='<li><a target="main" href="{menu.entry}"><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
    }
    this.foldTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{menu.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu{menu.id}"></ul></li>'
    this.appFoldTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{app.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu_app{app.id}"></ul></li>'
    if(!this.app.navStyle){
     this.app.navStyle="unkown";
    }
    this.collectApps();
    if(!this.sysName){
      this.sysName=this.app.title;
    }
  }

  Nav.prototype={
    processUrl:function(url){
      if(url.indexOf('{') == -1) return url;
      for(var name in this.params){
        url = url.replace('{'+name+'}',this.params[name]);
      }
      return url;
    },
      /**
       * 收集domain中的apps，以及每个app对应的菜单
       */
    collectApps : function(){
      for(var p=0;p < this.domainMenus.length;p++){
        var childrenApps=this.domainMenus[p].appMenus; // a domain contain many app
        var domain=this.domainMenus[p].domain;
        for(var i=0;i<childrenApps.length;i++){
          var app = childrenApps[i].app;
          if(!app.domain){
            app.domain=domain;
          }
          this.appMenus[app.name]=childrenApps[i].menus;
          if(app.name==this.home.name){
            this.home.title=app.title;
            this.home.url=app.url;
          } else if(app.name==this.app.name){
            app.base=this.app.base;
            this.app.domain=domain;
            this.app.title=app.title;
            this.app.id=app.id;
            this.apps.push(app);
          } else {
            this.apps.push(app);
          }
          //去除appbase的结尾斜线，因为资源的形式为/path/to/uri
          if(app.base.endsWith("/")){
            app.base=app.base.substring(0,app.base.length-1);
          }
          app.base = this.processUrl(app.base);
          app.embeddable=true;
          if(app.navStyle != this.app.navStyle){
            app.embeddable=false;
          }
          if(!urp.sameDomain(this.app.base,app.base)){
            app.embeddable=false;
          }
        }
      }
    },
    /**
     * 在左侧菜单栏创建菜单
     */
    createMenus:function(jqueryElem,app,menus){
      jqueryElem.empty();
      var menuItem='';
      for(var i=0; i <menus.length;i++){
        var menu = menus[i];
        if(menu.menus){//app
          var appItem = this.appFoldTemplate.replace('{app.id}',menu.app.id);
          appItem = appItem.replace('{app.title}',menu.app.title);
          appItem = appItem.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(appItem);
          this.createMenus(jQuery('#menu_app'+menu.app.id),menu.app,menu.menus);
        }else if(menu.children){//fold
          menuItem = this.foldTemplate.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(menuItem);
          this.createMenus(jQuery('#menu'+menu.id),app,menu.children);
        }else{//menu
          menuItem = this.menuTempalte.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{menu.entry}',this.processUrl(app.base+menu.entry));
          jqueryElem.append(menuItem);
        }
      }
    },
    activate:function(){
      var that=this;
      jQuery("#"+this.menuDomId+" li a").click(function() {
        if(this.href=="javascript:void(0)"){
          jQuery(this).parent('li').siblings().removeClass('active');
          jQuery(this).parent('li').addClass('active');
          // why 11 so strange.
           if($('#main').height() < (document.getElementById(that.menuDomId).scrollHeight+11)){
             $('#main').height((document.getElementById(that.menuDomId).scrollHeight+11));
           }
        }else{
          jQuery(this).parent('li').siblings().removeClass('active');
          jQuery(this).parent('li').addClass('active');
        }
      });
      if($('#main').height() < (document.getElementById(that.menuDomId).scrollHeight+11)){
        $('#main').height((document.getElementById(that.menuDomId).scrollHeight+11));
      }
    }
  }

  function PortalNav(nav){
    this.nav=nav;
    this.domainTemplate='<li class="{active_class}"><a href="javascript:void(0)" id="domain_{domain.id}" onclick="urpnav.changeDomain(this)">{domain.title}</a></li>';
    this.portalTemplate='<li><a href="{app.url}" onclick="return bg.Go(this,\'main\')">{app.title}</a></li>';

    /**
     * 向顶层添加domain
     */
    this.addTopDomains = function(jqueryElem){
      var appItem='';
      jQuery('#appName').html(jQuery('#appName').siblings(0).html()+this.nav.sysName);
      jQuery('.logo').each(function (i,e){e.href=document.location})

      var domainToggle='<a href="javascript:urpnav.toggleTopBar()" class="appbar-toggle" role="button"><span class="sr-only"></span></a>';
      jqueryElem.before(domainToggle);

      var app=this.nav.app;
      appItem = this.portalTemplate.replace('{app.url}',this.nav.processUrl(app.url));
      appItem = appItem.replace('{app.title}',this.nav.home.title);
      jqueryElem.append(appItem);

      for(var i=0;i < this.nav.domains.length; i++){
        var domain= this.nav.domains[i];
        appItem = this.domainTemplate.replace('{domain.title}',domain.title);
        appItem = appItem.replace('{domain.id}',domain.id);
        appItem = appItem.replace('{domain.name}',domain.name);
        appItem = appItem.replace('{active_class}',(i==0)?"active":"");
        jqueryElem.append(appItem);
      }
    }
    this.displayCurrent=function(){
      this.displayDomainMenus(this.nav.currentDomainId);
    }
    /**
     * 显示指定domain的menu
     */
    this.displayDomainMenus = function (domainId){
      for(var i=0;i < this.nav.domainMenus.length; i++){
        var domainMenu=this.nav.domainMenus[i];
        if(domainMenu.domain.id==domainId){
          document.title=domainMenu.domain.title;
          this.nav.createMenus(jQuery('#'+this.nav.menuDomId),null,domainMenu.appMenus);
          this.nav.activate();
          this.nav.currentDomainId=domainId;
          break;
        }
      }
    }
  }

  /**
   * 显示一个domain中的各个app的餐单
   */
  function DomainNav(nav){
    this.nav=nav;
    this.appExternTemplate   ='<li class="{active_class}"><a href="{app.url}" target="_top">{app.title}</a></li>';
    this.appNavTemplate='<li class="{active_class}"><a href="{app.url}" id="app_{app.id}" onclick="urpnav.changeApp(this);return false;">{app.title}</a></li>';
    /**
     * 向顶层添加app
     */
    this.addTopApps = function(jqueryElem){
      var topItemCount=0;
      var appItem='';
      var topMenuMoreHappened=false;
      var thisApp=this.nav.app;
      var domainApps=[this.nav.home];
      //过滤掉非所在domain的app
      for(var i=0;i<this.nav.apps.length;i++){
        var app =this.nav.apps[i];
        if(app.name==this.nav.home.name){
          continue;
        }
        if(app.domain && thisApp.domain && app.domain.id != thisApp.domain.id){
          continue;
        }
        domainApps.push(app);
      }
      var appToggle='<a href="javascript:urpnav.toggleTopBar()" class="appbar-toggle" role="button"><span class="sr-only"></span></a>';
      jqueryElem.before(appToggle);
      for(var i=0;i<domainApps.length;i++){
        var app =domainApps[i];
        if(app.name==this.nav.app.name){
          var domainTitle=app.title;
          if(app.domain && app.domain.title) domainTitle=app.domain.title
          jQuery('#appName').html(jQuery('#appName').siblings(0).html()+domainTitle);
          jQuery('.main-header .logo').each(function (i,e){e.href=document.location})
        }
        if(topItemCount == this.nav.maxTopItem && domainApps.length > this.nav.maxTopItem){
          jqueryElem.append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">更多...<b class="caret"></b></a><ul id="topMenuMore" class="dropdown-menu"></ul><li>');
          topMenuMoreHappened=true;
        }
        if(topMenuMoreHappened){
          jqueryElem = jQuery('#topMenuMore');
        }
        if(app.embeddable){
          appItem = this.appNavTemplate.replace('{app.id}',app.id);
          appItem = appItem.replace('{app.title}',app.title);
          appItem = appItem.replace('{app.url}',this.nav.processUrl(app.url));
          appItem = appItem.replace('{active_class}',app.name==this.nav.app.name?"active":"");
        }else{
          appItem = this.appExternTemplate.replace('{app.url}',this.nav.processUrl(app.url));
          appItem = appItem.replace('{app.title}',app.title);
          appItem = appItem.replace('{active_class}',app.name==this.nav.app.name?"active":"");
        }
        jqueryElem.append(appItem);
        topItemCount +=1;
      }
    }

    /**
     * 显示指定appName的菜单
     */
    this.displayAppMenus=function(appId){
      if(!appId){
        console.log("display menus need appId");
        return;
      }
      var targetApp=null
      for(var i=0;i<this.nav.apps.length;i++){
        if(this.nav.apps[i].id==appId){
          targetApp=this.nav.apps[i];
          break;
        }
      }
      if(targetApp){
        var appMenu=this.nav.appMenus[targetApp.name];
        if(appMenu){
          if(appMenu.length>0){
            var first=appMenu[0];
            if(!first.menus && !first.children){
               appMenu=[{app:targetApp,menus:appMenu}];
            }
          }
          this.nav.createMenus(jQuery('#'+this.nav.menuDomId),targetApp,appMenu);
          this.nav.activate();
        }else{
          console.log("Cannot find menu for app "+targetApp.name);
        }
      }else{
        console.log("Cannot find app named:"+appName);
      }
    }

    this.displayCurrent=function(){
      this.displayAppMenus(this.nav.app.id);
    }
  }


  /**
   * 导航栏和菜单栏都是app中的内容
   */
  function AppNav(nav){
    this.nav=nav;
    this.topMenuTemplate='<li class="{active_class}"  id="topMenu{menu.idx}"><a href="javascript:void(0)" onclick="urpnav.changeMenu({menu.idx})">{menu.title}</a></li>';
    this.appTemplate='<li class="{active_class}"><a href="{app.url}" target="_top">{app.title}</a></li>';
    /**
     * 添加app导航和logo标题
     */
    this.addApps = function(jqueryElem){
      var appDropNav='<ul class="nav navbar-nav"><li class="dropdown">' +
                     '<a href="#" data-toggle="dropdown" style="display:inline" class="appbar-toggle" role="button" class="dropdown-toggle" aria-haspopup="true" aria-expanded="true"></a>' +
                     '<ul id="app_drop_bar" class="dropdown-menu"></ul>'+
                     '</li></ul>';
      jqueryElem.before(appDropNav);
      var appDropBarID="#app_drop_bar";
      jqueryElem = jQuery(appDropBarID);
      var appendHtml='';
      var curDomainId=0;
      for(var i=0;i<this.nav.apps.length;i++){
        var app = this.nav.apps[i];
        if(curDomainId ==0){
          curDomainId=app.domain.id;
        }else{
          if(app.domain.id != curDomainId){
            jqueryElem.append('<li role="separator" class="divider"></li>');
            curDomainId=app.domain.id;
          }
        }
        if(app.name==this.nav.app.name){//添加左侧的logo和标题
          jQuery('#appName').html(jQuery('#appName').siblings(0).html()+app.title);
          jQuery('.main-header .logo').each(function (i,e){e.href=document.location})
        }else{
          appendHtml = this.appTemplate.replace('{app.url}',this.nav.processUrl(app.url));
          appendHtml = appendHtml.replace('{app.title}',app.title);
          appendHtml = appendHtml.replace('{active_class}',app.name==this.appName?"active":"");
          jqueryElem.append(appendHtml);
        }
      }
    }

    this.addTopMenus=function(jqueryElem){
      jqueryElem.empty();
      var topMenuCount=0;
      var appendHtml='';
      var menus=this.nav.appMenus[this.nav.app.name];
      for(var i=0;i<menus.length;i++){
        var menu = menus[i];
        if(!menu.children || menu.children.length==0){
          continue;
        }
        topMenuCount +=1;
        if(topMenuCount == this.nav.maxTopItem){
          jqueryElem.append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">更多...<b class="caret"></b></a><ul id="topMenuMore" class="dropdown-menu"></ul><li>');
        }
        if(topMenuCount >= this.nav.maxTopItem ){
          jqueryElem = jQuery('#topMenuMore');
        }
        appendHtml = this.topMenuTemplate.replace('{menu.title}',menu.title);
        appendHtml = appendHtml.replace('{menu.idx}',i);
        appendHtml = appendHtml.replace('{menu.idx}',i);
        appendHtml = appendHtml.replace('{active_class}',(i==0)?"active":"");
        jqueryElem.append(appendHtml);
      }
    }

    this.displayTopMenus=function(idx){
      jQuery("#topMenu"+idx).siblings().removeClass("active");
      jQuery("#topMenu"+idx).addClass("active");
      var menus=this.nav.appMenus[this.nav.app.name]
      var children = menus[idx].children;
      if(children){
        if(children.length>0 && (!children[0].children || children[0].children.length>0)){
          menus=[menus[idx]];
        }else{
          menus=children;
        }
      }
      this.nav.createMenus(jQuery('#'+this.nav.menuDomId),this.nav.app,menus);
      this.nav.activate();
    }

  }

  var urpnav = {
    navMenu:{},

    createPortalNav:function(app,home,domainMenus,params,config){
      var nav= new Nav(app,home,domainMenus,params,config);
      var portal= new PortalNav(nav);
      portal.addTopDomains(jQuery('#'+nav.navDomId));
      portal.displayDomainMenus(nav.domains[0].id);
      this.navMenu=portal;
    },

    createDomainNav:function(app,home,domainMenus,params,config){
      var nav= new Nav(app,home,domainMenus,params,config);
      var domain= new DomainNav(nav);
      domain.addTopApps(jQuery('#'+nav.navDomId));
      domain.displayAppMenus(nav.app.id);
      this.navMenu=domain;
    },

    createAppNav:function(app,home,domainMenus,params,config){
      var nav= new Nav(app,home,domainMenus,params,config);
      var appNav= new AppNav(nav);
      appNav.addApps(jQuery('#'+nav.navDomId));
      appNav.addTopMenus(jQuery('#'+nav.navDomId));
      appNav.displayTopMenus(0);
      this.navMenu=appNav;
    },

    /**
     * 切换app的全局函数
     * @param id
     * @param name
     * @returns
     */
    changeApp:function(ele){
      var id=ele.id
      jQuery("#"+id).parent().addClass("active");
      jQuery("#"+id).parent().siblings().removeClass("active");
      this.navMenu.displayAppMenus(id.substring("app_".length));
    },

    /**
     * 切换domain的全局函数
     * @param id
     * @param name
     * @returns
     */
    changeDomain:function(ele){
      var id=ele.id
      jQuery("#"+id).parent().addClass("active");
      jQuery("#"+id).parent().siblings().removeClass("active");
      this.navMenu.displayDomainMenus(id.substring("domain_".length));
    },
    /**
       * 全局函数可以切换项目，渲染菜单
       * @param id
       * @returns
       */
    changeProfile:function(id){
      var p = urp.profiles.changeProject(id);
      this.navMenu.nav.params['project']=p.id;
      this.navMenu.nav.params['school']=p.schoolId;
      this.navMenu.displayCurrent();
    },

    changeMenu:function(idx){
      this.navMenu.displayTopMenus(idx);
    },

    createProjectNav:function(){
      var projectSelectTemplate=
       '<li class="dropdown">' +
          '<a class="dropdown-toggle" data-toggle="dropdown" href="#" id="project_switcher" aria-expanded="false">{first}' +
              '<span class="caret"></span></a> '+
          '<ul class="dropdown-menu">{list}</ul>' +
      '</li>';
      var projectTemplate='<li><a href="javascript:void(0)" onclick="urpnav.changeProfile({project.id})">{project.name}</a></li>'
      var projects=urp.profiles.projects;
      if(projects.length>1){ //display project when multiproject occur
        var projecthtml= projectSelectTemplate.replace('{first}',projects[0].name);
        var list=""
        for(var i=0;i<projects.length;i++){
          var projectItem=projectTemplate.replace("{project.id}",projects[i].id);
          projectItem=projectItem.replace("{project.name}",projects[i].name);
          list +=projectItem
        }
        projecthtml = projecthtml.replace('{list}',list);
        jQuery('.navbar-custom-menu > .navbar-nav').prepend(projecthtml)
      }
    },

    fetchMessages:function(params){
      if(!urp.sameDomain(window.location.href,params['openurp.webapp'])){
        return;
      }
      jQuery.ajax({
        url: params['openurp.webapp']+'/platform/user/message/newly?callback=messageCallBack',cache:false,
        type: "GET",dataType: "html",
        complete: function( jqXHR) {
            try{
              jQuery("#newly-message").html(jqXHR.responseText);
            }catch(e){alert(e)}
        }
      });
    },

    setup:function (params) {
      jQuery("body").addClass("hold-transition sidebar-mini skin-blue");
      this.fetchMessages(params);
    },

    toggleTopBar:function(){
      var bar=jQuery("#"+this.navMenu.nav.navDomId)
      if(bar.is(":hidden")){
        bar.css("margin","50px 0px 0px 0px")
        bar.show();
      }else{
        bar.css("margin","00px 0px 0px 0px")
        bar.hide();
      }
    }

  }

  //register as a module
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = urpnav;
  } else {
    window.urpnav=urpnav;
    if ( typeof define === "function" && define.amd ) {
      define( "urpnav", [], function () { return urpnav; } );
    }
  }
});