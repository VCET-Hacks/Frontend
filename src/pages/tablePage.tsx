"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Linkedin, Mail, Phone, MessageSquare, Star, MoreHorizontal } from "lucide-react"

// Mock data for demonstration
const users = [
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  { id: 1, name: "Rashmi Mittal", position: "Founder", company: "Travelport", location: "Bahrain", connections: 110 },
  { id: 2, name: "Jonathan Morrissons", position: "Sales Director", company: "Travelport", location: "Viet Nam", connections: 110 },
  { id: 3, name: "Jacob Jones", position: "Regional Sales Director", company: "Bumanji Live", location: "Kiribati", connections: 45 },
  // Add more user data here...
]

export default function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [filter, setFilter] = useState("")

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.position.toLowerCase().includes(filter.toLowerCase()) ||
    user.company.toLowerCase().includes(filter.toLowerCase()) ||
    user.location.toLowerCase().includes(filter.toLowerCase())
  )

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  return (
    <div className="flex h-1/2 p-7 w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-2xl overflow-y-auto  pl-3 h-80">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
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
      <div className="flex-1 p-6 overflow-hidden bg-white shadow-2xl">
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

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
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
                <TableHead>Platforms</TableHead>
                {/* <TableHead>Location</TableHead> */}
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
                  <TableCell>{user.position}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Linkedin className="w-4 h-4" />
                      <Mail className="w-4 h-4" />
                      <Phone className="w-4 h-4" />
                      <MessageSquare className="w-4 h-4" />
                      <Star className="w-4 h-4" />
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                  </TableCell>
                  {/* <TableCell>{user.location}</TableCell> */}
                  <TableCell>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
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