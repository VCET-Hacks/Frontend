import { formatDate } from "@/utils/dateformat";
import { forwardRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type PostsTypes = {
  created_time: string;
  id: string;
  message?: string;
};

type UserType = {
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  name: string;
  short_name: string;
  birthday: string;
  id: string;
};

const FacebookPost = ({ author, post }: { author: UserType, post: PostsTypes }) => {
  console.log(author);
  return (
    <Card className="m-auto mb-4 bg-white bg-opacity-80 backdrop-blur-lg shadow-md transition-all border border-black duration-200 w-full">
      <CardHeader>
        <div className="flex justify-between items-top gap-7">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 border-2 border-blue-400">
              <AvatarImage src={author.picture.data.url} alt="Avatar" />
              <AvatarFallback>
                {author.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{author.name}</p>
              <p className="text-xs text-gray-500">@{author.id}</p>
            </div>
          </div>
          <p>{formatDate(post.created_time)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{post.message || "LOL"}</p>
      </CardContent>
    </Card>
  );
};

// PrintComponent that accepts posts as a parameter
export const PrintComponent = forwardRef<HTMLDivElement, { selectedPosts: PostsTypes[]; author: UserType }>(
    ({ selectedPosts, author }, ref) => {
      return (
        <div ref={ref} style={{margin: "auto"}} className="hidden print-container">
          <h1>Panchanama.ai</h1>
          <h1 className="text-[2rem] font-bold mb-[3rem]">Reported Tweets</h1>
          {selectedPosts.map((post, index) => (
            <FacebookPost key={index} author={author} post={post} />
          ))}
        </div>
      );
    }
  );
