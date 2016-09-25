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
                        inFlowChange: 100,
                        outFlowChange: -100,
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
                                    revenueChange: -100,
                                    cashFlowChange: 100
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
                                dot: -10,
                                revenueChange: -100
                            }
                        }
                    }
                }
            ],
        },
        {
            id: 'discountedProduct',
            text: {
                heading: "Your supplier is offering a 3% discount if you pay for your order right now instead of end of the month. Do you take the offer?",
                resultSummary: "something something happens",
                resultSummaryLink: "http://www.rbcroyalbank.com/business/startingabusiness/operating-your-business.html#managing"
            },
            options: [
                {
                    optionText: "PAY NOW",
                    result: {
                        revenueChange: -200,
                    }
                },
                {
                    optionText: "PAY LATER",
                    result: {
                        newStatus:{
                            id: 'paySupplier',
                            icon: 'fa fa-camera-retro',
                            title: "Pay Supplier",
                            effect: {
                                weeksUntil: 2,
                                revenueChange: -250
                            }
                        }
                    }
                }
            ],
        },
        {
            id: 'randomBankrupcy',
            text: {
                heading: "One of your biggest customer has just declared bankruptcy, the balance of $ on the said customer's account receivable is now uncollectable.",
                resultSummary: "over 100% over people dont save grandma",
                resultSummaryLink: "www.google.com"
            },
            options: [
                {
                    noResultSummary: true,
                    optionText: "Continue",
                    result: {
                        revenueChange: -100,
                    }
                }
            ],
        },
        {
            id: 'hireOrNoHire',
            text: {
                heading: "Your business is growing at an unexpectly fast rate. You are unable manage all aspects of the business and forced to turn away customers. It would take 2 weeks to train a new employee and increase sales.  Would you hire another employee to increase your capacity?",
                resultSummary: "Make sure to hire ppl its good",
                resultSummaryLink: "http://www.rbcroyalbank.com/RBC:Oma516wYUA4BJwDIyGEAAAC2/growing-business/managing_risk.html"
            },
            options: [
                {
                    optionText: "HIRE CONTRACTOR",
                    result: {
                        revenueChange: -1000,
                        cashFlowChange: 300,
                        newStatus:{
                            id: 'Hired Employee',
                            icon: 'fa fa-camera-retro',
                            title: "Hired CONTRACTOR",
                            description: "Your inflow is increased by 300/week",
                        }
                    }
                },
                {
                    optionText: "DO NOTHING",
                    result: {
                    }
                }
            ],
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
