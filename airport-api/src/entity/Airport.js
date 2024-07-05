const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Airport',
  tableName: 'airport',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    icao_code: {
      type: 'varchar'
    },
    iata_code: {
      type: 'varchar'
    },
    name: {
      type: 'varchar'
    },
    type: {
      type: 'varchar'
    },
    latitude_deg: {
      type: 'double'
    },
    longitude_deg: {
      type: 'double'
    },
    elevation_ft: {
      type: 'int'
    }
  },
  relations: {
    city: {
      target: 'City',
      type: 'many-to-one',
      joinColumn: {
        name: 'city_id'
      }
    }
  }
});
