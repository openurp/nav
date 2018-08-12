
function UrpNav(app,apps,menus,params){
     this.app=app;
     this.apps=apps;
     this.menus=menus;
     this.maxTopItem=8;
     
     this.menuTempalte='<li><a onclick="return bg.Go(this,\'main\')" href="{menu.entry}" target="main" ><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
     if(document.getElementById('main').tagName!='DIV'){
        this.menuTempalte='<li><a target="main" href="{menu.entry}"><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
     }
     this.foldTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{menu.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu{menu.id}"></ul></li>'
     this.appTemplate='<li class="{active_class}"><a href="{app.url}" target="_top">{app.title}</a></li>';

     this.addApps = function(jqueryElem){
      var topItemCount=0;
      var appItem='';
      var topMenuMoreHappened=false;
      for(var i=0;i<this.apps.length;i++){
        var app = this.apps[i];
        if(app.name==this.app.name){
          var domainTitle=app.title;
          if(app.domain && app.domain.title) domainTitle=app.domain.title
          jQuery('#appName').html(jQuery('#appName').siblings(0).html()+domainTitle);
        }
        if(topItemCount == this.maxTopItem && this.apps.length > this.maxTopItem){
          jqueryElem.append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">更多...<b class="caret"></b></a><ul id="topMenuMore" class="dropdown-menu"></ul><li>');
          topMenuMoreHappened=true;
        }
        if(topMenuMoreHappened){
          jqueryElem = jQuery('#topMenuMore');
        }
        appItem = this.appTemplate.replace('{app.url}',this.processUrl(app.url));
        appItem = appItem.replace('{app.title}',app.title);
        appItem = appItem.replace('{active_class}',app.name==this.app.name?"active":"");
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

    this.addMenus=function(jqueryElem,menus){
      jqueryElem.empty();
      if(!menus) menus=this.menus;
      var menuItem='';
      for(var i=0;i<menus.length;i++){
        var menu = menus[i];
        if(menu.children){
          menuItem = this.foldTemplate.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(menuItem);
          this.addMenus(jQuery('#menu'+menu.id),menu.children);
        }else{
          menuItem = this.menuTempalte.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{menu.entry}',this.app.contextPath+this.processUrl(menu.entry));
          jqueryElem.append(menuItem);
        }
      }
    }

    this.init=function(){
        this.addApps(jQuery('#app_nav_bar'));
        this.addMenus(jQuery('#menu_ul'),menus);
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
     }
   }

  function adjustContentWrapperHeight(){
    // why 11 so strange.
    if($('.content-wrapper').height() < (document.getElementById('menu_ul').scrollHeight+11)){
      $('.content-wrapper').height((document.getElementById('menu_ul').scrollHeight+11));
    }
  }
