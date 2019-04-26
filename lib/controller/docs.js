/*
 * Docs Controller
 *
 * Controller for documentation section
 */

import app from '../app';

app.controller('DocsController', function ($scope) {
    /*
     * Select a category
     *
     * @param {String} category
     * @return void
     */
    $scope.selectCategory = function (category) {
        $scope.current = category;
    };

    setTimeout(function() {
        $scope.selectCategory($scope.categories[0]);
        $scope.$apply();
    }, 0);

});