const sortBy = require('../../utils/sorter');
const Pagitator = require('../../utils/paginator');

module.exports = function findAll({ tableName, paginationOptions, sortOptions }) {
  if (
    sortOptions &&
    Object.values(sortOptions).length > 0 &&
    paginationOptions &&
    3 > Object.values(paginationOptions).length > 0
  ) {
    const { columnName, orderBy } = sortBy({ columnName: sortOptions.option });
    const { skip, take } = Pagitator({ ...paginationOptions });

    return this.createQueryBuilder(tableName)
      .orderBy(`${tableName}.${columnName}`, `${orderBy}`)
      .skip(skip)
      .take(take)
      .getMany();
  }

  if (sortOptions && Object.values(sortOptions).length > 0) {
    const { columnName, orderBy } = sortBy({ columnName: sortOptions.option });
    return this.createQueryBuilder(tableName).orderBy(`${tableName}.${columnName}`, `${orderBy}`).getMany();
  }

  if (paginationOptions && 3 > Object.values(paginationOptions).length > 0) {
    const { skip, take } = Pagitator({ ...paginationOptions });
    return this.createQueryBuilder(tableName).skip(skip).take(take).getMany();
  }

  return this.createQueryBuilder(tableName).orderBy(`${tableName}.createdAt`, 'DESC').getMany();
};
