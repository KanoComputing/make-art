/*
 * ChallengeMenuItem Controller
 *
 * Controller for individual items in challenge menu
 */

var app = require('../app');
 
app.controller('ChallengeMenuItemController', function($rootScope, $scope) {
    $scope.challengeNo = $scope.$index + 1;

    /*
     * Returns true if item's challenge is locked
     *
     * @return {Boolean}
     */
    $scope.isLocked = function () {
        return $scope.challengeNo > $rootScope.progress.challengeNo;
    };

    /*
     * Returns true if all levels have been unlocked
     *
     * @return {Boolean}
     */
    $scope.isLastUnlocked = function () {
        return  $scope.challengeNo === $rootScope.progress.challengeNo;
    };
});