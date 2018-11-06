  function messageCallBack(c){
    jQuery('#newly-message-count').text(c)
  }

  function adjustContentWrapperHeight(){
    // why 11 so strange.
    if($('.content-wrapper').height() < (document.getElementById('menu_ul').scrollHeight+11)){
      $('.content-wrapper').height((document.getElementById('menu_ul').scrollHeight+11));
    }
  }

function UrpNav(home,defaultApp,menus,params){
     this.home=home;
     this.defaultApp=defaultApp;
     this.appMenus={};
     this.apps=[home];
     this.params=params;
     this.maxTopItem=8;

     this.menuTempalte='<li><a onclick="return bg.Go(this,\'main\')" href="{menu.entry}" target="main" ><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
     if(document.getElementById('main').tagName!='DIV'){
        this.menuTempalte='<li><a target="main" href="{menu.entry}"><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
     }
     this.foldTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{menu.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu{menu.id}"></ul></li>'
     this.appTemplate='<li class="{active_class}"><a href="{app.url}" target="_top">{app.title}</a></li>';
     this.appNavTemplate='<li class="{active_class}"><a href="{app.url}" id="app_{app.name}" onclick="urpNav.changeApp(this);return false;">{app.title}</a></li>';

     for(var i=0;i<menus.length;i++){
       var app = menus[i].app;
       this.appMenus[app.name]=menus[i].menus;
       if(app.name==home.name){
         home.title=app.title;
         home.url=app.url;
       } else if(app.name==this.defaultApp.name){
         app.base=this.defaultApp.base;
         this.apps.push(app);
       } else {
         this.apps.push(app);
       }
       if(app.base.endsWith("/")){
         app.base=app.base.substring(0,app.base.length-1);
       }
     }

     this.addApps = function(jqueryElem){
      var topItemCount=0;
      var appItem='';
      var topMenuMoreHappened=false;
      for(var i=0;i<this.apps.length;i++){
        var app =this.apps[i];
        if(app.name==this.home.name && i>1){
            continue;
        }
        if(app.name==this.defaultApp.name){
          var domainTitle=app.title;
          if(app.domain && app.domain.title) domainTitle=app.domain.title
          jQuery('#appName').html(jQuery('#appName').siblings(0).html()+domainTitle);
          jQuery('.logo').each(function (i,e){e.href=document.location})
        }
        if(topItemCount == this.maxTopItem && allApps.length > this.maxTopItem){
          jqueryElem.append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">更多...<b class="caret"></b></a><ul id="topMenuMore" class="dropdown-menu"></ul><li>');
          topMenuMoreHappened=true;
        }
        if(topMenuMoreHappened){
          jqueryElem = jQuery('#topMenuMore');
        }
        if(app.embeddable){
          appItem = this.appNavTemplate.replace('{app.name}',app.name);
          appItem = appItem.replace('{app.title}',app.title);
          appItem = appItem.replace('{app.url}',this.processUrl(app.url));
          appItem = appItem.replace('{active_class}',app.name==this.defaultApp.name?"active":"");
        }else{
          appItem = this.appTemplate.replace('{app.url}',this.processUrl(app.url));
          appItem = appItem.replace('{app.title}',app.title);
          appItem = appItem.replace('{active_class}',app.name==this.defaultApp.name?"active":"");
        }
        jqueryElem.append(appItem);
        topItemCount +=1;
      }
    }

    this.processUrl=function(url){
      if(url.indexOf('{') == -1) return url;
      for(var name in this.params){
        url = url.replace('{'+name+'}',this.params[name]);
      }
      return url;
    }

    this.changeApp=function(ele){
      var id=ele.id
      jQuery("#"+id).parent().addClass("active");
      jQuery("#"+id).parent().siblings().removeClass("active");
      this.addAppMenus(id.substring(4));
    }

    this.addAppMenus=function(appName){
      if(!appName) appName=this.defaultApp.name;
      var targetApp=null
      for(var i=0;i<this.apps.length;i++){
        if(this.apps[i].name==appName){
          targetApp=this.apps[i];
          break;
        }
      }
      if(targetApp){
        this.addMenus(jQuery('#menu_ul'),targetApp,this.appMenus[appName]);
      }else{
        alert("Cannot find app named:"+appName);
      }
    }

    this.addMenus=function(jqueryElem,app,menus){
      jqueryElem.empty();
      var menuItem='';
      for(var i=0;i<menus.length;i++){
        var menu = menus[i];
        if(menu.children){
          menuItem = this.foldTemplate.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(menuItem);
          this.addMenus(jQuery('#menu'+menu.id),app,menu.children);
        }else{
          menuItem = this.menuTempalte.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{menu.entry}',this.processUrl(app.base+menu.entry));
          jqueryElem.append(menuItem);
        }
      }
    }

    this.fetchMessages=function(){
        jQuery.ajax({
            url: this.params['openurp.webapp']+'/platform/user/message/newly?callback=messageCallBack',cache:false,
            type: "GET",dataType: "html",
            complete: function( jqXHR) {
                try{
                  jQuery("#newly-message").html(jqXHR.responseText);
                }catch(e){alert(e)}
            }
        });
     }

    this.init=function(){
        this.addApps(jQuery('#app_nav_bar'));
        this.addAppMenus();
        jQuery(document).ready( function () {
            jQuery("body").addClass("hold-transition sidebar-mini skin-blue");
            jQuery("ul.sidebar-menu li a").click(function() {
              if(this.href=="javascript:void(0)"){
                jQuery(this).parent('li').siblings().removeClass('active');
                jQuery(this).parent('li').addClass('active');
                adjustContentWrapperHeight();
              }else{
                jQuery(this).parent('li').siblings().removeClass('active');
                jQuery(this).parent('li').addClass('active');
              }
            });
            adjustContentWrapperHeight();
          });
      this.fetchMessages();
     }

   }
