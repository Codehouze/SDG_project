//make timeToElapse days
function Duration(periodType,timeToElapse){
    if (periodType=='months'){
        return timeToElapse * 30
    }
    else if(periodType=="weeks")
    {
       return timeToElapse * 7
    }
    else(periodType=="days")
     {
         //console.log(timeToElapse)  // return 58
        return timeToElapse
    }
}


// converts factorFigure to a whole number
 function factorFigure(timeToElapse){
 let result =  timeToElapse/3
 let days=Math.round(result)
 let res= 2**days 
 console.log(res)
 return res

}

let data  = {
    
    region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
        },
        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
}

    
  

const covid19ImpactEstimator = (data) => {
     
    const input = data;
    const impact = {}
    const serverImpact= {}
    
   //challenge one
    impact.currentlyInfected=input.reportedCases * 10
    serverImpact.currentlyInfected=input.reportedCases * 50
    serverImpact.infectionsByRequestedTime=  serverImpact.currentlyInfected*factorFigure(input.timeToElapse)
    impact.infectionsByRequestedTime= impact.currentlyInfected *factorFigure(input.timeToElapse)
    
    Duration(input.periodType,input.timeToElapse)
    factorFigure(input.timeToElapse)
    // console.log(se)

   
   // challenge two
   impact.severeCasesByRequestedTime = Math.round(15/100 * impact.infectionsByRequestedTime)
   serverImpact.severeCasesByRequestedTime=Math.round(15/100 * serverImpact.infectionsByRequestedTime)
   impact.hospitalBedsByRequestedTime= input.totalHospitalBeds - impact.severeCasesByRequestedTime
   serverImpact.hospitalBedsByRequestedTime = input.totalHospitalBeds - serverImpact.severeCasesByRequestedTime


   // challenge three 
   impact.casesForICUByRequestedTime = Math.round(5/100 * impact.infectionsByRequestedTime)
   serverImpact.casesForICUByRequestedTime = Math.round(5/100 * serverImpact.infectionsByRequestedTime)
   
//    2% of infectionsByRequestedTime.
    impact.casesForVentilatorsByRequestedTime = Math.round( 2/100 * impact.infectionsByRequestedTime)
    serverImpact.casesForVentilatorsByRequestedTime =Math.round(2/100 * serverImpact.infectionsByRequestedTime)


    // dollarsInFlight
    impact.dollarsInFlight=Math.round((impact.infectionsByRequestedTime*input.region.avgDailyIncomeInUSD*input.region.avgDailyIncomePopulation)/30)
    serverImpact.dollarsInFlight=Math.round((serverImpact.infectionsByRequestedTime*input.region.avgDailyIncomePopulation*input.region.avgDailyIncomeInUSD)/30)
    

    return {
        input,
        impact,
        serverImpact        
    
    };
};

const dave = covid19ImpactEstimator(data);

console.log(dave)
// export default covid19ImpactEstimator;
