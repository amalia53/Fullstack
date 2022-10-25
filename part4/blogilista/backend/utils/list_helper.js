const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogs) => sum + blogs.likes, 0)
}


const favoriteBlog = (blogs) => {
  var max = 0
  const favorite = blogs.reduce((favorite, blogs) => {
    if (blogs.likes >= max) {
      favorite = blogs
      max = blogs.likes
    }
    return favorite
  }, null) 
  return favorite
}


module.exports = {
  dummy, totalLikes, favoriteBlog
}