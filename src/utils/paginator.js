module.exports = function Pagitator({ limit=10, page=1 }) {
  return { take: limit, skip: (page - 1) * limit };
};
