import { Empty, Skeleton } from 'antd';
import _ from 'lodash';
import { FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useGetTrendingPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';

export default function TrendingPosts() {
  const { data } = useGetTrendingPostsQuery('');

  return (
    <div className="min-h-[250px]">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Trending</h1>
        <FiTrendingUp className="ml-2 text-lg" />
      </div>

      {data ? (
        <div className="flex flex-col gap-1.5 mt-2">
          {data.length ? (
            data.map((post: PostT) => (
              <Link key={post.id} to={`/post/${post.id}/`}>
                <p className="text-md font-normal">
                  {_.truncate(post.title, { length: 75 })}
                </p>
              </Link>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="pt-10" />
          )}
        </div>
      ) : (
        <Skeleton className="mt-5" title={false} paragraph={{ rows: 6 }} />
      )}
    </div>
  );
}
