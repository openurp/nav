
  function messageCallBack(c){
    jQuery('#newly-message-count').text(c)
  }
  function adjustContentWrapperHeight(){
    // why 11 so strange.
    if($('.content-wrapper').height() < (document.getElementById('menu_ul').scrollHeight+11)){
      $('.content-wrapper').height((document.getElementById('menu_ul').scrollHeight+11));
    }
  }

  /**
   * 切换主题的全局函数
   * @param id
   * @param name
   * @returns
   */
  function showDomain(id,name){
    jQuery("#"+id).parent().addClass("active");
    jQuery("#"+id).parent().siblings().removeClass("active");
    urpNav.showDomainMenus(name);
  }

  /**
   * 全局函数可以切换项目，渲染菜单
   * @param id
   * @returns
   */
  function changeProject(id){
    var p = eduProjects.changeProject(id);
    urpNav.params['project']=p.id;
    urpNav.params['school']=p.schoolId;
    urpNav.showDomainMenus(urpNav.currentDomainName);
  }

  /**
   * 主题菜单导航
   * @param app
   * @param domainMenus
   * @param params
   * @returns
   */
  function UrpNav(app,domainMenus,params){
     this.app=app;
     //多个domain
     if((domainMenus.appMenus==null ||domainMenus.appMenus.length==0)){
       this.menus=domainMenus.children;
       this.topDomain=domainMenus.domain;
       this.sysName=this.topDomain.title+"系统";
     }else{//单一domain
       this.menus=[domainMenus];
       this.sysName="教学系统";
     }
     this.domains=[];
     for(i=0;i < this.menus.length; i++){
       this.domains.push(this.menus[i].domain);
     }
     this.currentDomainName="";
     this.params=params;
     this.menuTempalte='<li><a href="{menu.url}" onclick="return bg.Go(this,\'main\')" ><i class="fa fa-circle-o"></i>{menu.title}</a></li>';
     this.foldTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{menu.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu{menu.id}"></ul></li>'
     this.domainTemplate='<li class="{active_class}"><a href="javascript:void(0)" id="domain_{domain.id}" onclick="showDomain(this.id,\'{domain.name}\')">{domain.title}</a></li>';
     this.appTemplate='<li style="margin:0px;" class="{active_class} treeview"><a href="javascript:void(0)"><i class="fa fa-list"></i><span>{app.title}</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu" id="menu_app{app.id}"></ul></li>'
     this.portalTemplate='<li><a href="{app.url}" onclick="return bg.Go(this,\'main\')">{app.title}</a></li>';

     this.addDomains = function(jqueryElem){
       var appItem='';
       jQuery('#appName').html(jQuery('#appName').siblings(0).html()+this.sysName);
       jQuery('.logo').each(function (i,e){e.href=document.location})

       appItem = this.portalTemplate.replace('{app.url}',this.processUrl(this.app.url));
       appItem = appItem.replace('{app.title}',this.app.title);
       jqueryElem.append(appItem);

       for(i=0;i < this.domains.length; i++){
         domain=this.domains[i];
         appItem = this.domainTemplate.replace('{domain.title}',domain.title);
         appItem = appItem.replace('{domain.id}',domain.id);
         appItem = appItem.replace('{domain.name}',domain.name);
         appItem = appItem.replace('{active_class}',(i==0)?"active":"");
         jqueryElem.append(appItem);
       }
     }

    this.processUrl=function(url){
      if(url.indexOf("//")>0){
        url= url.replace("//",'/');
      }
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
      for(var i=0; i <menus.length;i++){
        var menu = menus[i];
        if(menu.menus){
          appItem = this.appTemplate.replace('{app.id}',menu.app.id);
          appItem = appItem.replace('{app.title}',menu.app.title);
          appItem = appItem.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(appItem);
          this.app=menu.app;
          this.addMenus(jQuery('#menu_app'+menu.app.id),menu.menus);
        }else if(menu.children){
          menuItem = this.foldTemplate.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{active_class}',(i==0)?"active menu-open":"");
          jqueryElem.append(menuItem);
          this.addMenus(jQuery('#menu'+menu.id),menu.children);
        }else{
          menuItem = this.menuTempalte.replace('{menu.id}',menu.id);
          menuItem = menuItem.replace('{menu.title}',menu.title);
          menuItem = menuItem.replace('{menu.url}',this.processUrl(this.app.base+menu.entry));
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

    this.showDomainMenus=function (name){
       for(i=0;i < this.menus.length; i++){
         var appMenus=this.menus[i];
         if(appMenus.domain.name==name){
           document.title=appMenus.domain.title;
           this.addMenus(jQuery('#menu_ul'),appMenus.appMenus);
           this.currentDomainName=name;
           break;
         }
       }
    }

    this.init=function(){
        this.addDomains(jQuery('#app_nav_bar'));
        this.showDomainMenus(this.domains[0].name);
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

  /**
   * 用于切换项目的代码
   * @param profiles
   * @returns
   */
  function UrpEduProjects(profiles){
    this.projects=[]

    var projectSelectTemplate=
     '<li class="dropdown">' +
        '<a class="dropdown-toggle" data-toggle="dropdown" href="#" id="project_switcher" aria-expanded="false">{first}' +
            '<span class="caret"></span></a> '+
        '<ul class="dropdown-menu">{list}</ul>' +
    '</li>';
    var projectTemplate='<li><a href="javascript:void(0)" onclick="changeProject({project.id})">{project.name}</a></li>'
    if(profiles.length>0){
      for(var i=0;i< profiles.length;i++){
        var profile=profiles[i];
        for(var j=0;j<profile.properties.length;j++){
          var property=profile.properties[j];
          if(property.dimension.name=="projects"){
            this.projects = property.value
            break;
          }
        }
      }
    }
    if(this.projects.length>1){
      var projecthtml= projectSelectTemplate.replace('{first}',this.projects[0].name);
      var list=""
      for(var i=0;i<this.projects.length;i++){
        var projectItem=projectTemplate.replace("{project.id}",this.projects[i].id);
        projectItem=projectItem.replace("{project.name}",this.projects[i].name);
        list +=projectItem
      }
      projecthtml = projecthtml.replace('{list}',list);
      jQuery('.navbar-custom-menu > .navbar-nav').prepend(projecthtml)
    }

    this.changeProject=function(id){
      for(var i=0;i<this.projects.length;i++){
        if(this.projects[i].id==id){
          var URP_EDU=encodeURIComponent('{"projectId":'+id+'}')
          var exdate=new Date();
          exdate.setDate(exdate.getDate()+180);
          document.cookie="URP_EDU="+URP_EDU+";path=/edu/;expires="+exdate.toGMTString();
          jQuery('#project_switcher').html(this.projects[i].name + '<span class="caret"></span>');
          return this.projects[i];
          break;
        }
      }
    }

    if(this.projects.length>0){
      this.changeProject(this.projects[0].id);
    }
  }
