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

    var submit_responses = function() {
        var data = {
            'What did you like the most?': $scope.responses.like_most,
            'What didn\'t you like?': $scope.responses.like_least,
            'How likely are you to recommend Kano to a friend?': $scope.responses.recommend_scale,
            'What should we do next?': $scope.responses.what_next
        };

        for (var question in data) {
            submit_response(question, data[question]);
        }

        api.summercamp.completeSummercamp();
    };


    $scope.next = function(){
        if ($scope.screen_no == 2) {
            submit_responses();
        }

        $scope.screen_no++;
    };

});
