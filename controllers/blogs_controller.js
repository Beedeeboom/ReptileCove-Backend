// const {getAllBlogs, getBlogById, addBlog, deleteBlog, updateBlog} = require("../utils/blog_utilities")

// // getAllBlogs
// function getBlogs(req,res) {
// 	res.send(getAllblogs(req))
// }

// // getblogById
// function getBlog(req,res) {
// 	let blog = getBlogById(req)
// 	if(blog) return res.send(blog)
// 	// if we didn't get the blog, assume it wasn't found
// 	res.status(400)
// 	res.send(req.error)
// }

// // makeBlog
// function makeBlog(req,res) {
// 	const newBlog = addBlog(req)
// 	if(newBlog) {
// 		res.status(201)
// 		res.send(newBlog)
// 	}
// 	// If there is no newBlog, there was a problem
// 	else {
// 		res.status(500)
// 		res.send(req.error)
// 	}
// }

// // removeBlog
// function removeBlog(req, res) {
// 	let blogs = deleteBlog(req)
// 	if(req.error) {
// 		res.status(req.status)
// 		res.send(req.error)
// 	}
// 	else {
// 		res.send(blogs)
// 	}

// }

// function changeBlog(req, res) {
// 	let updatedBlog = updateBlog(req)
// 	if(req.error) {
// 		res.status(req.status)
// 		res.send(req.error)
// 	}
// 	else {
// 		res.send(updatedBlog)
// 	}
// }

// module.exports = {getBlogs, getBlog, makeBlog, removeBlog, changeBlog}