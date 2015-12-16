'use strict';
/*
 * Feedback Screen Controller
 *
 * Opens up when on main route
 */

var api,
    app = require('../app'),
    _ = require('lodash'),
    ERROR_MSG = 'We are sorry but an error occured.';

app.controller('FeedbackController', function ($scope, $rootScope, $routeParams) {
    api = $rootScope.api;
    $scope.isFeedbackSplashOpen = false;
    $scope.loading = false;
    $scope.questions = null;
    $scope.error = '';
    $scope.feedback = {
        rating: 'rating-1'
    };

    if ($routeParams.world) {
        $scope.feedback.world = $routeParams.world;
    }

    if ($routeParams.id) {
        $scope.feedback.challenge = $routeParams.id;
    }

    api.questions.list({})
    .then(function (res) {
        if (res.body.questions) {
            $scope.questions = _.filter(res.body.questions, { tags: ['feedback', 'make-art'] });
            $scope.$apply();
        }
    });

    $scope.sendFeedback = function () {
        var answer,
            answers = [],
            answerKeys = Object.keys($scope.feedback);

        $scope.loading = true;

        _.each(answerKeys, function (key) {
            answer = _.filter($scope.questions, { tags: [key] });
            answer = {
                question_id : answer[0].id,
                tags        : answer[0].tags,
                text        : $scope.feedback[key]
            };
            answers.push(answer);
        });

        if (!answers.length) {
            $scope.error = ERROR_MSG;
            return;
        }

        api.questions.respond({
            username: $rootScope.user ? $rootScope.user.username : $rootScope.cfg.UNKNOWN_USER,
            email: $rootScope.user ? $rootScope.user.email : $rootScope.cfg.UNKNOWN_USER + '@kano.me',
            answers: answers
        })
        .then(function () {
            handleClick();
        }, function () {
            $scope.loading = false;
            $scope.error = ERROR_MSG;
        });
    };

    function handleClick() {
        $scope.feedback.thought = '';
        document.querySelector('.form-message').classList.remove('hide');
        document.querySelector('.form-container').classList.add('hide');
        document.querySelector('.feedback-buttons').classList.add('hide');

        setTimeout(function () {
            $rootScope.isFeedbackSplashOpen = false;
            $rootScope.$apply();
        }, 2500);
    }

    $scope.handleSkip = function (e) {
        e.preventDefault();
        $rootScope.isFeedbackSplashOpen = false;
    };
});
