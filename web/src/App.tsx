import Navbar from 'components/Navbar';
import AppLayout from 'layouts/AppLayout';
import ExplorePage from 'pages/explore';
import FeedPage from 'pages/feed';
import LoginPage from 'pages/login';
import PostPage from 'pages/post';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLazyLoadUserQuery } from 'store/api/auth';

export default function App() {
  const [loadUser] = useLazyLoadUserQuery();

  useEffect(() => {
    loadUser('');
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
