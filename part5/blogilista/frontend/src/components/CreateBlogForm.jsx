const CreateBlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
   }) => {
   return (
     <div>
        <h3>Create new</h3>
        <form onSubmit={handleSubmit}>
          <div>
            Title: <input type="text" value={title}
              onChange={handleTitleChange}/>
          </div>
          <div>
            Author: <input type="text" value={author}
              onChange={handleAuthorChange} />
          </div>
          <div>
            Url: <input type="text" value={url}
              onChange={handleUrlChange} />
          </div>
          <button type="submit">CREATE</button>
        </form>
     </div>
   )
 }
 
 export default CreateBlogForm