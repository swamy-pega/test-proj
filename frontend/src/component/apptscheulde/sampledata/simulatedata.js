const vehicleData = {
  vehicles: [
    {
      make: 'Toyota',
      years: [
        { year: 2020, types: ['Sedan', 'SUV'] },
        { year: 2021, types: ['Truck', 'SUV'] }
      ]
    },
    {
      make: 'Honda',
      years: [
        { year: 2019, types: ['Sedan'] }
      ]
    }
  ]
};


export default vehicleData;

export const newVehicleData = {
  vehicleDataMap: {
    ACURA: {
      1986: ['INTEGRA', 'LEGEND'],
      1987: ['INTEGRA', 'LEGEND'],
      1988: ['INTEGRA', 'LEGEND']
    },
    BUICK: {
      1981: [
        'CENTURY',
        'ELECTRA',
        'LESABRE',
        'REGAL',
        'RIVIERA',
        'SKYLARK'
      ],
      1982: [
        'CENTURY',
        'ELECTRA',
        'LESABRE',
        'REGAL',
        'RIVIERA',
        'SKYHAWK',
        'SKYLARK'
      ]
    }
  }
};
