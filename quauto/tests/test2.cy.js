const GaragePage = require('POM/ QAutoAPItest.js');
const config = require('..config/qauto2.config.js');

describe('API Garage Tests', function() {
    let apiClient;
  
    before(async function() {
      apiClient = new QAutoAPI(qautoConfig);
      await apiClient.authenticate();
    });
  
    it('should add a car via API', async function() {
      const carDetails = { make: 'Toyota', model: 'Camry', year: 2020 };
      const car = await apiClient.addCar(carDetails);
      console.log('Car added:', car);
  
    });
  
    it('should add fuel expenses via API', async function() {
      const carId = 1;
      const expenseDetails = { amount: 50, date: '2024-08-21' };
      const expense = await apiClient.addFuelExpense(carId, expenseDetails);
      console.log('Fuel expense added:', expense);
     
    });
  });
  