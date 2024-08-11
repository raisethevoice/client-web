import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { PostT } from 'types/feed';
import { createMarkup } from 'utils/misc';

dayjs.extend(relativeTime);

export default function PostSingle({
  author,
  created_at,
  id,
  title,
  content,
  total_likes,
  total_comments,
}: PostT) {
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
        <div className="flex items-center justify-center h-8 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-full pl-2.5 pr-1.5 flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <BiUpArrow className="text-lg" />
          </div>
          <div className="border-l border-r border-gray-200 h-full flex items-center px-2">
            {total_likes !== undefined ? <p>{total_likes}</p> : <></>}
          </div>
          <div className="h-full w-full pl-1.5 pr-2.5 flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <BiDownArrow className="text-lg" />
          </div>
        </div>
        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer h-8 px-2.5 rounded-full flex gap-2 items-center justify-center">
          <FaRegCommentAlt />
          {total_comments !== undefined ? <p>{total_comments}</p> : null}
        </div>
        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer h-8 px-2.5 rounded-full flex gap-2 items-center justify-center">
          <PiShareFat className="text-lg" />
          21
        </div>
      </div>
    </div>
  );
}
