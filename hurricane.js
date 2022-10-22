const avro = require('avsc');

const type = avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'category',
      type: 'int',
    },
    {
      name: 'speed',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    }
  ]
});

module.exports = type;