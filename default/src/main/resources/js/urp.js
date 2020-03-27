$(function () {
    'use strict'

  var UrpProfiles = function(profiles,profile){
    this.projects=[];
    this.profile=profile;
    this.processProjectUrl = function(){
      for(var i=0;i<this.projects.length;i++){
        var project= this.projects[i];
        if(!project.url){
          project.url= (location.origin + location.pathname +"?contextProjectId=" +project.id)
        }
      }
    }
    this.project=function(){
      if(this.profile && this.profile.edu.projectId){
        for(var i=0;i<this.projects.length;i++){
          var p = this.projects[i];
          if(p.id == this.profile.edu.projectId){
            return p;
          }
        }
      }
      return this.projects[0];
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
    this.processProjectUrl();
  }

  var urp={
    profiles:{},
    api:"",
    createProfiles:function(params,currentProfile){
      this.profiles = new UrpProfiles(params,currentProfile);
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
