const httpStatus = require('http-status');
const { Post } = require('../models');
const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');

const postRepository = dataSource.getRepository(Post).extend({
  findAll,
  sortBy,
});
// .extend({ sortBy });
//

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  const doc = postRepository.create(postBody);
  return await postRepository.save(doc);
};

/**
 * Query for users
 * @param {Object} filter - Filter options
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryPosts = async (filter, options) => {
  const { limit, page, sortBy } = options;

  return await postRepository.findAll({
    tableName: 'post',
    sortOptions: sortBy&&{ option: sortBy },
    paginationOptions: { limit: limit, page: page },
  });

};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return await postRepository.findOneBy({ id: id });
};

/**
 * Update user by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await postRepository.update({ id: postId }, updateBody);
  return await getPostById(postId);
};

/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return await postRepository.delete({ id: postId });
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
