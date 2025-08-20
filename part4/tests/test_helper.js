const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'firstTitle',
    author: 'Robert C. Martin',
    url: 'testUrl',
    likes: 5,
  },
  {
    title: 'secondTitle',
    author: 'author2',
    url: 'testUrl',
    likes: 8,
  },
  {
    title: 'thirdTitle',
    author: 'Robert C. Martin',
    url: 'testUrl',
    likes: 13,
  },
  {
    title: 'fourthTitle',
    author: 'Robert C. Martin',
    url: 'testUrl',
    likes: 0,
  },
  {
    title: 'fifthTitle',
    author: 'Edsger W. Dijkstra',
    url: 'testUrl',
    likes: 100,
  },
  {
    title: 'sixthTitle',
    author: 'author3',
    url: 'testUrl',
    likes: 1,
  },
  {
    title: 'seventhTitle',
    author: 'Robert C. Martin',
    url: 'testUrl',
    likes: 1,
  }
]

const dummyBlog = {
  title: 'dummyTitle',
  author: 'dummyAuthor',
  url: 'dummyUrl',
  likes: 5,
}

const initialUsers = [
  {
    name: 'first user',
    username: 'user1',
    password: 'pw1',
    blogs: []
  },
  {
    name: 'second user',
    username: 'user2',
    password: 'pw2',
    blogs: []
  }
]

const dummyUser = {
  name: 'dummyName',
  username: 'dummyUsername',
  password: 'password',
  blogs: []
}

const blogWithMissingTitle = {
  author: 'dummyAuthor',
  url: 'dummyUrl',
  likes: 5
}

const blogWithMissingUrl = {
  title: 'dummyTitle',
  author: 'dummyAuthor',
  likes: 5
}

const blogWithMissingLikes = {
  title: 'dummyTitle',
  author: 'dummyAuthor',
  url: 'dummyUrl'
}

const nonExistingId = async () => {
  const newBlog = new Blog(dummyBlog)
  await newBlog.save()
  await newBlog.deleteOne()
  return newBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  // console.log('blogsInDb: blogs returned by Blog.find()', blogs)
  // console.log('blogsInDb: .toJSON()', blogs.map((blog) => blog.toJSON()))
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  // return users.map(u => u.toJSON())
  return users
}


module.exports = {
  initialBlogs,
  dummyBlog,
  initialUsers,
  dummyUser,
  blogWithMissingTitle,
  blogWithMissingUrl,
  blogWithMissingLikes,
  nonExistingId,
  blogsInDb,
  usersInDb,
}