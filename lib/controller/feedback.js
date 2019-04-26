'use strict';

/*
 * Feedback Screen Controller
 *
 * Opens up when on main route
 */

import app from '../app';
/*
 * Feedback Screen Controller
 *
 * Opens up when on main route
 */

var api, ERROR_MSG = 'We are sorry but an error occured.';

app.controller('FeedbackController', function ($scope, $rootScope, $routeParams) {
    api = $rootScope.api;
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
            $scope.questions = res.body.questions.filter((q) => q.tags.indexOf('feedback') !== -1 || q.tags.indexOf('make-art') !== -1);
            $scope.$apply();
        }
    });

    $scope.sendFeedback = function () {
        var answer,
            answers = [],
            answerKeys = Object.keys($scope.feedback);

        $scope.loading = true;

        answerKeys.forEach(answerKeys, function (key) {
            answer = $scope.questions.find((q) => q.tags.indexOf(key) !== -1);
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
            $rootScope.feedback.closeModal();
        }, 2500);
    }

    $scope.closeModal = function () {
        $rootScope.feedback.closeModal();
    };
});
