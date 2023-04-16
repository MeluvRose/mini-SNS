import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Tweet, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

interface TweetWithUser extends Tweet {
  user: User;
}

interface TweetDetailResponse {
  tweet: TweetWithUser;
  isLiked: boolean;
}

const TweetDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFav({});
  };

  console.log(data);
  return (
    <Layout canGoBack>
      <div className="px-4 py-4 h-screen">
        <div className="mb-8">
          <div className="flex cursor-pointer py-3 border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-200" />
            <div>
              <p className="text-sm font-medium text-zinc-100">
                {data?.tweet?.user?.name}
              </p>
            </div>
          </div>
          <div className="mt-5 pb-6 border-b">
            <p className="my-6 text-zinc-100">{data?.tweet?.content}</p>
            <div className="mt-5 h-96 bg-slate-200" />
          </div>
          <div className="flex cursor-pointer py-3 border-b items-center space-x-3">
            <p className="text-sm font-medium text-zinc-100">
              {data?.tweet?.createdAt.toString().split(/[A-Z.]/i, 2)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onFavClick}
              className={cls(
                "p-3 rounded-md flex items-center justify-center hover:bg-purple-500 ",
                data?.isLiked
                  ? "text-red-500  hover:text-red-600"
                  : "text-gray-400  hover:text-gray-500"
              )}
            >
              {data?.isLiked ? (
                <svg
                  className="h-6 w-6 "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={onFavClick}
              className={
                "p-3 rounded-md flex items-center justify-center hover:bg-purple-500 hover: text-emerald-300"
              }
            >
              <svg
                className="h-6 w-6 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default TweetDetail;
