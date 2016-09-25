var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optionsSchema = new Schema({
    shortUrl: String,
    options:[{
        currentWeek: Number,
        option:{
            optionText: String,
            result:{
                revenueChange: Number,
                inFlowChange: Number,
                outFlowChange: Number,
                followup:{
                    text: String,
                    revenueChange: Number
                }
            }
        },
        id: String,
        netWorth: Number,
        inFlow: Number,
        outFlow: Number
    }],
    statuses:[{
        id: String,
        icon: String,
        title: String,
        description: String,
        effect: {}
    }],
    flags:{
        tookLoan: Boolean,
        tookMortgage: Boolean
    }
});


var Options = mongoose.model('Options', optionsSchema);



module.exports = Options;



