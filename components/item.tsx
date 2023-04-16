import Link from "next/link";

interface ItemProps {
  id: number;
  content: string;
  replies: number;
  hearts: number;
}

export default function Item({ content, replies, hearts, id }: ItemProps) {
  return (
    <Link href={`/tweet/${id}`}>
      <a className="flex px-4 pt-5 cursor-pointer items-start space-x-4">
        <div className="">
          <div className="w-10 h-10 bg-gray-100 rounded-full text-zinc-200">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="pb-4">
            <p className="text-lg font-medium text-zinc-200">{content}</p>
          </div>
          <div className="flex space-x-5">
            <div className="flex space-x-0.5 items-center text-sm  text-zinc-100">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{hearts}</span>
            </div>
            <div className="flex space-x-0.5 items-center text-sm  text-zinc-100">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>{replies}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
