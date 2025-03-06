import { useState } from "react"
import { CalendarIcon, Filter, Plus, Search, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Sample data
const trainings = [
  {
    id: 1,
    title: "Advanced Customer Service",
    type: "Obligatory",
    startDate: "2023-07-10",
    endDate: "2023-07-15",
    status: "Scheduled",
    description:
      "Learn advanced techniques for handling difficult customer interactions and improving satisfaction scores.",
    instructor: "Sarah Johnson",
    enrolledCount: 15,
    maxCapacity: 20,
  },
  {
    id: 2,
    title: "Technical Support Fundamentals",
    type: "Optional",
    startDate: "2023-07-05",
    endDate: "2023-07-08",
    status: "In Progress",
    description:
      "Master the basics of technical support, troubleshooting common issues, and using support tools effectively.",
    instructor: "David Chen",
    enrolledCount: 12,
    maxCapacity: 15,
  },
  {
    id: 3,
    title: "Problem Solving Techniques",
    type: "Obligatory",
    startDate: "2023-06-20",
    endDate: "2023-06-25",
    status: "Completed",
    description: "Develop critical thinking and problem-solving skills to resolve complex customer issues efficiently.",
    instructor: "Michael Brown",
    enrolledCount: 18,
    maxCapacity: 18,
    feedback: {
      satisfaction: 4.5,
      comments: [
        "Very helpful for my daily work",
        "The instructor was knowledgeable and engaging",
        "Would recommend to colleagues",
      ],
    },
  },
  {
    id: 4,
    title: "Team Collaboration Workshop",
    type: "Optional",
    startDate: "2023-07-15",
    endDate: "2023-07-16",
    status: "Scheduled",
    description:
      "Improve team communication, collaboration, and efficiency through interactive exercises and discussions.",
    instructor: "Emily Wilson",
    enrolledCount: 8,
    maxCapacity: 12,
  },
  {
    id: 5,
    title: "Call Center Best Practices",
    type: "Obligatory",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    status: "Completed",
    description:
      "Learn industry best practices for call center operations, customer handling, and performance metrics.",
    instructor: "Robert Taylor",
    enrolledCount: 20,
    maxCapacity: 20,
    feedback: {
      satisfaction: 4.2,
      comments: [
        "Excellent content and delivery",
        "Practical examples were very helpful",
        "Would like more time for practice",
      ],
    },
  },
]

export default function Trainings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [date, setDate] = useState<Date>()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Filter trainings based on search term and filters
  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || training.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || training.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trainings</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Training
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Training</DialogTitle>
              <DialogDescription>Schedule a new training session for employees</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Training Title</Label>
                  <Input id="title" placeholder="Enter training title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Training Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="obligatory">Obligatory</SelectItem>
                      <SelectItem value="optional">Optional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input id="instructor" placeholder="Enter instructor name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Maximum Capacity</Label>
                <Input id="capacity" type="number" placeholder="Enter maximum capacity" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter training description" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Create Training</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or instructor..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="obligatory">Obligatory</SelectItem>
            <SelectItem value="optional">Optional</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainings.map((training) => (
              <Card key={training.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <CardDescription>{training.instructor}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(training.status)}>
                      {training.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {training.startDate} to {training.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {training.enrolledCount}/{training.maxCapacity} Enrolled
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {training.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{training.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {training.status === "Scheduled" && <Button size="sm">Enroll</Button>}
                  {training.status === "Completed" && (
                    <Button size="sm" variant="secondary">
                      View Feedback
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Training Calendar</CardTitle>
              <CardDescription>View upcoming and past training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Trainings on Selected Date</h3>
                {date ? (
                  <div className="space-y-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">Advanced Customer Service</CardTitle>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Scheduled
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>9:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>15/20 Enrolled</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">Enroll</Button>
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Select a date to view trainings</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Training Feedback Dialog */}
      <Dialog>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Training Feedback</DialogTitle>
            <DialogDescription>Provide feedback for the completed training</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Overall Satisfaction</Label>
              <RadioGroup defaultValue="4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3">3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4">4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5">5</Label>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground pt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea id="comments" placeholder="Share your thoughts about the training" />
            </div>

            <div className="space-y-2">
              <Label>Would you recommend this training to others?</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

