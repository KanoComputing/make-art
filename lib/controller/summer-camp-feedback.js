import app from '../app';
var api;

app.controller('SummerCampFeedbackController', function ($scope, $rootScope) {
    api = $rootScope.api;
    
    $scope.screen_no = 1;
    $scope.responses = {};

    var submit_responses = function () {
        var answers = [
            {
                question_id: '55e09d21b5cc4d070011b183', // What did you like the most?
                text: $scope.responses.like_most,
            },
            {
                question_id: '55e09d41d2137c0800b1b9d1', // What didn't you like?
                text: $scope.responses.like_least
            },
            {
                question_id: '55e09d5f38bc460800e5010a', // How likely are you to recommend Kano to a friend?'
                text: String($scope.responses.recommend_scale)
            },
            {
                question_id: '55e09d76440dba0900dcc0ae', // What should we do next?',
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
            answers: answers
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
