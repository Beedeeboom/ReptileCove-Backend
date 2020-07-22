const fs = require("fs")
let dataFile = "data/blog_posts.json"
let blogPosts = require(`../${dataFile}`)

function getAllBlogs(req) {
	return blogPosts
}

function getBlogById(req) {
	let blog = blogPosts[req.params.id]
	// if no blog, set req.error 
	if(blog) return blog
	req.error = "Blog not found"
}


function addBlog(req) {
	try {
		const {title, content, category} = req.body
		const date = Date.now()
		const newBlog = {
			title: title,
			create_date: date,
            modified_date: date,
			content: content,
			category: category || ""
		}
		// Add to blogPosts (in memory)
		blogPosts[getNextId()] = newBlog
		// Save updated blogPosts to the file
		fs.writeFileSync(`./${dataFile}`, JSON.stringify(blogPosts))
		return newBlog
	catch(error) {
		req.error = error
	}
}

// deleteBlog
function deleteBlog(req) {
	const id = req.params.id

	try {
		if (blogPosts[id]){
			delete blogPosts[id]
			// update the file
			// Save updated blogPosts to the file
			fs.writeFileSync(`./${dataFile}`, JSON.stringify(blogPosts))
		} 
		else {
			req.status = 400
			req.error = "Post not found"
		}
		return blogPosts
	}
	catch(error) {
		req.status = 500
		req.error = error
	}
}

function updateBlog(req) {
	try {
		let id = req.params.id
		let existingPost = blogPosts[id]
		if(existingPost) {
			const {title, content, category} = req.body
			const date = Date.now()
			const updatedBlog = {
				title: title,
				content: content,
				create_date: existingPost.create_date,
				modified_date: date,
				category: category || existingPost.category
			}
			blogPosts[id] = updatedBlog
			// update the file
			// Save updated blogPosts to the file
			fs.writeFileSync(`./${dataFile}`, JSON.stringify(blogPosts))
			return updatedBlog
		}
		else {
			req.status = 400
			req.error = "Blog not found"
		}
	}
	catch(error) {
		req.status = 500
		req.error = error
	}
}

// helper for testing
function loadData(file) {
	dataFile = file
	blogPosts = JSON.parse(fs.readFileSync(file, 'utf8'))
}

// helper function to generate unique id
function getNextId() {
	let ids = Object.keys(blogPosts).sort()
	let lastId = (ids.length > 0) ? ids[ids.length-1] : 0
	return parseInt(lastId) + 1
}

module.exports = {getAllBlogs, getBlogById, loadData, addBlog, deleteBlog, updateBlog}