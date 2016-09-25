(function(){
    angular.module('mainApp',['ngAnimate'])
    .controller('mainController', ['$scope','contentService','$interval', '$timeout', function($scope, contentService, $interval, $timeout) {
        console.log(contentService);

        var gameStats = [];

        $scope.weeks = [
            {
                week: 1,
                type: 'standard'
            },
            {
                week: 2,
                type: 'random'
            },
            {
                week: 3,
                type: 'standard'
            },
            {
                week: 4,
                type: 'random'
            },
            {
                week: 5,
                type: 'standard'
            },
            {
                week: 6,
                type: 'random'
            },
            {
                week: 7,
                type: 'standard'
            },
            {
                week: 8,
                type: 'random'
            },
            {
                week: 9,
                type: 'standard'
            },
            {
                week: 10,
                type: 'random'
            },
            {
                week: 11,
                type: 'standard'
            },
            {
                week: 12,
                type: 'random'
            },
            {
                week: 13,
                type: 'standard'
            },
        ];

        $scope.state = {
            currentWeek: 1,        //
            netWorth: 1000,
            netWorthChangeQueue: 0,
            inFlow: 100,
            outFlow: 50,
            popupState: 'challenge',
            followupQueue: [],
            currentFollowupEvent: {},
            statuses: [],
            statusText: '',
            statusTextWeeksUntil: '',
            flags: {
                showResult: false
            },
        };

        $scope.stateMouseover = function(statusObject){
            $scope.state.statusText = statusObject.description;
            if(statusObject.effect.weeksUntil){
                $scope.state.statusTextWeeksUntil = (statusObject.effect.weeksUntil + " week(s) until effect. ");
            }
        };

        $scope.stateMouseleave = function(){
            $scope.state.statusText = '';
            $scope.state.statusTextWeeksUntil = '';
        };


        $scope.selectOption = function(optionObject){
            var stat = {
                currentWeek: $scope.state.currentWeek,
                option: optionObject,
                id: $scope.challenge.id,
                netWorth: $scope.state.netWorth,
                inFlow: $scope.state.outFlow,
                outFlow: $scope.state.outFlow,
                statuses: $scope.state.status,
            };
            gameStats.push(stat);
            if(optionObject.result.followup){
                $scope.state.followupQueue.push(optionObject.result.followup);
            }
            if(optionObject.result.newStatus){
                $scope.state.statuses.push(optionObject.result.newStatus);
                applyStatusEffects(optionObject.result.newStatus);
            }

            $scope.netWorthChangeQueue += optionObject.result.revenueChange;
            $scope.state.flags.showResult = true;
            console.log(optionObject);
        };

        function applyStatusEffects(statusObject){
            if(statusObject.effect && statusObject.effect.revenueChange){
                if(statusObject.effect.revenueChange > 0){
                    $scope.state.inFlow += Math.abs(statusObject.effect.revenueChange);
                } else {
                    $scope.state.outFlow += Math.abs(statusObject.effect.revenueChange);
                }
            }
        }

        $scope.pressContinue = function(){
            $scope.state.flags.showResult = false;
            $timeout(newChallengeInit, 500);
        };

        function newChallengeInit(){
            $scope.state.currentWeek++;
            rngFollowup();
            calculateCashflow();
            updateStatusDates();
            $scope.challenge = contentService.getMainEvent();
        }

        function updateStatusDates(){
            for(var status in $scope.state.statuses) {
                if($scope.state.statuses[status].effect && $scope.state.statuses[status].effect.weeksUntil){
                    if($scope.state.statuses[status].effect.weeksUntil == 1){
                        applyStatusEffects($scope.state.statuses[status].effect);
                        $scope.state.statuses.splice(status,1);
                    }
                    $scope.state.statuses[status].effect.weeksUntil--;
                }
            }
        }

        function calculateCashflow(){
            $scope.state.netWorthChangeQueue += ($scope.state.inFlow - $scope.state.outFlow);
        }

        function rngFollowup(){
            console.log('rng followup');
            var randomNumber = Math.random();
            console.log(randomNumber);
            if($scope.state.followupQueue.length !== 0 && randomNumber >= 0.50){
                var nextFollowupEvent = $scope.state.followupQueue.splice(0,1)[0];
                $scope.state.currentFollowupEvent = nextFollowupEvent;
            }
        }

        $scope.followupClicked = function(){
            console.log($scope);
            var followupEvent = $scope.state.currentFollowupEvent;
            if (followupEvent.revenueChange){
                $scope.state.netWorthChangeQueue += followupEvent.revenueChange;
            }

            $scope.state.currentFollowupEvent = {};
        };

        $scope.statusClick = function(statusObject, statusIndex){
            console.log('Status object clicked');
            if(statusObject.effect.revenueChange){
                $scope.state.netWorthChangeQueue += statusObject.effect.revenueChange;
            }
            $scope.state.statuses.splice(statusIndex, 1);
        };

        $scope.debug = function(){
            console.log(Object.keys($scope.state.currentFollowupEvent).length !== 0);
            console.log($scope);
            $scope.state.statuses.push(sampleStatus);
        };
        
        var sampleFollowup = {

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
                if(change > 0){
                    $scope.state.netWorthChangeQueue -= 5;
                    $scope.state.netWorth += 5;
                } else {
                    $scope.state.netWorthChangeQueue += 5;
                    $scope.state.netWorth -= 5;
                }
            }
        }, 25);

        $scope.challenge = contentService.getMainEvent();
        console.log($scope.challenge);
    }]);
})();
