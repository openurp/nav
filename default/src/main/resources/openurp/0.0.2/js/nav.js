/* 
Simple JQuery menu.
HTML structure to use:

Notes: 

Each menu MUST have a class 'menu' set. If the menu doesn't have this, the JS won't make it dynamic
If you want a panel to be expanded at page load, give the containing LI element the classname 'expand'.
Use this to set the right state in your page (generation) code.

Optional extra classnames for the UL element that holds an accordion:

noaccordion : no accordion functionality
collapsible : menu works like an accordion but can be fully collapsed

<ul class="menu [optional class] [optional class]">
<li><a href="#">Sub menu heading</a>
<ul>
<li><a href="http://site.com/">Link</a></li>
<li><a href="http://site.com/">Link</a></li>
<li><a href="http://site.com/">Link</a></li>
...
...
</ul>
// This item is open at page load time
<li class="expand"><a href="#">Sub menu heading</a>
<ul>
<li><a href="http://site.com/">Link</a></li>
<li><a href="http://site.com/">Link</a></li>
<li><a href="http://site.com/">Link</a></li>
...
...
</ul>
...
...
</ul>

Copyright 2007-2010 by Marco van Hylckama Vlieg
web: http://www.i-marco.nl/weblog/
email: marco@i-marco.nl

Free to use any way you like.
*/

jQuery.fn.initMenu = function() {  
    return this.each(function(){
        var theMenu = $(this).get(0);
        $('.acitem', this).hide();
        $('li.expand > .acitem', this).show();
        $('li.expand > .acitem', this).prev().addClass('active');
        $('li a', this).click(
            function(e) {
                e.stopImmediatePropagation();
                var theElement = $(this).next();
                var parent = this.parentNode.parentNode;
                //alert(parent);
                if($(parent).hasClass('noaccordion')) {
                    if(theElement[0] === undefined) {
                        window.location.href = this.href;
                    }
                    $(theElement).slideToggle('normal', function() {
                        if ($(this).is(':visible')) {
                            $(this).prev().addClass('active');
                            
                        }
                        else {
                            $(this).prev().removeClass('active');
                        }    
                    });
                    return false;
                }
                else {
                    if(theElement.hasClass('acitem') && theElement.is(':visible')) {
                        if($(parent).hasClass('collapsible') || $(parent).hasClass('scroll_box')) {
                            $('.acitem:visible', parent).first().slideUp('normal', 
                            function() {
                                $(this).prev().removeClass('active');
                                //alert('1');
                            }
                            
                        );
                        return false;  
                    }
                    return false;
                }
                if(theElement.hasClass('acitem') && !theElement.is(':visible')) {         
                    $('.acitem:visible', parent).first().slideUp('normal', function() {
                        $(this).prev().removeClass('active');
                        //alert('1');
                    });
                    theElement.slideDown('normal', function() {
                        $(this).prev().addClass('active');
                    });
                    return false;
                }
            }
        }
    );
});
};

 $(document).ready(function() {
                           
                           
                    
                          $('.menu').initMenu();
            
});

/*
 * Copyright 2018 by Chaostone
 */
function UrpNav(appName,apps,menus,webappBase,contextPath){
     this.appName=appName;
     this.apps=apps;
     this.menus=menus;
     this.webappBase=webappBase;
     this.contextPath=contextPath;
     this.maxTopItem=7;
     this.expandTopMenu=true;
     
     this.menuTempalte='<li><a class="p_1" target="main" onclick="return bg.Go(this,\'main\')" href="{menu.entry}">{menu.title}</a></li>';
     if(document.getElementById('main').tagName!='DIV'){
        this.menuTempalte='<li><a class="p_1" target="main" href="{menu.entry}">{menu.title}</a></li>';
     }
     this.foldTemplate='<li style="margin:0px;" class="{active_class}"><a href="javascript:void(0)" class="menu_title">{menu.title}</a><ul class="acitem menu" style="display: none;"><div class="scroll_box" id="menu{menu.id}"></div></ul></li>'
     this.appTemplate='<li class="{active_class}"><a href="{app.url}" target="_top">{app.title}</a></li>';
     this.topMenuTemplate='<li class="{active_class}"  id="topMenu{menu.idx}"><a href="javascript:void(0)" onclick="displayMenus({menu.idx})">{menu.title}</a></li>';

     this.addApps = function(jqueryElem){
      var appendHtml='';
      for(var i=0;i<this.apps.length;i++){
        var app = this.apps[i];
        if(app.name==this.appName){
          jQuery('#app_nav_bar').siblings().html(app.title+'<b class="caret"></b>');
          jQuery('#appName').text(app.title);
        }else{
          appendHtml = this.appTemplate.replace('{app.url}',app.url.replace('{openurp.webapp}',this.webappBase));
          appendHtml = appendHtml.replace('{app.title}',app.title);
          appendHtml = appendHtml.replace('{active_class}',app.name==this.appName?"active":"");
          jqueryElem.append(appendHtml);
        }
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
          appendHtml = appendHtml.replace('{active_class}',(i==0)?"expand":"");
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
    
    this.addTopMenus=function(jqueryElem){
      jqueryElem.empty();
      var topMenuCount=0;
      var appendHtml='';
      for(var i=0;i<this.menus.length;i++){
        var menu = this.menus[i];
        topMenuCount +=1;
        if(topMenuCount == this.maxTopItem){
          jqueryElem.append('<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">更多...<b class="caret"></b></a><ul id="topMenuMore" class="dropdown-menu"></ul><li>');
        }
        if(topMenuCount >= this.maxTopItem ){
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
      this.addMenus(jQuery('#menu_ul'),this.menus[idx].children)
      $('.menu').initMenu();
      if(!jQuery('#toggleButton').is(':hidden')){
        jQuery('#toggleButton').click();
      }
    }

    this.init=function(){
      if(this.expandTopMenu){
        this.addTopMenus(jQuery('#menu_nav_bar'));
        this.addApps(jQuery('#app_nav_bar'));
        this.addMenus(jQuery('#menu_ul'),menus[0].children);
     }else{
        this.addApps(jQuery('#app_nav_bar'));
        this.addMenus(jQuery('#menu_ul'),menus);
     }
   }
 }

