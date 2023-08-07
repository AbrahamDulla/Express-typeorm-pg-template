const { EntitySchema } = require('typeorm');
const {Base} = require('./BaseModel')



class Post extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.title = { type: 'varchar' };
    this.body = { type: 'text' };
  }
}

module.exports = new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: new Post(),
});
