import React from 'react';
import { Paginate } from '../ui/Paginate';
import { useSelector } from 'react-redux';
import { Loader } from '../ui/Loader';
import { ListPosts } from './ListPosts';
import { AddButtonFab } from '../ui/AddButtonFab';
import { AddOrEditModal } from './AddOrEditModal';
import { DetailModal } from './DetailModal';
import { Search } from '../ui/search';

export const BlogScreen = () => {
  const { posts, loading } = useSelector( state => state.post );

  return (
    <div className="container">
      <h1 className="my-4">Mi Blog</h1>
      <Search />
      <hr />
      <div className='container' style={{ height: '80vh' }}>
        { loading && <Loader /> }
        <ListPosts items={posts} />
        <Paginate />
        <AddOrEditModal />
        <DetailModal />
        <AddButtonFab />
      </div>
    </div>
  );
};