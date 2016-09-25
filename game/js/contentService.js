angular.module('mainApp').factory('contentService', function(){
    var contentObject = {};

    var randomEvents = {

    }

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
    }

    contentObject.getMainEvent = function(){
        return mainEvent;
    }

    return contentObject;
});
