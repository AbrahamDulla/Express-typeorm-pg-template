const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      body: Joi.string()
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
};
