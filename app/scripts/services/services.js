'use strict';
/**
 * Created by Shtav on 3/7/15.
 */

var app = angular.module('listsApp');


app.factory('UserFBService', function($q, $rootScope) {
  var ref = $rootScope.ref,
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
    }
  };
  return service;
});

app.factory('ListsFBService', function($q, $rootScope) {
  var ref = $rootScope.ref,
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
    logIn: function(type, user) {
      if (type === 'userName'){
        ref.authWithPassword({email: user.name, password: user.password}, function(error, authData) {
          if (error) {console.log("Login Failed!", error);}
        });
      } else if (type === 'newUser') {
        ref.createUser({email: user.name, password: user.password}, function(error, userData) {
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
    }
  };
  return service;
});