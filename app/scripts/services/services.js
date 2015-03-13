'use strict';
/**
 * Created by Shtav on 3/7/15.
 */

var app = angular.module('listsApp');

/*============================================================*/
/*=== USER SERVICES USER USER USER USER USER USER USER USE ===*/
/*============================================================*/
app.factory('UserFBService', function($q, $rootScope) {
  var ref = $rootScope.ref, //$rootScope Vars are set in the run() block
    auth = $rootScope.auth;
  var service = {
    _user: null,
    currentUser: function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else {
        var authData = auth.$getAuth();
        if (authData) {
          service._user = authData;
          d.resolve(service._user);
        } else {
          d.resolve(service._user);
        }
      }
      return d.promise;
    },
    logIn: function(type, userName, password) {
      if (type === 'userName'){
        ref.authWithPassword({email: userName, password: password}, function(error, authData) {
          if (error) {console.log("Login Failed!", error);}
        });
      } else if (type === 'newUserName') {
        ref.createUser({email: userName, password: password}, function(error, userData) {
          if (error) {console.log("Error creating user:", error);}
        })
      } else {
        auth.$authWithOAuthRedirect(type, function(error) {if (error) {console.log("Login Failed!", error);}});
      }
    },
    signOut: function(){
      ref.unauth();
    },
    authObj: function(){
      return auth;
    },
    userData: function() {

      if (service._user) {
        switch (service._user.provider) {
          case 'anonymous'      :
            return this.loginAnonymously(options);
          case 'facebook-token' :
            return this.loginWithFacebookToken(options);
          case 'github'         :
            return this.loginWithGithub(options);
          case 'google'   :
            return console.log('google');
          case 'password'       :
            return this.loginWithPassword(options);
          case 'twitter-token'  :
            return this.loginWithTwitterToken(options);
        }
      }
    },
    user: function(){
      return service._user
    }
  };
  return service;
});


/*============================================================*/
/*=== LIST SERVICES LIST LIST LIST LIST LIST LIST LIST LIS ===*/
/*============================================================*/
app.factory('ListsFBService', function($q, $rootScope, $firebaseArray, $firebaseObject) {
  var ref = $rootScope.ref,
    auth = $rootScope.auth,
    listRef = $rootScope.listRef,
    user = null;
  auth.$onAuth(function(authData) {
      user = authData;
    }
  );

  var service = {
    listAsArray: $firebaseArray(listRef),
    listAsObj: $firebaseObject(ref),
    createItem: function(item) {
      if (!user){
        return null;
      } else {
        service.listAsArray.$add(item);
      }
    },
    getList: function(dir){
      console.log(service.listAsArray);
      return service.listAsArray;
    },
    getObj: function(dir){
      console.log(service.listAsObj);
      return service.listAsObj;
    }
  };
  return service;
});