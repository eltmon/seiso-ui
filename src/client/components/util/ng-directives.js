// var $ = require('jquery');


var enterDirective = function() {
  var directive = function() {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() { scope.$eval(attrs.ngEnter); });
          event.preventDefault();
        }
      });
    };
  };
  return [ directive ];
};

var focusDirective = function() {
  var directive = function() {
    return {
      link: function(scope, element, attrs) {
        element[0].focus();
      }
    };
  };
  return [ directive ];
};

var pieChartDirective = function() {
  var directive = function($window) {
    var d3 = $window.d3;
    
    // Draws a donut chart
    // chartId: chart container
    // dataset: chart data
    function drawPieChart(chartId, dataset) {
      console.log('Drawing pie chart');

      var width = 120;
      var height = 120;
      var radius = Math.min(width, height) / 2;
      var color = d3.scale.ordinal()
        .range(['#43AC6A', '#FFD34E', '#F04124']);
//        .range(['#43AC6A', '#F04124']);
      var arc = d3.svg.arc()
        .outerRadius(radius - 5)
        .innerRadius(radius - 30);
      var pie = d3.layout.pie()
        .value(function(d) { return d.count; })
        .sort(null);
      
      var svg = d3.select('#' + chartId)
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      
      var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { return color(d.data.type); });
    }
    
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        console.log('chartData=' + attrs.chartData);
        // FIXME There must be some way to pass the element in and then have
        // drawPieChart() attach the svg to the element...
        drawPieChart(attrs.id, scope[attrs.chartData]);
      }
    };
  };
  return [ '$window', directive ];
};

// http://stackoverflow.com/questions/21362712/html-file-as-content-in-bootstrap-popover-in-angularjs-directive
var rotationDetailsPopoverDirective = function() {
  var directive = function($compile, $templateCache, dataService) {
    return {
      restrict: 'A',
      // transclude: true,
      link: function($scope, $element, $attrs, $http) {
        
        // Get the template here, not outside this function. Otherwise the behavior is all funky when the user
        // activates multiple popups, applies the filter, etc.
        // http://stackoverflow.com/questions/16122139/angular-js-jquery-html-string-parsing-in-1-9-1-vs-1-8-3
        var template = $templateCache.get('rotationDetailsPopover.html');
        template = angular.element(template);
        var nodeName = $attrs.nodeName;
        var nodeIp = $attrs.nodeIp;
        console.log('transclude nodes: ', $scope.nodes);

        dataService.get('/nodes/search/findByName?name=' + nodeName)
          .then(function(res) {
            console.log('popover node: ', res);
            dataService.get(res.data._links.ipAddresses.href + '?projection=ipAddressDetails')
              .then(function(res) {
                console.log('ipAddressDetails: ', res);
                $scope.ipAddress = res.data._embedded.nodeIpAddresses[0];
                dataService.get($scope.ipAddress._links.endpoints.href + '?projection=endpointDetails')
                  .then(function(res) {
                    console.log('endpointDetails: ', res);
                  });
              });
          }, function(res) {
            return console.log(res);
          });
        
        var popoverContent = $compile(template)($scope);
        $($element).popover({
          title: 'Rotation Details',
          content: popoverContent,
          placement: 'top',
          html: true,
          date: $scope.date
        });

        // click off popover to close
        $('body').on('click', function(e) {
          if (!e.target.hasAttribute('rotation-details-popover')) $($element).popover('hide');
        });
      }
    };
  };
  return [ '$compile', '$templateCache', 'dataService', '$http', directive ];
};

// Register directives
module.exports = function(app) {
  app.directive('ngEnter', enterDirective())
    .directive('focus', focusDirective())
    .directive('pieChart', pieChartDirective())
    .directive('rotationDetailsPopover', rotationDetailsPopoverDirective());
};

