const { EntitySchema } = require('typeorm');

class Base {
  // Define common properties for all entities inheriting from Base
  constructor() {
    this.id = {primary: true, type: 'uuid', generated: 'uuid' };
    this.createdAt = { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' };
  }
}

module.exports = { Base };