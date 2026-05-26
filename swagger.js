const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Garage API',
    description: 'Sports Car Garage API'
  },
  host: 'garage-api-909j.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);