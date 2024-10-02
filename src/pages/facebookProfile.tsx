import { PrintComponent } from "@/components/print/printRefs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimeAgo } from "@/utils/dateago";
import { formatDate } from "@/utils/dateformat";
import { usePDF } from "react-to-pdf";
import {
  CalendarIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generic } from "@/utils/generic";

type PostsTypes = {
  created_time: string;
  id: string;
  message?: string;
};

type ToxicityType = {
  label: "toxic";
  score: number;
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

export default function FBDashboard() {
  const { id } = useParams();
  console.log(id);
  const [userData, setUserData] = useState<UserType>({
    picture: {
      data: {
        height: 50,
        is_silhouette: false,
        url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=122100353528550580&height=50&width=50&ext=1730387974&hash=AbYAQNvuPuEkMzeIRjdjjtyG",
        width: 50,
      },
    },
    name: "Steve Fernandes",
    short_name: "Steve",
    birthday: "12/18/2002",
    id: "122100353528550580",
  });
  const [userPosts, setUserPosts] = useState<PostsTypes[]>([]);
  // const userPosts = [
  //   {
  //     created_time: "2024-10-01T15:17:16+0000",
  //     id: "122100353528550580_122100664412550580",
  //   },
  //   {
  //     created_time: "2024-10-01T10:50:09+0000",
  //     message: "This hackathon is teaching us a lot",
  //     id: "122100353528550580_122100464114550580",
  //   },
  //   {
  //     created_time: "2024-10-01T08:19:57+0000",
  //     message: "This hackathon is lit",
  //     id: "122100353528550580_122100379754550580",
  //   },
  //   {
  //     created_time: "2024-10-01T07:36:40+0000",
  //     message: "Yabe dabi dooo",
  //     id: "122100353528550580_122100356852550580",
  //   },
  //   {
  //     created_time: "2002-12-18T08:00:00+0000",
  //     id: "122100353528550580_122100337370550580",
  //   },
  // ];
  const [loading, setLoading] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<PostsTypes[]>([]);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v20.0/${id}/posts?access_token=${generic}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: { data: PostsTypes[] }) => {
        setUserPosts(data.data);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v20.0/${id}?fields=picture,name,short_name,birthday%2Cname&access_token=${generic}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: UserType) => {
        setUserData(data);
      });
  }, [id]);

  const getToxicity = () => {
    setLoading(true);
    fetch("http://localhost:5000/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sentences: userPosts.map((post) => post.message || ""),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ToxicityType[]) => {
        data.map((sing, idx: number) => {
          if (sing.score > 0.75) {
            setSelectedPosts((prev) => {
              const postAlreadyExists = prev.some(
                (selectedPost) => selectedPost.id === userPosts[idx].id
              );
              if (!postAlreadyExists) {
                return [...prev, userPosts[idx]]; // Add the post only if it's not in selectedPosts
              }
              return prev; // Do nothing if post already exists
            });
          }
        });
        console.log(data); // Handle the returned data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const printPDF = () => {
    setLoading(true);
    targetRef.current.style.display = "block";
    toPDF();
    targetRef.current.style.display = "none";
    setTimeout(() => setLoading(false), 2500);
  };

  const onSelected = (data: PostsTypes) => {
    console.log(selectedPosts);
    setSelectedPosts((prevSelectedPosts) => {
      // Check if the post already exists in the selectedPosts
      const postExists = prevSelectedPosts.some((post) => post.id === data.id);

      if (postExists) {
        // If it exists, remove it from the array
        return prevSelectedPosts.filter((post) => post.id !== data.id);
      } else {
        // If it doesn't exist, add it to the array
        return [...prevSelectedPosts, data]; // Assuming data is the post object
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-md z-50">
          <div className="loader">
            <span>Loading</span>
          </div>
        </div>
      )}
      {/* Left Sidebar */}
      <button
        onClick={getToxicity}
        className="fixed bottom-5 right-5  z-30 flex items-center justify-start gap-2 w-fit pr-5 h-10 bg-black rounded-full text-white hover:text-black font-semibold border-none cursor-pointer shadow-md pl-2 transition-all duration-300 hover:bg-[#C0FF14] hover:opacity-80 active:scale-95"
      >
        <svg
          className="h-6 transition-transform duration-150"
          viewBox="0 0 512 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
            className="fill-[#fff] hover:fill[#000]"
          />
        </svg>
        {loading ? "Reviewing..." : "Panchanama.ai"}
      </button>

      <aside className="w-64 bg-white bg-opacity-80 backdrop-blur-lg p-4 space-y-4 border-r border-gray-200">
        <div className="font-bold text-4xl mb-6 text-black uppercase">
          Report
        </div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-blue-100 hover:text-blue-700"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-blue-100 hover:text-blue-700"
          >
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-blue-100 hover:text-blue-700"
          >
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-blue-100 hover:text-blue-700"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-blue-100 hover:text-blue-700"
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
        <Button className="w-full mt-4 text-white hover:from-blue-600 hover:to-purple-700">
          Tweet
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 relative shadow-sm">
            <Input
              className="pl-10 bg-white bg-opacity-80 backdrop-blur-lg border-gray-200"
              placeholder="Search Twitter"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Tabs defaultValue="tweets" className="w-full">
            <div className="flex flex-row justify-between items-center">
              <TabsList className="bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200">
                <TabsTrigger
                  value="tweets"
                  className="text-gray-700 data-[state=active]:text-white data-[state=active]:bg-black"
                >
                  Tweets
                </TabsTrigger>
                <TabsTrigger
                  value="tasks"
                  className="text-gray-700 data-[state=active]:text-white data-[state=active]:bg-black"
                >
                  Tasks
                </TabsTrigger>
              </TabsList>
              <div className="flex flex-row gap-5 items-center">
                <p>
                  Selected {selectedPosts.length} of {userPosts.length}
                </p>
                <Button
                  onClick={printPDF}
                  disabled={selectedPosts.length === 0}
                >
                  Print
                </Button>
              </div>
            </div>

            <TabsContent value="tweets" className="h-[20vh]">
              {userPosts.map((post) => (
                <Card
                  onClick={() => onSelected(post)}
                  className={`mb-4 bg-white bg-opacity-80 backdrop-blur-lg border-gray-200 hover:shadow-md transition-all border border-transparent duration-200 ${
                    selectedPosts.some((data) => post.id === data.id) &&
                    " bg-red-50 border-black shadow-2xl"
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 border-2 border-blue-400">
                          <AvatarImage
                            src={userData.picture.data.url}
                            alt="Avatar"
                          />
                          <AvatarFallback>
                            {userData.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {userData.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            @{userData.id}
                          </p>
                        </div>
                      </div>
                      <p>{formatTimeAgo(post.created_time)}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{post.message || "LOL"}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="tasks">
              <Card className="bg-white bg-opacity-80 backdrop-blur-lg border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Current Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-gray-700">
                        Product Review for UI8 Market
                      </span>
                      <span className="text-sm text-gray-500">4h</span>
                    </li>
                    <li className="flex justify-between items-center p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-gray-700">
                        UX Research for Product
                      </span>
                      <span className="text-sm text-gray-500">8h</span>
                    </li>
                    <li className="flex justify-between items-center p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-gray-700">
                        App design and development
                      </span>
                      <span className="text-sm text-gray-500">32h</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-white bg-opacity-80 backdrop-blur-lg p-4 space-y-4 border-l border-gray-200">
        <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarImage
                  src={userData.picture.data.url}
                  alt="Megan Norton"
                />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-600">@{userData.id}</p>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(userData.birthday)}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded  bg-opacity-60">
                <span className="text-gray-700">Finished</span>
                <span className="font-medium text-green-600">
                  18 (+8 tasks)
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded  bg-opacity-60">
                <span className="text-gray-700">Tracked</span>
                <span className="font-medium text-yellow-600">
                  31h (-6 hours)
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded  bg-opacity-60">
                <span className="text-gray-700">Efficiency</span>
                <span className="font-medium text-blue-600">93% (+12%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
      <PrintComponent
        ref={targetRef}
        author={userData}
        selectedPosts={selectedPosts}
      />
    </div>
  );
}
