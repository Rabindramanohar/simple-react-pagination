import axios from 'axios';
import React, {useState, useEffect}from 'react';
import './App.css';
import PaginationComponent from './components/Pagination';
import PostComponent from './components/Post';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {

    const fetchPost = async() => {
      setLoading(true);
      // await setPost(axios.get('https://jsonplaceholder.typicode.com/posts'));
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }

    fetchPost();
  }, []);

  // get current post
  const indexOfLastPost = currentPage *  postPerPage;
  const indexOfFistPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFistPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
 
  return (
    <div className='container mt-5 text-center'>
      <h2 className='text-primary mb-3'>React Pagination: </h2>
      <PostComponent posts = {currentPosts} loading = {loading}/>
      <PaginationComponent 
        postPerPage = {postPerPage}
        totalPage = {posts.length}
        paginate = {paginate}

      />
    </div>
  );
}

export default App;
