import React, { useState } from "react";

const ForumPost = ({ post, onUpvote, onComment }) => {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment("");
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {post.category}
          </span>
        </div>
        <p className="mt-3 text-gray-600">{post.content}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onUpvote(post.id)} 
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
              </svg>
              <span>{post.upvotes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)} 
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span>{post.comments.length}</span>
            </button>
          </div>
          
          <span className="text-xs text-gray-400">Posted by Student</span>
        </div>
      </div>
      
      {showComments && (
        <div className="px-5 py-3 bg-gray-50">
          <h4 className="font-medium text-gray-700 mb-2">Comments ({post.comments.length})</h4>
          
          {post.comments.length > 0 ? (
            <div className="space-y-3 mb-4">
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-gray-600 text-sm">{comment}</p>
                  <p className="text-gray-400 text-xs mt-1">Student</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-4">No comments yet.</p>
          )}
          
          <form onSubmit={handleCommentSubmit} className="flex items-center">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 transition"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Understanding CT Brain Hemorrhage Scans",
      category: "Case Studies",
      content: "What are the key indicators of a brain hemorrhage in a CT scan? I'm having trouble differentiating between hemorrhage and calcification in some cases. Are there specific density measurements or patterns I should be looking for?",
      comments: [
        "Look for hyperdense areas in the scan. Typically acute hemorrhage appears as a hyperdense (white) area on a non-contrast CT.",
        "Check for midline shift and mass effect which can indicate a significant hemorrhage.",
        "Blood typically has a density of 50-100 Hounsfield Units, while calcifications are usually >100 HU. That can help differentiate them."
      ],
      upvotes: 15,
      timestamp: "2023-11-15T09:30:00Z"
    },
    {
      id: 2,
      title: "Technical Issue: Scan Results Not Displaying",
      category: "Technical Help",
      content: "My scans are not generating results after completion. I've tried multiple times with different settings but nothing seems to work. Has anyone experienced this issue or knows how to fix it?",
      comments: [
        "Ensure the mannequin is positioned correctly according to the protocol.",
        "Try refreshing the page and clearing your browser cache.",
        "I had the same issue last week. It was resolved by logging out and back in."
      ],
      upvotes: 8,
      timestamp: "2023-11-16T14:20:00Z"
    },
    {
      id: 3,
      title: "Best approaches for explaining radiation risks to patients",
      category: "Patient Care",
      content: "I'm looking for effective ways to explain radiation risks to patients who are anxious about CT scans. How do you balance informing them accurately without causing unnecessary worry?",
      comments: [
        "I usually compare it to natural background radiation or a long flight.",
        "Visual aids can be helpful - show them a chart comparing different radiation sources.",
        "Emphasize the benefit vs risk ratio and how the diagnostic information outweighs the minimal risk."
      ],
      upvotes: 22,
      timestamp: "2023-11-14T11:05:00Z"
    },
    {
      id: 4,
      title: "New protocol for pediatric head CT",
      category: "Protocols",
      content: "Has anyone implemented the new low-dose protocol for pediatric head CTs? I'm interested in hearing about your experiences and any tips for optimizing image quality while keeping dose as low as possible.",
      comments: [
        "We've been using it for about 3 months. The key is to adjust mA based on age/weight carefully.",
        "Make sure your noise reduction software is up to date - it makes a big difference with the lower dose scans."
      ],
      upvotes: 17,
      timestamp: "2023-11-17T08:45:00Z"
    },
  ]);

  const [newPost, setNewPost] = useState({ title: "", category: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const categories = ["All", "Case Studies", "Technical Help", "Patient Care", "Protocols", "General Discussion"];

  const handleCreatePost = () => {
    if (newPost.title && newPost.category && newPost.content) {
      const timestamp = new Date().toISOString();
      setPosts([
        {
          ...newPost,
          id: posts.length + 1,
          comments: [],
          upvotes: 0,
          timestamp
        },
        ...posts
      ]);
      setNewPost({ title: "", category: "", content: "" });
      setShowNewPostForm(false);
    }
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ));
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  const filteredPosts = posts
    .filter(post => 
      (activeCategory === "All" || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
        <button 
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          New Discussion
        </button>
      </div>

      {showNewPostForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Start a New Discussion</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="post-title">Title</label>
              <input
                id="post-title"
                type="text"
                placeholder="What do you want to discuss?"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="post-category">Category</label>
              <select
                id="post-category"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              >
                <option value="">Select a Category</option>
                {categories.filter(cat => cat !== "All").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="post-content">Discussion</label>
              <textarea
                id="post-content"
                placeholder="Share your thoughts, questions, or insights..."
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                disabled={!newPost.title || !newPost.category || !newPost.content}
              >
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex overflow-x-auto pb-2 md:pb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search discussions..."
            className="pl-10 pr-4 py-2 w-full md:w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <ForumPost 
            key={post.id} 
            post={post} 
            onUpvote={handleUpvote} 
            onComment={handleComment} 
          />
        ))
      ) : (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No discussions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try a different search term or category" : "Be the first to start a discussion!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Forum;