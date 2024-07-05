const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'City',
  tableName: 'city',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    is_active: {
      type: 'boolean'
    },
    lat: {
      type: 'double'
    },
    long: {
      type: 'double'
    }
  },
  relations: {
    country: {
      target: 'Country',
      type: 'many-to-one',
      joinColumn: {
        name: 'country_id'
      }
    },
    airports: {
      target: 'Airport',
      type: 'one-to-many',
      inverseSide: 'city'
    }
  }
});
