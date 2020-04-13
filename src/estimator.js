//  make timeToElapse days
function Duration(periodType, timeToElapse) {
  switch (periodType) {
    case 'months':
      return timeToElapse * 30;
    case 'weeks':
      return timeToElapse * 7;
    case 'days':
      return timeToElapse * 1;
    default:
      return periodType;
  }
}

//  converts factorFigure to a whole number
function factorFigure(timeToElapse) {
  const result = timeToElapse / 3;
  const days = Math.floor(result);
  const res = 2 ** days;

  return res;
}

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const serverImpact = {};
  const factor = factorFigure(data.timeToElapse);
  //   challenge one
  impact.currentlyInfected = data.reportedCases * 10;
  serverImpact.currentlyInfected = data.reportedCases * 50;
  serverImpact.infectionsByRequestedTime = serverImpact.currentlyInfected * factor;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;

  Duration(data.periodType, data.timeToElapse);
  factorFigure(data.timeToElapse);

  //    challenge two
  impact.severeCasesByRequestedTime = Math.floor(
    (15 / 100) * impact.infectionsByRequestedTime
  );
  serverImpact.severeCasesByRequestedTime = Math.floor(
    (15 / 100) * serverImpact.infectionsByRequestedTime
  );
  const totalBeds = data.totalHospitalBeds;
  impact.hospitalBedsByRequestedTime = totalBeds - impact.severeCasesByRequestedTime;
  serverImpact.hospitalBedsByRequestedTime = totalBeds - serverImpact.severeCasesByRequestedTime;

  //    challenge three
  impact.casesForICUByRequestedTime = Math.floor(
    (5 / 100) * impact.infectionsByRequestedTime
  );
  serverImpact.casesForICUByRequestedTime = Math.floor(
    (5 / 100) * serverImpact.infectionsByRequestedTime
  );

  //    2% of infectionsByRequestedTime.
  impact.casesForVentilatorsByRequestedTime = Math.floor(
    (2 / 100) * impact.infectionsByRequestedTime
  );
  serverImpact.casesForVentilatorsByRequestedTime = Math.floor(
    (2 / 100) * serverImpact.infectionsByRequestedTime
  );

  //  dollarsInFlight
  impact.dollarsInFlight = Math.floor(
    (impact.infectionsByRequestedTime
      * data.region.avgDailyIncomeInUSD
      * data.region.avgDailyIncomePopulation)
      / 30
  );
  serverImpact.dollarsInFlight = Math.floor(
    (serverImpact.infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD)
      / 30
  );

  return {
    data,
    impact,
    serverImpact
  };
};

export default covid19ImpactEstimator;
