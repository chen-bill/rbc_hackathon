(function(){
    angular.module('mainApp',['ngAnimate'])
    .controller('mainController', ['$scope','contentService','$interval', '$timeout', function($scope, contentService, $interval, $timeout) {
        console.log(contentService);


        $scope.weeks = [1,2,3,4,5,6,7,8,9,10];

        $scope.state = {
            currentWeek: 1,        //
            income: 100,
            netWorth: 1000,
            netWorthChangeQueue: 0,
            inFlow: 100,
            outFlow: 50,
            popupState: 'challenge',
            followupEvents: [],
            statuses: [],
            statusText: '',
            flags: {
                showResult: false
            }
        };


        $scope.challenges = [
            {
                id: 'grandma',
                text: {
                    heading: "Grandma fell down the stairs",
                    resultSummary: "over 100% over people dont save grandma",
                    resultSummaryLink: "www.google.com"
                },
                options: [
                    {
                        optionText: "SAVE HER",
                        result: {
                            revenueChange: -100
                        }
                    },
                    {
                        optionText: "DO NOTHING",
                        result: {
                            revenueChange: 100
                        }
                    }
                ],
            },
            {

            },
            {

            },
            {

            },
        ];

        $scope.selectOption = function(resultObject){
            console.log(resultObject);
            $scope.state.flags.showResult = true;
       };

        function showResult(){
        }

        $scope.statusClick = function(statusObject, statusIndex){
            console.log('Status object clicked');
            if(statusObject.effect.revenueChange){
                $scope.state.netWorthChangeQueue += statusObject.effect.revenueChange;
            }
            $scope.state.statuses.splice(statusIndex, 1);
        };

        $scope.debug = function(){
            console.log($scope);
            $scope.state.statuses.push(sampleStatus);
        };

        var sampleStatus = {
            id: 'brokeAf',
            icon: 'fa fa-camera-retro',
            title: "In Debt",
            description: "Cash Outflow increased by $1000",
            effect: {
                revenueChange: -100
            }
        };

        $scope.getNetFlow = function(){
            return $scope.state.inFlow - $scope.state.outFlow;
        };

        var netWorthChangeInterval = $interval(function(){
            change = $scope.state.netWorthChangeQueue;
            if(change !== 0){
                if(change < 0){
                    $scope.state.netWorthChangeQueue += 5;
                    $scope.state.netWorth += 5;
                } else {
                    $scope.state.netWorthChangeQueue -= 5;
                    $scope.state.netWorth -= 5;
                }
            }
        }, 25);
    }]);
})();
