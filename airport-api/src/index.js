require('reflect-metadata');
const express = require('express');
const AppDataSource = require('./data-source');

const app = express();
const port = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {
  console.log('Data Source has been initialized!');
  const airportRepository = AppDataSource.getRepository('Airport');

  app.get('/airport', async (req, res) => {
    const { iata_code } = req.query;

    if (!iata_code) {
      return res.status(400).send({ error: 'iata_code is required' });
    }

    try {
      const airport = await airportRepository.findOne({
        where: { iata_code },
        relations: ['city', 'city.country']
      });

      if (!airport) {
        return res.status(404).send({ error: 'Airport not found' });
      }

      const response = {
        airport: {
          id: airport.id,
          icao_code: airport.icao_code,
          iata_code: airport.iata_code,
          name: airport.name,
          type: airport.type,
          latitude_deg: airport.latitude_deg,
          longitude_deg: airport.longitude_deg,
          elevation_ft: airport.elevation_ft,
          address: {
            city: {
              id: airport.city.id,
              name: airport.city.name,
              country_id: airport.city.country ? airport.city.country.id : null,
              is_active: airport.city.is_active,
              lat: airport.city.lat,
              long: airport.city.long
            },
            country: airport.city.country ? {
              id: airport.city.country.id,
              name: airport.city.country.name,
              country_code_two: airport.city.country.country_code_two,
              country_code_three: airport.city.country.country_code_three,
              mobile_code: airport.city.country.mobile_code,
              continent_id: airport.city.country.continent_id
            } : null
          }
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error querying the database:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error during Data Source initialization:', error);
});
