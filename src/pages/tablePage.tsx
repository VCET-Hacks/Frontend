"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaTelegram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generic } from "@/utils/generic";

// Mock data for demonstration
// const users = [
//   {
//     id: 122100353528550580,
//     name: "Steve Fernandes",
//     position: "Mumbai",
//     description:
//       "Person constantly talks badly about people and other agencies",
//     company: "Hate Speech",
//     location: "Hate Speech",
//     connections: 110,
//   },
//   {
//     id: 12210035352855058,
//     name: "Steve Fernandes",
//     position: "Mumbai",
//     description:
//       "Person constantly talks badly about people and other agencies",
//     company: "Hate Speech",
//     location: "Hate Speech",
//     connections: 110,
//   },
//   // Add more user data here...
// ];

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

export default function UserTable() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(filter.toLowerCase())
    // user.position.toLowerCase().includes(filter.toLowerCase()) ||
    // user.company.toLowerCase().includes(filter.toLowerCase()) ||
    // user.location.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v20.0/me?fields=id%2Cname&access_token=${generic}`,
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
        setUsers([data]);
      });
  }, []);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="flex h-1/2 p-7 w-full bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-2xl overflow-y-auto  p-6 rounded-xl h-fit mr-5">
        <h2 className="text-lg font-bold mb-4 uppercase">Filters</h2>
        <div className="space-y-4">
          {["Lists", "Contact", "Company"].map((filter) => (
            <div key={filter}>
              <h3 className="font-medium mb-2">{filter}</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-hidden bg-white shadow-2xl rounded-xl">
        <h2 className="text-xl font-normal">Panchanama</h2>
        <h2 className="text-4xl font-bold uppercase mb-7">Reported Users</h2>
        <div className="mb-4 flex justify-between items-center">
          <Input
            placeholder="Filter results..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="space-x-2">
            <Button variant="outline">Store</Button>
            <Button>Search </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <Table>
            <TableHeader className="rounded-xl overflow-clip">
              <TableRow className="bg-[#f4f4f5] rounded-xl shadow-md">
                <TableHead className="flex-1 ">
                  <Checkbox
                    checked={selectedUsers.length === filteredUsers.length}
                    onCheckedChange={() =>
                      setSelectedUsers(
                        selectedUsers.length === filteredUsers.length
                          ? []
                          : filteredUsers.map((user) => user.id)
                      )
                    }
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Violation Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>
                    <Badge>Google</Badge>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p>
                          {"Always late at doing his work and never is on time ever".slice(
                            0,
                            45
                          ) + "..."}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {
                            "Always late at doing his work and never is on time ever"
                          }
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <FaFacebookSquare className="w-4 h-4" />
                      <FaTelegram className="w-4 h-4" />
                      <IoLogoWhatsapp className="w-4 h-4" />
                      {/* <Linkedin /> */}

                      {/* <Mail className="w-4 h-4" /> */}
                      {/* <Phone className="w-4 h-4" /> */}
                      {/* <MessageSquare className="w-4 h-4" /> */}
                      <FaXTwitter className="w-4 h-4" />
                    </div>
                  </TableCell>
                  {/* <TableCell>{user.location}</TableCell> */}
                  <TableCell>
                    <button
                      onClick={() => navigate(`/facebook-dashboard/${user.id}`)}
                      type="button"
                      className="bg-white hover:bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] hover:text-bold text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
                    >
                      Review
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
