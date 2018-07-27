
function UrpNav(appName,apps,menus,webappBase,contextPath){
     this.appName=appName;
     this.apps=apps;
     this.menus=menus;
     this.webappBase=webappBase;
     this.contextPath=contextPath;
     this.maxTopItem=7;
     
     this.menuTempalte='<li><a onclick="return bg.Go(this,\'main\')" href="{menu.entry}" target="main" ><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
     if(document.getElementById('main').tagName!='DIV'){
        this.menuTempalte='<li><a target="main" href="{menu.entry}">{menu.title}</a></li>';
     }
     this.foldTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{menu.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu{menu.id}"></ul></li>'
     this.appTemplate='<li class="{active_class}"><a href="{app.url}" target="_top">{app.title}</a></li>';

     this.addApps = function(jqueryElem){
      var topItemCount=0;
      var appendHtml='';
      for(var i=0;i<this.apps.length;i++){
        var app = this.apps[i];
        if(app.name==this.appName){
          jQuery('#appName').html(jQuery('#appName').siblings(0).html()+app.title);
        }
        if(topItemCount == this.maxTopItem){
          jqueryElem.append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">更多...<b class="caret"></b></a><ul id="topMenuMore" class="dropdown-menu"></ul><li>');
        }
        if(topItemCount >= this.maxTopItem ){
          jqueryElem = jQuery('#topMenuMore');
        }
        appendHtml = this.appTemplate.replace('{app.url}',app.url.replace('{openurp.webapp}',this.webappBase));
        appendHtml = appendHtml.replace('{app.title}',app.title);
        appendHtml = appendHtml.replace('{active_class}',app.name==this.appName?"active":"");
        jqueryElem.append(appendHtml);
        topItemCount +=1;
      }
    }

    this.addMenus=function(jqueryElem,menus){
      jqueryElem.empty();
      if(!menus) menus=this.menus;
      var appendHtml='';
      for(var i=0;i<menus.length;i++){
        var menu = menus[i];
        if(menu.children){
          appendHtml = this.foldTemplate.replace('{menu.id}',menu.id);
          appendHtml = appendHtml.replace('{menu.title}',menu.title);
          appendHtml = appendHtml.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(appendHtml);
          this.addMenus(jQuery('#menu'+menu.id),menu.children);
        }else{
          appendHtml = this.menuTempalte.replace('{menu.id}',menu.id);
          appendHtml = appendHtml.replace('{menu.title}',menu.title);
          appendHtml = appendHtml.replace('{menu.entry}',this.contextPath+menu.entry);
          jqueryElem.append(appendHtml);
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
                jQuery("ul.tree li.active").removeClass('active');
                jQuery(this).parent('li').addClass('active');
              }else{
                jQuery("ul.treeview-menu li.active").removeClass('active');
                jQuery(this).parent('li').addClass('active');
              }
            });
          });
     }
   }

  function toggleAppbar(){
     jQuery('#app_nav_bar').show()
  }
