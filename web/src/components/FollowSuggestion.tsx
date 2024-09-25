import { Empty, Skeleton } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useFollowUserMutation,
  useGetFollowSuggestionQuery,
} from 'store/api/follow';
import { UserT } from 'types';
import { getUserAvatar, getUserFullName } from 'utils';

export default function FollowSuggestion() {
  const { data, isLoading } = useGetFollowSuggestionQuery('');

  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="text-xl font-bold">Who to follow</h1>
      </div>

      {!isLoading ? (
        <div className="flex flex-col gap-3">
          {data?.length ? (
            data.map((user: UserT) => <FollowProfile key={user.id} {...user} />)
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="mt-10" />
          )}
        </div>
      ) : (
        <Skeleton title={false} paragraph={{ rows: 5 }} className="mt-4" />
      )}
    </div>
  );
}

const FollowProfile = (user: UserT) => {
  const [followed, setFollowed] = useState(false);
  const { username, profile, id } = user;
  const [followUser] = useFollowUserMutation();

  const onfollow = async () => {
    await followUser({ id });
    setFollowed(!followed);
  };

  return (
    <div className="flex items-center justify-between">
      <Link to={`/profile/${user.id}`} className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={getUserAvatar(profile)}
          alt="avatar"
        />
        <div>
          <h5 className="text-sm font-semibold">{getUserFullName(user)}</h5>
          <p>@{username.slice(0, 12)}</p>
        </div>
      </Link>
      <button
        onClick={onfollow}
        className="block bg-gray-900 hover:bg-gray-800 rounded-full px-4 text-white font-normal py-1.5"
      >
        {followed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};
