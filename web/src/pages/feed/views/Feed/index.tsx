import { Card, Empty, Skeleton } from 'antd';
import { useGetPostsQuery } from 'store/api/feed';
import { PostT } from 'types/feed';
import PostSingle from './PostSingle';

export default function Feed() {
  const { data, isLoading } = useGetPostsQuery('');

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col gap-3">
          {data?.length ? (
            data.map((post: PostT) => <PostSingle key={post.id} {...post} />)
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="pt-10" />
          )}
        </div>
      ) : (
        <FeedSkeleton />
      )}
    </>
  );
}

const FeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card key={idx}>
          <Skeleton />
        </Card>
      ))}
    </div>
  );
};
