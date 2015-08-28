var app = require('../app'),
    api = require('../api');

app.controller('SummerCampFeedbackController', function ($scope, $rootScope) {
    $scope.screen_no = 1;
    $scope.responses = {};

    var submit_response = function(question_text, answer) {
        api.summercamp.sendSummerCampFeedback({
            username: $rootScope.user.username,
            email: $rootScope.user.email,
            question_text: question_text,
            answer: answer,
            tags: ['online', 'kano-draw', 'summer-camp']
        });
    };

    var submit_responses = function () {
        var answers = [
            {
                question_id: 1, // What did you like the most?
                text: $scope.responses.like_most,
            },
            {
                question_id: 2, // What didn't you like?
                text: $scope.responses.like_least
            },
            {
                question_id: 3, // How likely are you to recommend Kano to a friend?'
                text: $scope.responses.recommend_scale
            },
            {
                question_id: 4, // What should we do next?',
                text: $scope.responses.what_next
            }
        ];

        answers.map(function(answer) {
            answer.tags = ['online', 'kano-draw', 'summer-camp'];
            return answer;
        });

        api.summercamp.sendSummerCampFeedback({
            username: $rootScope.user.username,
            email: $rootScope.user.email,
            answer: answers
        });

        api.summercamp.completeSummercamp();
    };


    $scope.next = function () {
        if ($scope.screen_no === 2) {
            submit_responses();
        }

        $scope.screen_no++;
    };

});
