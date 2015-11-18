var mainApp = angular.module('mainApp',['ngResource','ngRoute', 'ngAnimate']);

var username = "";
var fullname = "";
var name = "";
var listOfClasses = null;
var timeline_view = false;

mainApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
       when('/login', {
          templateUrl: 'html-templates/login.html',
          controller: 'LoginCtrl'
       }).
       when('/dashboard', {
             templateUrl: 'html-templates/dashboard.html',
             controller: 'DashboardCtrl'
        }).
        when('/class/:class_id', {
             templateUrl: 'html-templates/class.html',
             controller: 'ClassCtrl'
        }).
        when('/class/:class_id/:group_no', {
             templateUrl: 'html-templates/group.html',
             controller: 'ClassGroupCtrl'
        }).
        when('/class/:class_id/:group_no/:student_name', {
             templateUrl: 'html-templates/student.html',
             controller: 'GroupStudentCtrl'
        }).
        when('/help', {
            templateUrl: 'html-templates/help.html',
            controller: 'HelpCtrl'
        }).
       when('/logout', {
             templateUrl: 'html-templates/login.html',
             controller: 'LogoutCtrl'
        }).
        when('/editProfile', {
             templateUrl: 'html-templates/editProfile.html',
             controller: 'EditProfileCtrl'
        }).
       otherwise({
          redirectTo: '/dashboard'
       });
 }]);

