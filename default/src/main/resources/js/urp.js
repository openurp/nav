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
          var URP_EDU=encodeURIComponent('{"projectId":'+id+'}')
          var exdate=new Date();
          exdate.setDate(exdate.getDate()+7);
          document.cookie="URP_EDU="+URP_EDU+";path=/edu/;expires="+exdate.toGMTString();
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

      this.changeProject(this.projects[0].id);
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