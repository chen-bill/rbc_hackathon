(function(){
    angular.module('mainApp',['ngAnimate'])
    .controller('mainController', ['$scope','contentService','$interval', '$timeout', function($scope, contentService, $interval, $timeout) {
        console.log(contentService);

        var gameStats = {
            options: [],
            flags: {
                tookLoan: false
            }
        };

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
            statusTextRevenueChange: '',
            flags: {
                showResult: false
            },
        };

        $scope.stateMouseover = function(statusObject){
            console.log(statusObject);
            $scope.state.statusText = statusObject.description;
            if(statusObject.effect.revenueChange){
                $scope.state.statusTextRevenueChange = "Amount Owed: " + statusObject.effect.revenueChange;
            }
            if(statusObject.effect.weeksUntil){
                $scope.state.statusTextWeeksUntil = (statusObject.effect.weeksUntil + " week(s) until effect. ");
            }
        };

        $scope.stateMouseleave = function(){
            $scope.state.statusText = '';
            $scope.state.statusTextWeeksUntil = '';
            $scope.state.statusTextRevenueChange = '';
        };


        $scope.selectOption = function(optionObject){
            console.log($scope.cannotAfford(optionObject));
            if($scope.cannotAfford(optionObject)){
                return;
            }

            var stat = {
                currentWeek: $scope.state.currentWeek,
                option: optionObject,
                id: $scope.challenge.id,
                netWorth: $scope.state.netWorth,
                inFlow: $scope.state.inFlow,
                outFlow: $scope.state.outFlow,
                statuses: $scope.state.status,
            };
            gameStats.options.push(stat);

            if($scope.state.week == 13){
            }

            if(optionObject.result.followup){
                $scope.state.followupQueue.push(optionObject.result.followup);
            }
            if(optionObject.result.newStatus){
                $scope.state.statuses.push(optionObject.result.newStatus);
                applyStatusEffects(optionObject.result.newStatus);
            }
            if(optionObject.result.revenueChange){
                $scope.state.netWorthChangeQueue += optionObject.result.revenueChange;
            }

            if(optionObject.result.inFlowChange){
                $scope.state.inFlow += optionObject.result.inFlowChange;
            }

            if(optionObject.result.outFlowChange){
                $scope.state.inFlow += optionObject.result.outFlowChange;
            }

            if(optionObject.noResultSummary){
                newChallengeInit();
            } else {
                $scope.state.flags.showResult = true;
            }
            console.log(optionObject);
        };

        $scope.cannotAfford = function(option){
            if(option.effect && option.effect.revenueChange < 0 && Math.abs(option.effect.revenueChange) > $scope.state.netWorth){
                return true;
            }
            if(option.result && option.result.revenueChange < 0 && Math.abs(option.result.revenueChange) > $scope.state.netWorth){
                return true;
            }
            //if()
            
            return false;
        };

        $scope.getRevenueString = function(amount){
            if(amount > 0){
                return "($" + amount + ")";
            } else if(amount < 0){
                return "(-$" +Math.abs(amount) + ')';
            } else {
                return '';
            }
        };

        $scope.clickableObjects = [
            {
                id: "loan",
                title: "Loan",
                icon: 'fa fa-money',
                description: "Get a $1000 Loan, +$50 debt/week. Must be paid fully in 4 weeks",
                result: {
                    revenueChange: 1000,
                    newStatus:{
                        id: 'loan',
                        icon: 'fa fa-money',
                        title: "In Debt",
                        clickable: true,
                        description: "You owe money after taking out a loan. Loan must be paid within 4 weeks",
                        effect: {
                            weeksUntil: 4,
                            dot: -50,
                            revenueChange: -1000
                        }
                    }
                }
            },
            {}
        ];

        $scope.clickableMouseover = function(object){
            $scope.state.statusText = object.description;
        };

        $scope.clickClickable = function(object){
            if(object.id === 'loan'){
                gameStats.flags.tookLoan = true;
            }
            $scope.state.statuses.push(object.result.newStatus);
            $scope.state.netWorthChangeQueue += object.result.revenueChange;
        };

        function applyStatusEffects(statusObject){
            if(statusObject.effect){
                if(statusObject.effect.revenueChange){
                    $scope.state.netWorthChangeQueue += statusObject.effect.revenueChange;
                }
                if(statusObject.effect.inFlowChange){
                    $scope.state.inFlow += optionObject.result.inFlowChange;
                }
                if(statusObject.effect.outFlowChange){
                    $scope.state.inFlow += optionObject.result.outFlowChange;
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
                    if($scope.state.statuses[status].effect.dot){
                        $scope.state.statuses[status].effect.revenueChange += $scope.state.statuses[status].effect.dot;
                    }
                    $scope.state.statuses[status].effect.weeksUntil--;
                    if($scope.state.statuses[status].effect.weeksUntil === 0){
                        applyStatusEffects($scope.state.statuses[status].effect);
                        $scope.state.statuses.splice(status,1);
                    }
                }
            }
        }

        function calculateCashflow(){
            $scope.state.netWorthChangeQueue += ($scope.state.inFlow - $scope.state.outFlow);
        }

        function rngFollowup(){
            var randomNumber = Math.random();
            if($scope.state.followupQueue.length !== 0 && randomNumber >= 0.50){
                var nextFollowupEvent = $scope.state.followupQueue.splice(0,1)[0];
                $scope.state.currentFollowupEvent = nextFollowupEvent;
            }
        }

        $scope.followupClicked = function(){
            var followupEvent = $scope.state.currentFollowupEvent;
            if (followupEvent.revenueChange){
                $scope.state.netWorthChangeQueue += followupEvent.revenueChange;
            }
            if(followupEvent.inFlowChange){
                $scope.state.inFlow += followupEvent.inFlowChange;
            }
            if(followupEvent.outFlowChange){
                $scope.state.inFlow += followupEvent.outFlowChange;
            }

            $scope.state.currentFollowupEvent = {};
        };

        $scope.statusClick = function(statusObject, statusIndex){
            if($scope.cannotAfford(statusObject)){
                return;
            }
            if(statusObject.clickable){
                applyStatusEffects(statusObject);
                $scope.state.statuses.splice(statusIndex, 1);
            }

        };

        $scope.debug = function(){
            console.log($scope);
            //$scope.state.statuses.push(sampleStatus);
            //$scope.state.netWorth = 0;
            console.log(JSON.stringify(gameStats));
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
        }, 10);

        $scope.challenge = contentService.getMainEvent();
        console.log($scope.challenge);
    }]);
})();
