$(function () {
    'use strict'

  var UrpProfiles = function(profiles){
    this.projects=[]
    /**
    * 用于切换项目的代码
    * @param profiles
    * @returns
    */
    this.changeProject=function(id){
      for(var i=0;i<this.projects.length;i++){
        if(this.projects[i].id==id){
          var exdate=new Date();
          exdate.setDate(exdate.getDate()+7);

          var cookie=urp.getCookie("URP_PROFILE")
          var profile={}
          if(cookie){
            profile=JSON.parse(decodeURIComponent(cookie))
            if(!profile.edu){
              profile.edu={}
            }
            profile.edu.projectId=id;
          }else{
            profile={
              "edu":{"projectId":id}
            }
          }
          var URP_PROFILE=encodeURIComponent(JSON.stringify(profile))
          document.cookie="URP_PROFILE="+URP_PROFILE+";path=/;expires="+exdate.toGMTString();
          jQuery('#project_switcher').html(this.projects[i].name + '<span class="caret"></span>');
          return this.projects[i];
          break;
        }
      }
    }

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
    if(this.projects.length>0){
      var cookie=urp.getCookie("URP_PROFILE")
      if(cookie){
        var profile=JSON.parse(decodeURIComponent(cookie))
        var verified=false;
        if(profile.edu && profile.edu.projectId){
          for(var j=0;j<this.projects.length;j++){
            if(this.projects[j].id==profile.edu.projectId){
              verified=true;
              break;
            }
          }
        }
        if(!verified){
          this.changeProject(this.projects[0].id);
        }
      }else{
        this.changeProject(this.projects[0].id);
      }
    }
  }

  var urp={
    profiles:{},
    api:"",
    createProfiles:function(params){
      this.profiles = new UrpProfiles(params);
      return this.profiles;
    },

    hostName:function(u1){
      var slashIdx = u1.indexOf('//');
      if(-1==slashIdx){
        slashIdx=0;
      }else{
        slashIdx += 2;
      }
      var endIdx= u1.indexOf(':',slashIdx)
      if(-1 == endIdx){
        endIdx= u1.indexOf('/',slashIdx)
      }
      if(-1 == endIdx){
        endIdx= u1.length
      }
      return u1.substring(slashIdx,endIdx);
    },

    sameDomain:function (u1,u2){
      return this.hostName(u1)== this.hostName(u2);
    },

    getCookie: function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    },

    deleteCookie:function( name, path, domain ) {
      if( getCookie( name ) ) {
        document.cookie = name + "=" +
          ((path) ? ";path="+path:"")+
          ((domain)?";domain="+domain:"") +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
    }
  }

  //register as a module
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = urp;
  } else {
    window.urp=urp;
    if ( typeof define === "function" && define.amd ) {
      define( "urp", [], function () { return urp; } );
    }
  }
});
