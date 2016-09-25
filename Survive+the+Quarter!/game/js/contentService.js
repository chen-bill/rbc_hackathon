angular.module('mainApp').factory('contentService', function(){
    var contentObject = {};

    var randomEvents = {

    };

    var challenges = [
    {
        id: 'Scenario1',
        text: {
            heading: "Your supplier is offering a discount if you pay for your order right now instead of end of the month. Do you take the offer?",
            resultSummary: "Good cashflow management is essential for a small business.",
            resultSummaryLink: "http://www.rbcroyalbank.com/business/startingabusiness/operating-your-business.html#managing"
        },
        options: [
            {
                optionText: "Take the discount and pay now",
                result: {
                    milestoneFlag: 'tookMortgage',
                    revenueChange: -400,
                    inFlowChange: 0,
                    outFlowChange: 0,
                }
            },
            {
                optionText: "Don't take the discount and pay later",
                result: {
                    //followup:{
                        //text: "grandma gets mad and steals your shit",
                        //revenueChange: -500,
                        //inFlowChange: 123,
                        //outFlowChange: 123,
                        //newFollowupStatus:{
                            //id: 'brokeAf',
                            //icon: 'fa fa-camera-retro',
                            //title: "In Debt",
                            //description: "Cash Outflow increased by $1000",
                            //effect: {
                                //revenueChange: -100,
                                //cashFlowChange: 100
                            //}
                        //}
                    //},
                    newStatus:{
                        id: 'paySupplierLater',
                        icon: 'fa fa-hourglass-end',
                        title: "Pay Supplier",
                        description: "You will soon have to pay your supplier.",
                        effect: {
                            weeksUntil: 2,
                            revenueChange: -600
                        }
                    }
                }
            }
        ],
    },

    {
        id: 'Scenario2',
        text: {
            heading: "One of your biggest customers has just declared bankruptcy. the balance of $50 on the customer's account receivable is now uncollectable.",
            resultSummary: "Your customers keep your business alive. What affects them affects you.",
            resultSummaryLink: "http://www.rbcroyalbank.com/business/startingabusiness/operating-your-business.html#managing"
        },
        options: [
            {
                optionText: "CONTINUE",
                result: {
                    revenueChange: 0,
                    inFlowChange: -50,
                    outFlowChange: 0,
                    newStatus:{
                        id: 'customerBankrupt',
                        icon: 'fa fa-hand-o-down',
                        title: "Lost a Customer",
                        description: "Inflow decreased by 50.",
                        effect: {
                        }
                    }
                }
            }
        ],
    },

    {
        id: 'Scenario3',
        text: {
            heading: "Your business is growing at an unexpectly fast rate. You are unable manage all aspects of the business yourself and forced to turn away customers. A new employee would increase sales, but training is expensive. Do you hire?",
            resultSummary: "Expanding your team is an important decision.",
            resultSummaryLink: "http://www.rbcroyalbank.com/RBC:Oma516wYUA4BJwDIyGEAAAC2/growing-business/managing_risk.html"
        },
        options: [
            {
                optionText: "Hire a new employee, give them a training session",
                result: {
                    revenueChange: -500,
                    inFlowChange: 300,
                    outFlowChange: 150,
                    newStatus:{
                        id: "expandedTeamTrained",
                        icon: "fa fa-user-plus",
                        title: "Expanded Team - Trained",
                        description: "Your training has created an excellent employee. Inflow +300, Outflow +150."
                    }
                }
            },
            {
                optionText: "Do not hire new employees",
                result: {
                    revenueChange: 0,
                    inFlowChange: 0,
                    outFlowChange: 0,
                    followup: {
                        text: "You missed an earlier opportunity to grow your business. Your competitors took the opening and expanded. Some market share was lost.",
                        inFlowChange: -100,
                        newFollowupStatus:{
                            id:"shareLoss",
                            icon:"fa fa-pie-chart",
                            title:"Reduced Market Share",
                            description:"Inflow -100."
                        }
                    }
                }
            },
            {
                optionText: "Hire new untrained employees",
                result: {
                    revenueChange: 0,
                    inFlowChange: 200,
                    outFlowChange: 150,
                    status:{
                        id: "expandedTeamUntrained",
                        icon: "fa fa-user",
                        title: "Expanded Team - Untrained",
                        description:"A new employee has joined your team. Inflow +200, Outflow +150."
                    },
                    followup:{
                        text: "Due to lack of experience, your employee was injured on the job. You have to pay for their medical expenses.",
                        revenueChange: -400,
                        inFlowChange: 0,
                        outFlowChange: 0
                    },
                  
                }
            }
        ],
    },{
        id: 'Scenario4',
        text: {
            heading: "You see an oppurtunity to expand your product line. This investment may result in significant growth later on. Do you attempt to expand?",
            resultSummary: "Marketing gives your product exposure. Expanding your line may satisfy untapped demand.",
            resultSummaryLink: "http://www.rbcroyalbank.com/business/startingabusiness/marketing.html"
        },
        options: [
            {
                optionText: "Do not expand current product line",
                result: {
                    revenueChange: 0,
                    inFlowChange: 0,
                    outFlowChange: 0,
                    followup: {
                        text: "You missed an earlier opportunity to grow your business. Your competitors took the opening and expanded. Some market share was lost.",
                        inFlowChange: -100,
                        newFollowupStatus:{
                            id:"shareLossMarketing",
                            icon:"fa fa-pie-chart",
                            title:"Reduced Market Share",
                            description:"Inflow -100."
                        }
                    }
                }
            },
            {
                optionText: "Invest the money into marketing current product line instead",
                result: {
                    revenueChange: -100,
                    inFlowChange: 100,
                    outFlowChange: 50,

                }
            },
            {
                optionText: "Expand your current product line",
                result: {
                    revenueChange: -250,
                    outFlowChange: 50,
                    followup:{
                        text: "Your earlier product line expansion proved to be successful, and greatly increased your sales.",
                        revenueChange: 0,
                        inFlowChange: 300,
                        outFlowChange: 0,
                        newFollowupStatus:{
                            id: 'lineExpansion',
                            icon: 'fa fa-usd',
                            title: "Expansionist",
                            description: "Product line expansion was a success!",
                            effect: {
                            }
                        }
                    },
                }
            }
        ],
    },{
        id: 'Scenario5',
        text: {
            heading: "The holiday season is here! Your sales have increased significantly. You don't have enough human capital to cover demand. What do you do?",
            resultSummary: "Forecasting your cashflow can be tricky. Luckily, RBC has a tool for that.",
            resultSummaryLink: "http://www.rbcroyalbank.com/cgi-bin/business/cashflow/start.cgi"
        },
        options: [
            {
                optionText: "Hire a part time employee",
                result: {
                    revenueChange: 100,
                    inFlowChange: 0,
                    outFlowChange: 0,
                    followup: {
                        text: "Grandma says thank you for saving her",
                        revenueChange: 1000,
                    },
                }
            },
            {
                optionText: "Ask your current employees if they can work overtime",
                result: {
                    revenueChange: 400,
                    inFlowChange: 0,
                    outFlowChange: 125
                }
            },
            {
                optionText: "Turn away some customers",
                result: {
                    revenueChange: 0,
                    followup:{
                        text: "Customers you turned away earlier posted some bad reviews about your business and damaged your brand.",
                        revenueChange: 0,
                        inFlowChange: -100,
                        outFlowChange: 0,
                        newFollowupStatus:{
                            id: 'badReviews',
                            icon: 'fa fa-star-half-o',
                            title: "Bad Reviews",
                            description: "Your reputation has been damaged. Inflow -100.",
                            effect: {
                            }
                        }
                    }
                }
            }
        ],
    },{
        id: "Scenario6",
        text: {
            heading: "Managing your inventory is tough. An opportunity comes up to purchase inventory management software.",
            resultSummary: "In the information era, pen and paper can be improved upon.",
            resultSummaryLink: "http://www.rbcroyalbank.com/RBC:Qu6v5awYUAsD-wEC94kAAAAt/growing-business/updating_your_systems.html"
        },
        options: [
            {
                optionText: "Purchase software",
                result: {
                    revenueChange: -150,
                    inFlowChange: 0,
                    outFlowChange: -50,
                }
            },
            {
                optionText: "Do not purchase software",
                result: {
                    revenueChange: 0,
                    followup:{
                        text: "Your handwritten 0's and 8's look awfully similar in your logbook.",
                        revenueChange: -80,
                        inFlowChange: 0,
                        outFlowChange: 80,
                        newFollowupStatus:{
                            id: "noSoftware",
                            icon: "fa fa-eraser",
                            title: "Smudged Records",
                            description: "A software solution would have avoided this problem. Outflow +80."
                        }
                    }    
                }
            }
        ],
    },{
        id: 'Scenario7',
        text: {
            heading: "You realise that your business isn't fully insured. There is an insurance promotion going on. Would you like to insure your business?",
            resultSummary: "Protecting your business is the right thing to do.",
            resultSummaryLink: "http://www.rbcroyalbank.com/RBC:Oma516wYUA4BJwDIyGEAAAC2/growing-business/protecting_your_business.html"
        },
        options: [
            {
                optionText: "Insure your business",
                result: {
                    revenueChange: 0,
                    inFlowChange: 0,
                    outFlowChange: 70,
                    newStatus:{
                        id: "insuredYes",
                        icon: "fa fa-shield",
                        title: "Insured",
                        description: "Your sleep has been better lately."
                    },
                    followup: {
                        text: "Oh no! You business has been robbed! Silver lining: you are insured so you recouped all of your financial loses.",
                        revenueChange: 0
                    }
                }
            },
            {
                optionText: "Do not insure your business ",
                result: {
                    revenueChange:0,
                    inFlowChange: 0,
                    outFlowChange:0,
                    newStatus:{
                        id: "insuredNo",
                        icon: "fa fa-toggle-off",
                        title: "Not Insured",
                        description: "Bad things can happen to good people."
                    },
                    followup: {
                        text: "Oh no! You business has been robbed! Since your business wasn't insured, you will have to cover all of the costs yourself.",
                        revenueChange: -300,
                    }
                }
            },
           
        ],
    },
    {
        id: 'Scenario8',
        text: {
            heading: "Trends show a surge in your inventory costs is likely to occur in the next month. How do you respond to this?",
            resultSummary: "Market trends. They matter.",
            resultSummaryLink: "http://www.rbc.com/economics/economic-reports/quarterly-economic-update.html"
        },
        options: [
            {
                optionText: "Hold off on the order",
                result: {
                    revenueChange:0,
                    inFlowChange: 0,
                    outFlowChange: 50,
                    newStatus:{
                        id: 'supplyCosts',
                        title: "Increased Supply Costs",
                        description: "Outflow +50."
                    }
                }
            },
            {
                optionText: "Purchase from your personal account instead",
                result: {
                    revenueChange:0,
                    inFlowChange: 0,
                    outFlowChange:0,
                    followup: {
                        text: "Since you purchased the inventory through your own account, you didn't receive the tax credit you would have received normally",
                        revenueChange: -100,
                    }
                }
            },
        ],
    },
    ];

    //var challenges = [
        //{
            //id: 'grandma',
            //text: {
                //heading: "Grandma fell down the stairs",
                //resultSummary: "over 100% over people dont save grandma",
                //resultSummaryLink: "http://www.google.com"
            //},
            //options: [
                //{
                    //optionText: "SAVE HER",
                    //result: {
                        //revenueChange: -100,
                        //inFlowChange: 100,
                        //outFlowChange: -100,
                        //followup: {
                            //text: "Grandma says thank you for saving her",
                            //revenueChange: 1000,
                        //}
                    //}
                //},
                //{
                    //optionText: "DO NOTHING",
                    //result: {
                        //revenueChange: 100,
                        //followup:{
                            //text: "grandma gets mad and steals your shit",
                            //revenueChange: -500,
                            //newFollowupStatus:{
                                //id: 'brokeAf',
                                //icon: 'fa fa-camera-retro',
                                //title: "In Debt",
                                //description: "Cash Outflow increased by $1000",
                                //effect: {
                                    //revenueChange: -100,
                                    //inFlowChange: 100
                                //}
                            //}
                        //},
                        //newStatus:{
                            //id: 'brokeAf',
                            //icon: 'fa fa-camera-retro',
                            //title: "In Debt",
                            //description: "Cash Outflow increased by $1000",
                            //effect: {
                                //weeksUntil: 2,
                                //dot: -10,
                                //revenueChange: -100
                            //}
                        //}
                    //}
                //}
            //],
        //},
        //{
            //id: 'discountedProduct',
            //text: {
                //heading: "Your supplier is offering a 3% discount if you pay for your order right now instead of end of the month. Do you take the offer?",
                //resultSummary: "something something happens",
                //resultSummaryLink: "http://www.rbcroyalbank.com/business/startingabusiness/operating-your-business.html#managing"
            //},
            //options: [
                //{
                    //optionText: "PAY NOW",
                    //result: {
                        //revenueChange: -200,
                    //}
                //},
                //{
                    //optionText: "PAY LATER",
                    //result: {
                        //newStatus:{
                            //id: 'paySupplier',
                            //icon: 'fa fa-camera-retro',
                            //title: "Pay Supplier",
                            //descriptoin: "Owe supplier money",
                            //effect: {
                                //weeksUntil: 2,
                                //revenueChange: -250
                            //}
                        //}
                    //}
                //}
            //],
        //},
        //{
            //id: 'randomBankrupcy',
            //text: {
                //heading: "One of your biggest customer has just declared bankruptcy, the balance of $ on the said customer's account receivable is now uncollectable.",
                //resultSummary: "over 100% over people dont save grandma",
                //resultSummaryLink: "www.google.com"
            //},
            //options: [
                //{
                    //noResultSummary: true,
                    //optionText: "Continue",
                    //result: {
                        //revenueChange: -100,
                    //}
                //}
            //],
        //},
        //{
            //id: 'hireOrNoHire',
            //text: {
                //heading: "Your business is growing at an unexpectly fast rate. You are unable manage all aspects of the business and forced to turn away customers. It would take 2 weeks to train a new employee and increase sales.  Would you hire another employee to increase your capacity?",
                //resultSummary: "Make sure to hire ppl its good",
                //resultSummaryLink: "http://www.rbcroyalbank.com/RBC:Oma516wYUA4BJwDIyGEAAAC2/growing-business/managing_risk.html"
            //},
            //options: [
                //{
                    //optionText: "HIRE CONTRACTOR",
                    //result: {
                        //revenueChange: -1000,
                        //inFlowChange: 300,
                        //newStatus:{
                            //id: 'Hired Employee',
                            //icon: 'fa fa-camera-retro',
                            //title: "Hired CONTRACTOR",
                            //description: "Your inflow is increased by 300/week",
                            //effect: {}
                        //}
                    //}
                //},
                //{
                    //optionText: "DO NOTHING",
                    //result: {
                    //}
                //}
            //],
        //},
    //];

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

