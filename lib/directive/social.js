"use strict";
var app = require('../app'),
    notify = require('../api/notify');

/*
 * Social sharing directive
 */

app.directive('socialSharing', function ($rootScope, socialService, emailService) {
    return {
        restrict: 'E',
        templateUrl: '/directive/social.html',
        scope: {
            type: '='
        },
        link : function (scope) {
            scope.loading = false;
            scope.mailModal = false;
            scope.buildURL = socialService.twitter.build;
            
            scope.facebookShare = function () {
                var options = {
                    title   : 'Pixel Hack on Make Art',
                    url     : 'http://art.kano.me/challenges/pixelhack/',
                    picture : 'http://art.kano.me/assets/challenges/images/world_covers/pixelhack.png',
                    caption : 'Shared by ' + $rootScope.user.username + ' Pixel Hack',
                    text    : 'Hack your way through video game history with #PixelHack from Kano'
                };

                socialService.facebook.share(options, function (err, res) {
                    if (err) {
                        return err;
                    }
                });
            };

            scope.sendMail = function (creation) {
                var emailObj;
                if (!creation.email) {
                    return false;
                } else {
                    scope.loading = true;
                    if (emailService.validate(creation.email)) {
                        creation.user_email = $rootScope.user.email;
                        emailObj = emailService.buildObject(creation);

                        emailService.send(emailObj, function (response) {
                            if (response.status === 200) {
                                emailService.reset(creation);
                                scope.closeMailTab();
                                scope.closeShareModal();
                                if (!scope.nextModal) {
                                    scope.openNextModal();
                                }
                                scope.loading = false;
                                return notify.success();
                            }
                        }, function (error) {
                            if (error) {
                                emailService.reset(creation);
                                scope.closeMailTab();

                                return notify.failure();
                            }
                        });
                    } else {
                        return notify.failure();
                    }
                }
            };
            scope.toggleMailModal = function () {
                scope.mailModal = scope.mailModal ? true : false;
            };
        }
    };
});
