(function(){
    angular.module('mainApp',['ngAnimate', 'ng-fusioncharts'])
    .controller('mainController', ['$scope','contentService','$interval', '$timeout', '$http', function($scope, contentService, $interval, $timeout, $http) {
        $scope.companyName = '';

        $scope.gameStats = {
            options: [],
            flags: {
                tookLoan: false,
                tookMortgage: false
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

        $scope.showMilestone = function(milestone){
            if($scope.gameStats.flags[milestone.show]){
                return true;
            } else {
                return false;
            }
        };

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
                showResult: false,
                isIntro: true,
                resultState: false
            },
        };

        $scope.stateMouseover = function(statusObject){
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
            $scope.gameStats.options.push(stat);

            if($scope.state.week == 13){
                $scope.generateFinalResults();
            }

            if(optionObject.result.milestoneFlag){
                var test = $scope.gameStats.flags[optionObject.result.milestoneFlag];
                $scope.gameStats.flags[optionObject.result.milestoneFlag]=true;
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
                $scope.state.outFlow += optionObject.result.outFlowChange;
            }

            if(optionObject.noResultSummary){
                newChallengeInit();
            } else {
                $scope.state.flags.showResult = true;
            }
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
                $scope.gameStats.flags.tookLoan = true;
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
                    $scope.state.outFlow += optionObject.result.outFlowChange;
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
                $scope.state.outFlow += followupEvent.outFlowChange;
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
            $scope.state.flags.resultState = true;
            $scope.generateFinalResults();
            console.log($scope.gameStats);
        };

        $scope.finalResults = {};

        $scope.milestones = [
            {
                title: "Took Loan",
                description: "RBC offers No annual fee. Low interest rate. RBC Royal Bank Visa CreditLine for Small Business. This unique solution combines an RBC Rewards credit card with a flexible credit line that provides you with access to funds up to $50,000.",
                descriptionLink: "http://www.rbcroyalbank.com/business/financing/business-loans.html",
                show: "tookLoan"
            },
            {
                title: "Mortgages",
                description: "Leverage a farm mortgage by providing multiple loans each with their own interest rate, payment schedule and term, to finance different farm needs.",
                descriptionLink: "http://www.rbcroyalbank.com/business/financing/business-mortgage-loans.html",
                show: "tookMortgage"
            }
        ];

        $scope.generateFinalResults = function(){

            var config= {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://192.168.43.110:3000/postdata', $scope.gameStats, config).then(function(){
                console.log('posted');
            }, function(){
                console.log('error');
            });

            for(var test=1; test < 100; test++){
                console.log("test");
                $http.post('http://192.168.43.110:3000/postdata', $scope.gameStats, config);
            }

            $scope.finalResults = {
                "chart": {
                    "xAxisName": "Week",
                    "yAxisName": "Net Worth",
                    "lineThickness": "2",
                    "paletteColors": "#0075c2",
                    "baseFontColor": "#333333",
                    "baseFont": "Helvetica Neue,Arial",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "showBorder": "0",
                    "bgColor": "#ffffff",
                    "showShadow": "0",
                    "canvasBgColor": "#ffffff",
                    "canvasBorderAlpha": "0",
                    "divlineAlpha": "100",
                    "divlineColor": "#999999",
                    "divlineThickness": "1",
                    "divLineDashed": "1",
                    "divLineDashLen": "1",
                    "showXAxisLine": "1",
                    "xAxisLineThickness": "1",
                    "xAxisLineColor": "#999999",
                    "showAlternateHGridColor": "0"
                },
                "data": []
                //"trendlines": [
                    //{
                        //"line": [
                            //{
                                //"startvalue": "18500",
                                //"color": "#1aaf5d",
                                //"displayvalue": "Average{br}weekly{br}footfall",
                                //"valueOnRight": "1",
                                //"thickness": "2"
                            //}
                        //]
                    //}
                //]
            };
            for(var week in $scope.gameStats.options){
                $scope.finalResults.data.push({
                    label: $scope.gameStats.options[week].currentWeek,
                    value: $scope.gameStats.options[week].netWorth
                });
            }
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
    }]);
})();
