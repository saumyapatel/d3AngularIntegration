(function () {
  'use strict';

  angular.module('myApp.controllers')
    .controller('DemoCtrl2', ['$scope', function($scope){
        var aggreg = [
            {
                "max": 40.78709182192197,
                "min": 21.623184284540873,
                "violations": 11
            },
            {
                "max": 35.859605623488164,
                "min": 25.84863616586513,
                "violations": 13
            },
            {
                "max": 51.859605623488164,
                "min": 15.84863616586513,
                "violations": 13
            }

        ];
        var day = [
            "2016-08-24",
            "2016-08-25",
            "2016-08-26"
        ];
        var maxt = 36;
        var mint = 20;
        var data = [];
        console.log('floatingBarChartCtrl');
        generateData(aggreg, day, maxt, mint);
        function generateData(aggreg, day, maxt, mint) {
            for (var i = 0; i < day.length; i++) {
                if (aggreg[i].min >= maxt || aggreg[i].max <= mint) {
                    data.push({"letter": day[i], "higher": aggreg[i].max, "lower": aggreg[i].min, color: "red"});
                } else if (aggreg[i].max <= maxt && aggreg[i].min >= mint) {
                    data.push({"letter": day[i], "higher": aggreg[i].max, "lower": aggreg[i].min, color: "blue"});
                }
                else {

                    if (aggreg[i].max >= maxt && aggreg[i].min <= mint) {
                        data.push({"letter": day[i], "higher": aggreg[i].max, "lower": maxt, color: "red"});
                        data.push({"letter": day[i], "higher": mint, "lower": aggreg[i].min, color: "red"});
                        data.push({"letter": day[i], "higher": maxt, "lower": mint, color: "blue"});
                    }
                    else if (aggreg[i].max >= maxt && aggreg[i].min >= mint) {
                        data.push({"letter": day[i], "higher": aggreg[i].max, "lower": maxt, color: "red"});
                        data.push({"letter": day[i], "higher": maxt, "lower": aggreg[i].min, color: "blue"});
                    } else if (aggreg[i].max > mint && aggreg[i].max < maxt && aggreg[i].min < mint) {
                        data.push({"letter": day[i], "higher": aggreg[i].max, "lower": mint, color: "blue"});
                        data.push({"letter": day[i], "higher": mint, "lower": aggreg[i].min, color: "red"});
                        data.push({"letter": day[i], "higher": mint, "lower": aggreg[i].min, color: "red"});
                    }

                }
            }
        }
        $scope.d3Data= data;
    }]);

}());
