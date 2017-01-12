"use strict";
var i18n = require('../i18n'),
    app = require('../app'),
    tracking = require('../core/tracking'),
    notify = require('../api/notify');

/*
 * Social sharing directive
 */

app.directive('socialSharing', function ($rootScope, socialService, emailService) {
    return {
        restrict: 'E',
        templateUrl : i18n.getHtmlLocalePath() + '/directive/social.html',
        scope: {
            type: '='
        },
        link : function (scope) {
            var cover_url = 'http://art.kano.me/assets/challenges/images/' + $rootScope.selectedWorld.cover + '@2x.png';
            function init() {
                socialService.init();
                socialService.twitter.share(function (res) {
                    if (!res) {
                        return;
                    }
                    tracking.dispatchTrackingEvent('worldExternalShare');
                    return;
                });
            }

            init();

            scope.loading = false;
            scope.mailModal = false;
            scope.buildURL = socialService.twitter.build;
            scope.mailForm = {
                title: $rootScope.selectedWorld.name,
                type: 'world-invite',
                description: $rootScope.selectedWorld.socialText ? $rootScope.selectedWorld.socialText.email : null,
                cover_url: cover_url,
                url: 'http://art.kano.me/' + $rootScope.selectedWorld.id
            };

            scope.open = function () {
                scope.mailModal = true;
            };
            scope.close = function () {
                scope.mailModal = false;
            };
            scope.facebookShare = function () {
                var options = {
                    title   : $rootScope.selectedWorld.name + ' on Make Art',
                    url     : 'http://art.kano.me/challenges/' + $rootScope.selectedWorld.id,
                    picture : cover_url,
                    caption : 'Shared by ' + $rootScope.user.username + ' via ' + $rootScope.selectedWorld.name,
                    text    : $rootScope.selectedWorld.socialText.facebook
                };

                socialService.facebook.share(options, function (err, res) {
                    if (!res || err) {
                        return err;
                    }
                    tracking.dispatchTrackingEvent('worldExternalShare');
                });
            };

            scope.sendMail = function () {
                var emailObj;
                if (!scope.mailForm.email || !scope.mailForm.description) {
                    return;
                } else {
                    if (!emailService.validate(scope.mailForm.email)) {
                        scope.error = 'Invalid email address';
                        return;
                    }
                    scope.error = '';
                    scope.loading = true;
                    scope.mailForm.user_email = $rootScope.user.email;
                    scope.mailForm.username = $rootScope.user.username;
                    emailObj = emailService.buildObject(scope.mailForm);

                    emailService.send(emailObj, function (res) {
                        if (res.status !== 200) {
                            scope.loading = false;
                            scope.$apply();
                            return notify.failure(res);
                        }
                        emailService.reset(scope.mailForm);
                        tracking.dispatchTrackingEvent('worldExternalShare');

                        scope.loading = false;
                        scope.close();
                        scope.$apply();

                        return notify.success();
                    }, function (error) {
                        scope.loading = false;
                        scope.$apply();
                        return notify.failure(error);
                    });
                }
            };
        }
    };
});
