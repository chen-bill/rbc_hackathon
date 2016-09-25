angular.module('mainApp').factory('contentService', function(){
    var contentObject = {};

    var randomEvents = {

    };

    var challenges = [
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
                        revenueChange: -100,
                        followup: {
                            text: "Grandma says thank you for saving her",
                            revenueChange: 1000,
                        }
                    }
                },
                {
                    optionText: "DO NOTHING",
                    result: {
                        revenueChange: 100,
                        followup:{
                            text: "grandma gets mad and steals your shit",
                            revenueChange: -500,
                            newFollowupStatus:{
                                id: 'brokeAf',
                                icon: 'fa fa-camera-retro',
                                title: "In Debt",
                                description: "Cash Outflow increased by $1000",
                                effect: {
                                    revenueChange: -100
                                }
                            }
                        },
                        newStatus:{
                            id: 'brokeAf',
                            icon: 'fa fa-camera-retro',
                            title: "In Debt",
                            description: "Cash Outflow increased by $1000",
                            effect: {
                                weeksUntil: 2,
                                revenueChange: -100
                            }
                        }
                    }
                }
            ],
        },
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
                        revenueChange: -100,
                        followup: {
                            text: "Grandma says thank you for saving her",
                            revenueChange: 1000,
                        }
                    }
                },
                {
                    optionText: "DO NOTHING",
                    result: {
                        revenueChange: 100,
                        followup:{
                            text: "grandma gets mad and steals your shit",
                            revenueChange: -500
                        }
                    }
                }
            ],
        },
        {

        },
        {

        },
    ];

    var mainEvent = [
        {
            scenario: "grandma fell down stairs",
            result: {
                resultString: "",
                moneyGain: "",
                
            }
        },{

        },{

        },{

        }
    ];

    contentObject.getRandomEvent = function(){
        return randomEvents;
    };

    contentObject.getMainEvent = function(){
        return challenges.splice(0,1)[0];
    };

    return contentObject;
});
