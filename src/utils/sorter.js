module.exports = function sortBy({columnName}) {
  if (columnName.startsWith('-')) {
    return {columnName:`${columnName.replace('-', '')}`,orderBy:'DESC'}
  }

  return {columnName:columnName,orderBy:'ASC'}
};


