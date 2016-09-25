angular.module('mainApp').factory('contentService', function(){
    var contentObject = {};

    var randomEvents = {

    };

    var challenges = [
    {
        id: 'Scenario1',
        text: {
            heading: "Discount from supplier",
            resultSummary: "Your supplier is offering a discount if you pay for your order right now instead of end of the month. Do you take the offer?",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "Take the discount and pay now.",
                result: {
                    revenueChange: -50,
                    inFlowChange: 0,
                    outFlowChange: 0,
                   
                }
            },
            {
                optionText: "Don't take the discount and pay later",
                result: {
                    revenueChange: 100,
                    followup:{
                        text: "grandma gets mad and steals your shit",
                        revenueChange: -500,
                        inFlowChange: 123,
                        outFlowChange: 123,
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
                    }
            }
        ],
    },

    {
        id: 'Scenario2',
        text: {
            heading: "Customer Bankruptcy",
            resultSummary: "One of your biggest customer has just declared bankruptcy, the balance of $50 on the said customer's account receivable is now uncollectable.",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "CONTINUE",
                result: {
                    revenueChange: 0,
                    inFlowChange: -50,
                    outFlowChange: 0,
                    }
                }
        ],
    },

    {
        id: 'Scenario3',
        text: {
            heading: "Unexpected growth",
            resultSummary: "Your business is growing at an unexpectly fast rate. You are unable manage all aspects of the business and forced to turn away customers. It would take 2 weeks to train a new employee and increase sales. Would you hire more employees to increase your capacity?",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "Hire new employees, give them a 2 week training session",
                result: {
                    revenueChange: 0,
                    inFlowChange: 300,
                    outFlowChange: 170,
                }
            },
            {
                optionText: "Do not hire new employees",
                result: {
                    revenueChange: 0,
                    inFlowChange: 0,
                    outFlowChange: 0,
                    followup: {
                        text: "You missed an oppurtunity to grow your business previously, your competitors took the opening and expanded.You lost some market share becauase of it.",
                        inFlowChange: -50,
                    }
                }
            },
            {
                optionText: "Hire new employees, let them learn on the job",
                result: {
                    revenueChange: 0,
                    inFlowChange: 300,
                    outFlowChange: 100,
                    followup:{
                        text: "Due a lack of experience, your employees injuried themselves on the job. You have to pay for their medical expenses.",
                        revenueChange: -50,
                        inFlowChange: 0,
                        outFlowChange: 0,
                        newFollowupStatus:{
                            id: 'Bademployer',
                            icon: 'fa fa-ambulance',
                            title: "At least you paid for hospital bills",
                            description: "Employees might demand compensation in future",
                            effect: {
                             
                            }
                        }
                    },
                  
                }
            }
        ],
    },{
        id: 'Scenario4',
        text: {
            heading: "Expansion Oppurtunity",
            resultSummary: "You are presented with an oppurtunity to expand your current product line. If successful, you will double your sales and experience significant growth. However if the launch failed, it will damage your current product line and severely impact your sales. The expansion costs $. Do you choose to expand?",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "Do not expand current product line",
                result: {
                    revenueChange: 0,
                    inFlowChange: 0,
                    outFlowChange: 0,
                    followup: {
                        text: "You missed an oppurtunity to grow your business, your competitors took the opening and expanded. Some of your customers switched to your competitors.",
                        inFlowChange: -50,
                    }
                }
            },
            {
                optionText: "Invest the money into marketing current product line instead. ",
                result: {
                    revenueChange: 0,
                    inFlowChange: 230,
                    outFlowChange: 100,

                }
            },
            {
                optionText: "Expand your current product line",
                result: {
                    revenueChange: -300,
                    followup:{
                        text: "The prior expansion proved to be successful, you experienced a significant increase in sales.",
                        revenueChange: -500,
                        inFlowChange: 1300,
                        outFlowChange: 1000,
                        newFollowupStatus:{
                            id: 'Secondproduct',
                            icon: 'fa fa-usd',
                            title: "Expansionist",
                            description: "Expansion success!",
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
            heading: "Holiday Season!",
            resultSummary: "The holiday season is here! Your sales have increased significantly You don't have enough employees to cover the demand. Would you hire a part time employee, ask your current employee for overtime, or turn away your customers?",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "Hire a part time employee",
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
                optionText: "Ask your current employees if they can work overtime",
                result: {
                    revenueChange: 0,
                    inFlowChange: 260,
                    outFlowChange: 200
                    
                }
            },
            {
                optionText: "Turn away some customers",
                result: {
                    revenueChange: 0,
                    followup:{
                        text: "The customers who were turned away previously posted some bad reviews about your business and damaged your brand",
                        revenueChange: 0,
                        inFlowChange: -100,
                        outFlowChange: 0,
                        newFollowupStatus:{
                            id: 'Angry Customers',
                            icon: 'fa fa-thumbs-down',
                            title: "Angry Customers",
                            description: "You ONLY ruined their day during the holidays, no big deal, right?",
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
            heading: "Too much inventory?",
            resultSummary: "You feel like you have been buying too much inventory to fulfill the increasing demand. You are looking to buy an inventory management application to help you better manage your orders. The software costs  $150. Do you purchase the software?",
            resultSummaryLink: "www.google.com"
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
                        text: "You did not manage your inventory properly and had to liquidate a large portion for cashflow",
                        revenueChange: -80,
                        inFlowChange: 0,
                        outFlowChange: 0,
                     
                    },
                    
                }
            }
        ],
    },{
        id: 'Scenario7',
        text: {
            heading: "Better safe than sorry",
            resultSummary: "You realized that your business isn't insured, there is a special promotion going on and you can insure for business for $15 per week, would you like to insure  your business?",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "Insure your business ",
                result: {
                    revenueChange: 0,
                    inFlowChange: 0,
                    outFlowChange: 15,
                    followup: {
                        text: "Oh no! You business has been robbed! Silver lining, you are insured so you recouped all of your financial loses.",
                        revenueChange: 0
                    }
                }
            },
            {
                optionText: "Do not insure your business ",
                result: {
                    revenueChange:0,
                    inFlowChange: 0,
                    outFlowChange:0 ,
                    followup: {
                        text: "Oh no! You business has been robbed! Since your business wasn't insured, you will have to cover all of the costs yourself. Bummer!",
                        revenueChange: -300,
                    }
                }
            },
           
        ],
    },
    {
        id: 'Scenario8',
        text: {
            heading: "Weighing your options",
            resultSummary: "Industry trends shows a surge in inventory cost is highly likely in the next few month. You are thinking of purchasing a large amount of inventory now to avoid higher costs in the future, however, the amount of cash in your business account is insufficient to cover the order. What would you do?",
            resultSummaryLink: "www.google.com"
        },
        options: [
            {
                optionText: "Hold off on the order",
                result: {
                    revenueChange:0,
                    inFlowChange: 0,
                    outFlowChange: 60,
                    
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
                        revenueChange: -90,
                    }
                }
            },
            {
                optionText: "Negotiate for a credit term",
                result: {
                    revenueChange:0,
                    inFlowChange: 0,
                    outFlowChange:0 ,
                    
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
