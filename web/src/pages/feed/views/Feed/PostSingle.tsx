import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  BiDownArrow,
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiUpArrow,
} from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import { useSubmitVoteMutation } from 'store/api/feed';
import { requireAuth } from 'store/prompt';
import { PostT } from 'types/feed';
import { cn } from 'utils';
import { createMarkup } from 'utils/misc';

dayjs.extend(relativeTime);

enum VoteType {
  UPVOTE = 1,
  DOWNVOTE = -1,
}

export default function PostSingle(props: PostT) {
  const {
    author,
    created_at,
    id,
    title,
    content,
    total_comments,
    share_count,
  } = props;

  return (
    <div className="w-full rounded-xl border p-5 shadow-sm bg-white">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <img
            src="default-avatar.webp"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="text-lg font-bold text-slate-700">
            {author.first_name + ' ' + author.last_name}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-medium">
						##
					</button> */}
          <div className="text-xs text-neutral-500">
            {created_at
              ? dayjs(`${new Date(created_at).toUTCString()}`).fromNow(true)
              : null}{' '}
            ago
          </div>
        </div>
      </div>

      <div className="mt-4 mb-2">
        <Link to={`/post/${id}`} className="">
          {title ? (
            <div className="mb-3 text-xl font-semibold">{title}</div>
          ) : null}
          <div className="text-sm text-neutral-600">
            <div
              dangerouslySetInnerHTML={createMarkup(
                _.truncate(content, { length: 300 })
              )}
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2.5 mt-4">
        <Vote {...props} />
        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer h-8 px-2.5 rounded-full flex gap-1.5 items-center justify-center">
          <FaRegCommentAlt className="text-[15px] translate-y-[1px]" />
          <p>{total_comments ?? 0}</p>
        </div>
        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer h-8 px-2.5 rounded-full flex gap-1.5 items-center justify-center">
          <PiShareFat className="text-[19px]" />
          {share_count ?? 0}
        </div>
      </div>
    </div>
  );
}

const Vote = (props: PostT) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [submitVote] = useSubmitVoteMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpvoteCount(props.upvote_count);
    setDownvoteCount(props.downvote_count);
    setIsUpvoted(props.is_upvoted);
    setIsDownvoted(props.is_downvoted);
  }, [props]);

  const handleVote = (voteType: number) => {
    if (!user) {
      dispatch(requireAuth());
      return;
    }

    if (voteType === VoteType.UPVOTE) {
      if (isDownvoted) {
        setDownvoteCount(downvoteCount - 1);
      }

      setUpvoteCount(upvoteCount + 1);
      setIsUpvoted(true);
      setIsDownvoted(false);
    } else if (voteType === VoteType.DOWNVOTE) {
      if (isUpvoted) {
        setUpvoteCount(upvoteCount - 1);
      }

      setDownvoteCount(downvoteCount + 1);
      setIsDownvoted(true);
      setIsUpvoted(false);
    }

    submitVote({ postId: props.id, voteType });
  };

  return (
    <div className="flex items-center justify-center h-8 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={cn(
          'hover:bg-gray-200 cursor-pointer h-8 px-2.5 flex gap-1.5 items-center justify-center',
          {
            'bg-gray-800 hover:bg-gray-800 text-white': isUpvoted,
          }
        )}
        onClick={() => handleVote(1)}
      >
        {isUpvoted ? (
          <BiSolidUpArrow className="text-lg" />
        ) : (
          <BiUpArrow className="text-lg" />
        )}

        <p>{upvoteCount}</p>
      </div>
      <div className="w-[1px] h-full bg-gray-200" />
      <div
        className={cn(
          'hover:bg-gray-200 cursor-pointer h-8 px-2.5 flex gap-1.5 items-center justify-center',
          {
            'bg-gray-800 hover:bg-gray-800 text-white': isDownvoted,
          }
        )}
        onClick={() => handleVote(-1)}
      >
        {isDownvoted ? (
          <BiSolidDownArrow className="text-lg" />
        ) : (
          <BiDownArrow className="text-lg" />
        )}
        <p>{downvoteCount}</p>
      </div>
    </div>
  );
};
