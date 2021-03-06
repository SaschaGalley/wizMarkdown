﻿angular.module('wiz.markdown')

.directive('wizMarkdownEditor', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			'content': '=',
			'textareaclass':'@?'
		},
		replace: true,
		transclude: true,
		template: function(tElem, tAttrs) {
			return'<div class="markdown-editor">' +
      '<div class="markdown-toolbar" ng-if="!toolbarBottom" ng-transclude></div>' +
				(tAttrs['inputTemplate'] || '<textarea class="markdown-input {{textareaclass}}" ng-model="content"></textarea>') +
      	'<div class="markdown-toolbar" ng-if="toolbarBottom" ng-transclude></div>' +
      '</div>';
    },
		controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) { }],
		link: function (scope, elem, attrs, ctrl) {
			var editor = new MarkdownDeepEditor.Editor(elem.find('textarea')[0], null);
			editor.onPostUpdateDom = function (editor) {
				$timeout(function () {
					scope.content = elem.find('textarea').val();
				});
			};
			scope.toolbarBottom = attrs.toolbar === 'bottom';
			// Exposes editor to other directives
			ctrl.editor = editor;
		}
	};
}]);
