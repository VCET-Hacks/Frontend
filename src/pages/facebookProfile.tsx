import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimeAgo } from "@/utils/dateago";
import { formatDate } from "@/utils/dateformat";
import {
  CalendarIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
} from "lucide-react";

export default function FBDashboard() {
  const userPosts = [
    {
      created_time: "2024-10-01T15:17:16+0000",
      id: "122100353528550580_122100664412550580",
    },
    {
      created_time: "2024-10-01T10:50:09+0000",
      message: "This hackathon is teaching us a lot",
      id: "122100353528550580_122100464114550580",
    },
    {
      created_time: "2024-10-01T08:19:57+0000",
      message: "This hackathon is lit",
      id: "122100353528550580_122100379754550580",
    },
    {
      created_time: "2024-10-01T07:36:40+0000",
      message: "Yabe dabi dooo",
      id: "122100353528550580_122100356852550580",
    },
    {
      created_time: "2002-12-18T08:00:00+0000",
      id: "122100353528550580_122100337370550580",
    },
  ];
  const userData = {
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
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Left Sidebar */}
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
          {/* <Card className="mb-4 bg-white bg-opacity-80 backdrop-blur-lg border-gray-200">
            <CardContent className="pt-4">
              <Input
                className="mb-2 bg-gray-50"
                placeholder="What's happening?"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                Tweet
              </Button>
            </CardContent>
          </Card> */}
          <Tabs defaultValue="tweets" className="w-full">
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
            <TabsContent value="tweets">
              {userPosts.map((post) => (
                <Card className="mb-4 bg-white bg-opacity-80 backdrop-blur-lg border-gray-200 hover:shadow-md transition-shadow duration-200">
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
              <Card className="mb-4 bg-white bg-opacity-80 backdrop-blur-lg border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader>
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
                      <p className="text-xs text-gray-500">@megnorton</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Track team progress here. You almost reach a goal! 🎉
                  </p>
                </CardContent>
              </Card>
              <Card className="mb-4 bg-white bg-opacity-80 backdrop-blur-lg border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 border-2 border-green-400">
                      <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                      <AvatarFallback>FM</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Floyd Miles
                      </p>
                      <p className="text-xs text-gray-500">@floydmiles</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Hi! Next week we'll start a new project. I'll tell you all
                    the details later 📊
                  </p>
                </CardContent>
              </Card>
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
              <div className="flex justify-between items-center p-2 rounded bg-white bg-opacity-60">
                <span className="text-gray-700">Finished</span>
                <span className="font-medium text-green-600">
                  18 (+8 tasks)
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-white bg-opacity-60">
                <span className="text-gray-700">Tracked</span>
                <span className="font-medium text-yellow-600">
                  31h (-6 hours)
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-white bg-opacity-60">
                <span className="text-gray-700">Efficiency</span>
                <span className="font-medium text-blue-600">93% (+12%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
