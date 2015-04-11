var levels = require('../levels/index');

/*
 * Levels Controller
 *
 * Controller for levels selection screen
 */

var app = require('../app');

app.controller('LevelsController', function ($scope, $rootScope) {
    $scope.levels = levels;

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = function (index) {
        return index + 1 < $rootScope.progress.challengeNo;
    };

    /*
     * Returns true if challenge is locked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLocked = function (index) {
        return index >= $rootScope.progress.challengeNo;
    };

    /*
     * Returns true if challenge is last unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCurrent = function (index) {
        return index + 1 === $rootScope.progress.challengeNo;
    };

    /*
     * Returns true if all levels have been unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLastUnlocked = function (index) {
        return index === $rootScope.progress.challengeNo;
    };
});