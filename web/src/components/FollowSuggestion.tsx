const USERS = [
  {
    first_name: 'Lipsum',
    last_name: 'User',
  },
  {
    first_name: 'Abir',
    last_name: 'Khan',
  },
  {
    first_name: 'Shahriar',
    last_name: 'Kabir',
  },
];

export default function FollowSuggestion() {
  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="text-xl font-bold">Who to follow</h1>
      </div>

      <div className="flex flex-col gap-3">
        {USERS.map((user) => (
          <FollowProfile {...user} />
        ))}
      </div>
    </div>
  );
}

const FollowProfile = ({ image, first_name, last_name }: any) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={image ?? 'default-avatar.webp'}
          alt="avatar"
        />
        <div>
          <h5 className="text-sm font-semibold">
            {first_name} {last_name}
          </h5>
          <p>@{(first_name + last_name).toLowerCase()}</p>
        </div>
      </div>
      <button
        onClick={() => {}}
        className="block bg-gray-900 hover:bg-gray-800 rounded-full px-4 text-white font-normal py-1.5"
      >
        {false ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};
