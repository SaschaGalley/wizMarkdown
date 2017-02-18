angular.module('wiz.markdown')

.directive('wizMarkdownInput', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			content: '=',
			inputTemplate: '='
		},
		replace: true,
		transclude: true,
		template: function($scope) {
			return $scope.inputTemplate || '<textarea class="markdown-input" ng-model="content"></textarea>';
		},
		link: function (scope, elem, attrs, ctrl) {
			var editor = new MarkdownDeepEditor.Editor(elem[0], null);
			editor.onPostUpdateDom = function (editor) {
				$timeout(function () {
					scope.content = elem.val();
				});
			};
		}
	};
}]);
