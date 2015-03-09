'use strict';
/**
 * Created by Shtav on 3/7/15.
 */

var myApp = angular.module('listsApp');


myApp.factory('FBUserService', function($q, $http, FB_URI, $firebase, $firebaseAuth, $rootScope) {
  var ref = new Firebase(FB_URI),
    auth = $firebaseAuth(ref);

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
    logOut: function(){
      ref.unauth();
    },
    authObj: function(){
      return auth;
    }
  };
  return service;
});

myApp.factory('firebaseService', function($q, $http) {
  var service = {
    _user: null,
    setCurrentUser: function(e, s) {
      if (s && !e) {
        return service.currentUser();
      } else {
        var d = $q.defer();
        d.reject(u.error);
        return d.promise;
      }
    },
    currentUser: function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else {
        var authData = ref.getAuth();
        if (authData) {
          console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
          console.log("User is logged out");
        }
      }
      return d.promise;

    }
  };
  return service;
});