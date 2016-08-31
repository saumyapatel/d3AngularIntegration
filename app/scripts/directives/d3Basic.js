(function () {
    'use strict';

    angular.module('myApp.directives')
        .directive('d3Bars', ['d3', function (d3) {
            return {
                restrict: 'EA',
                scope: {
                    data: "=",
                    label: "@"
                },
                link: function (scope, iElement, iAttrs) {
                    var svg = d3.select(iElement[0])
                        .append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%");

                    // on window resize, re-render d3 canvas
                    window.onresize = function () {
                        return scope.$apply();
                    };
                    scope.$watch(function () {
                            return angular.element(window)[0].innerWidth;
                        }, function () {
                            return scope.render(scope.data);
                        }
                    );

                    // watch for data changes and re-render
                    scope.$watch('data', function (newVals, oldVals) {
                        return scope.render(newVals);
                    }, true);

                    // define render function
                    scope.render = function (data) {
                        // remove all previous items before render

                        svg.selectAll("*").remove();
                        console.log(svg.style("width"));
                        console.log(svg.style("height"));
                        var margin = {top: 20, right: 20, bottom: 20, left: 40};
                        console.log(d3.select(iElement[0])[0][0].offsetWidth);
                        //console.log(d3.select(iElement[0])[0][0].offsetHeight);
                        var width = parseInt(svg.style("width")) - margin.left - margin.right;
                        var height = parseInt(svg.style("height")) - margin.bottom - margin.top;
                        console.log(width, height);
                        var x = d3.scale.ordinal()
                            .rangeRoundBands([0, width], .9);

                        var y = d3.scale.linear()
                            .range([height, 0]);

                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");

                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left");

                        x.domain(data.map(function (d) {
                            return d.letter;
                        }));
                        y.domain([
                            [d3.min(data, function (d) {
                                return d.lower;
                            })],
                            d3.max(data, function (d) {
                                return d.higher;
                            })
                        ]);

                        var minY = d3.min(data, function (d) {
                            return d.lower;
                        });

                        svg.append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + height + ")")
                            .call(xAxis)
                            .attr("dx", ".2em");

                        svg.append("g")
                            .attr("class", "y axis")
                            .attr("transform", "translate(" + margin.left + ",0)")
                            .call(yAxis)
                            .attr("y", 10)
                            .attr("dy", ".2cm");

                        svg.selectAll(".bar")
                            .data(data)
                            .enter().append("rect")
                            .attr("class", "bar")
                            .attr("x", function (d) {
                                return x(d.letter);
                            })
                            .attr("width", x.rangeBand())
                            .attr("y", function (d) {
                                return y(d.higher);
                            })
                            .attr("height", function (d) {
                                return height - y(d.higher - d.lower + minY);
                            })
                            .attr("fill", function (d) {
                                return d.color;
                            });

                        /*
                         // setup variables
                         var width, height, max;
                         width = d3.select(iElement[0])[0][0].offsetWidth - 50;
                         // 20 is for margins and can be changed
                         height = scope.data.length * 35;
                         // 35 = 30(bar height) + 5(margin between bars)
                         max = 98;
                         // this can also be found dynamically when the data is not static
                         // max = Math.max.apply(Math
                         , _.map(data, ((val)-> val.count)))

                         // set the height based on the calculations above
                         svg.attr('height', height);

                         //create the rectangles for the bar chart
                         svg.selectAll("rect")
                         .data(data)
                         .enter()
                         .append("rect")
                         .on("click", function (d, i) {
                         return scope.onClick({item: d});
                         })
                         .attr("height", 30) // height of each bar
                         .attr("width", 0) // initial width of 0 for transition
                         .attr("x", 10) // half of the 20 side margin specified above
                         .attr("y", function (d, i) {
                         return i * 35;
                         }) // height + margin between bars
                         .transition()
                         .duration(1000) // time of duration
                         .attr("width", function (d) {
                         return d.score / (max / width);
                         }); // width based on scale

                         svg.selectAll("text")
                         .data(data)
                         .enter()
                         .append("text")
                         .attr("fill", "#fff")
                         .attr("y", function (d, i) {
                         return i * 35 + 22;
                         })
                         .attr("x", 15)
                         .text(function (d) {
                         return d[scope.label];
                         });
                         */
                    };
                }
            };
        }]);

}());
