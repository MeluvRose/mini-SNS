// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import useSWR from "swr";
import Button from "@components/button";
import Item from "@components/item";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Tweet } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface UploadTweetForm {
  content: string;
}

interface UploadTweetMutation {
  tweet: Tweet;
}

interface TweetWithFavs extends Tweet {
  _count: {
    fav: number;
  };
}

interface TweetsResponse {
  tweets: TweetWithFavs[];
}

export default () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit } = useForm<UploadTweetForm>();
  const [uploadTweet, { loading, data }] =
    useMutation<UploadTweetMutation>("/api/tweets");
  const { data: dataTweets } = useSWR<TweetsResponse>("/api/tweets");

  const onValid = (data: UploadTweetForm) => {
    if (loading) return;
    uploadTweet(data);
  };

  useEffect(() => {
    if (data) router.push(`/tweet/${data.tweet.id}`);
  }, [data, router]);
  console.log(dataTweets);
  if (!user) return <div />;
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <div className="flex flex-col space-y-5 divide-y">
          {dataTweets?.tweets?.map((tweet) => (
            <Item
              id={tweet.id}
              key={tweet.id}
              content={tweet.content}
              replies={0}
              hearts={tweet._count.fav}
            />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <TextArea
          register={register("content", { required: true })}
          name="content"
          label="Content"
        />
        <Button text={loading ? "Loading..." : "Tweet"} />
      </form>
    </Layout>
  );
};
