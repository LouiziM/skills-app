import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Plus, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "./date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

// Sample data
const evaluations = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeId: "EMP001",
    type: "Manager",
    date: "2023-06-15",
    period: "2023-05-01 to 2023-05-31",
    status: "Reviewed",
    scores: {
      communication: 4,
      technicalSkills: 3,
      problemSolving: 4,
      teamwork: 5,
      customerService: 4,
    },
    comments:
      "John has shown excellent progress in customer service and teamwork. His technical skills could use some improvement.",
    createdBy: "Jane Smith (Manager)",
  },
  {
    id: 2,
    employeeName: "Alice Johnson",
    employeeId: "EMP002",
    type: "Formation",
    date: "2023-06-10",
    period: "2023-06-01 to 2023-06-10",
    status: "Submitted",
    training: {
      title: "Advanced Customer Service",
      type: "Obligatory",
      startDate: "2023-06-01",
      endDate: "2023-06-10",
    },
    scores: {
      communication: 5,
      technicalSkills: 4,
      problemSolving: 4,
      teamwork: 4,
      customerService: 5,
    },
    comments: "Alice performed exceptionally well in the training program, particularly in communication skills.",
    createdBy: "Training System",
  },
  {
    id: 3,
    employeeName: "Robert Brown",
    employeeId: "EMP003",
    type: "Manager",
    date: "2023-06-05",
    period: "2023-05-01 to 2023-05-31",
    status: "Draft",
    scores: {
      communication: 3,
      technicalSkills: 4,
      problemSolving: 3,
      teamwork: 3,
      customerService: 3,
    },
    comments: "Robert needs improvement in communication and teamwork. His technical skills are good.",
    createdBy: "Jane Smith (Manager)",
  },
  {
    id: 4,
    employeeName: "Emily Davis",
    employeeId: "EMP004",
    type: "Formation",
    date: "2023-06-02",
    period: "2023-05-15 to 2023-06-01",
    status: "Reviewed",
    training: {
      title: "Technical Support Fundamentals",
      type: "Optional",
      startDate: "2023-05-15",
      endDate: "2023-06-01",
    },
    scores: {
      communication: 4,
      technicalSkills: 5,
      problemSolving: 5,
      teamwork: 4,
      customerService: 4,
    },
    comments: "Emily excelled in the technical aspects of the training and showed great problem-solving abilities.",
    createdBy: "Training System",
  },
  {
    id: 5,
    employeeName: "Michael Wilson",
    employeeId: "EMP005",
    type: "Manager",
    date: "2023-05-28",
    period: "2023-04-01 to 2023-04-30",
    status: "Submitted",
    scores: {
      communication: 4,
      technicalSkills: 3,
      problemSolving: 4,
      teamwork: 4,
      customerService: 5,
    },
    comments: "Michael has excellent customer service skills. He needs to work on his technical knowledge.",
    createdBy: "Jane Smith (Manager)",
  },
]

const trainings = [
  { id: 1, title: "Advanced Customer Service", type: "Obligatory" },
  { id: 2, title: "Technical Support Fundamentals", type: "Optional" },
  { id: 3, title: "Problem Solving Techniques", type: "Obligatory" },
  { id: 4, title: "Team Collaboration Workshop", type: "Optional" },
  { id: 5, title: "Call Center Best Practices", type: "Obligatory" },
]

export default function Evaluations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [evaluationType, setEvaluationType] = useState("manager")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  // Filter evaluations based on search term and filters
  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || evaluation.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || evaluation.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "reviewed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateAverage = (scores: any) => {
    const values = Object.values(scores) as number[]
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Evaluations</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Evaluation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Evaluation</DialogTitle>
              <DialogDescription>Create a new evaluation for an employee</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="manager" onValueChange={setEvaluationType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manager">Manager Evaluation</TabsTrigger>
                <TabsTrigger value="formation">Formation Evaluation</TabsTrigger>
              </TabsList>

              <TabsContent value="manager" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select>
                      <SelectTrigger id="employee">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp001">John Doe (EMP001)</SelectItem>
                        <SelectItem value="emp002">Alice Johnson (EMP002)</SelectItem>
                        <SelectItem value="emp003">Robert Brown (EMP003)</SelectItem>
                        <SelectItem value="emp004">Emily Davis (EMP004)</SelectItem>
                        <SelectItem value="emp005">Michael Wilson (EMP005)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Evaluation Period</Label>
                    <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-medium">Performance Scores</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="communication">Communication</Label>
                        <span className="text-sm">4/5</span>
                      </div>
                      <Slider defaultValue={[4]} max={5} step={1} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="technical">Technical Skills</Label>
                        <span className="text-sm">3/5</span>
                      </div>
                      <Slider defaultValue={[3]} max={5} step={1} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="problem-solving">Problem Solving</Label>
                        <span className="text-sm">4/5</span>
                      </div>
                      <Slider defaultValue={[4]} max={5} step={1} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="teamwork">Teamwork</Label>
                        <span className="text-sm">4/5</span>
                      </div>
                      <Slider defaultValue={[4]} max={5} step={1} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="customer-service">Customer Service</Label>
                        <span className="text-sm">5/5</span>
                      </div>
                      <Slider defaultValue={[5]} max={5} step={1} />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="comments">Comments</Label>
                    <Textarea id="comments" placeholder="Enter your comments about the employee's performance" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="formation" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-formation">Employee</Label>
                    <Select>
                      <SelectTrigger id="employee-formation">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp001">John Doe (EMP001)</SelectItem>
                        <SelectItem value="emp002">Alice Johnson (EMP002)</SelectItem>
                        <SelectItem value="emp003">Robert Brown (EMP003)</SelectItem>
                        <SelectItem value="emp004">Emily Davis (EMP004)</SelectItem>
                        <SelectItem value="emp005">Michael Wilson (EMP005)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="training">Training</Label>
                    <Select>
                      <SelectTrigger id="training">
                        <SelectValue placeholder="Select training" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainings.map((training) => (
                          <SelectItem key={training.id} value={training.id.toString()}>
                            {training.title} ({training.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Training Assessment</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Knowledge Assessment</Label>
                      <div className="space-y-2">
                        <div className="border p-4 rounded-md space-y-4">
                          <div className="space-y-2">
                            <p className="font-medium">1. What is the most important aspect of customer service?</p>
                            <RadioGroup defaultValue="listening">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="listening" id="q1-a" />
                                <Label htmlFor="q1-a">Active listening</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="speed" id="q1-b" />
                                <Label htmlFor="q1-b">Speed of resolution</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="knowledge" id="q1-c" />
                                <Label htmlFor="q1-c">Technical knowledge</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="empathy" id="q1-d" />
                                <Label htmlFor="q1-d">Empathy</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium">
                              2. Which technique is best for de-escalating an angry customer?
                            </p>
                            <RadioGroup defaultValue="acknowledge">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="acknowledge" id="q2-a" />
                                <Label htmlFor="q2-a">Acknowledge their frustration</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="explain" id="q2-b" />
                                <Label htmlFor="q2-b">Explain company policies</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="transfer" id="q2-c" />
                                <Label htmlFor="q2-c">Transfer to a supervisor</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="discount" id="q2-d" />
                                <Label htmlFor="q2-d">Offer a discount</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="training-feedback">Training Feedback</Label>
                      <Textarea id="training-feedback" placeholder="Provide feedback on the training session" />
                    </div>

                    <div className="space-y-2">
                      <Label>Competency Updates</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="update-communication" />
                          <Label htmlFor="update-communication">Update Communication Skills</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="update-technical" />
                          <Label htmlFor="update-technical">Update Technical Skills</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="update-problem-solving" />
                          <Label htmlFor="update-problem-solving">Update Problem Solving Skills</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Save Evaluation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by employee name or ID..."
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
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="formation">Formation</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{evaluation.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{evaluation.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={evaluation.type === "Manager" ? "default" : "secondary"}>{evaluation.type}</Badge>
                  </TableCell>
                  <TableCell>{evaluation.date}</TableCell>
                  <TableCell>{evaluation.period}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(evaluation.status)}>
                      {evaluation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEvaluation(evaluation)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Evaluation Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedEvaluation && (
            <>
              <DialogHeader>
                <DialogTitle>Evaluation Details</DialogTitle>
                <DialogDescription>Viewing evaluation for {selectedEvaluation.employeeName}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <User className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{selectedEvaluation.employeeName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedEvaluation.employeeId}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Evaluation Type</p>
                    <p>{selectedEvaluation.type}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Date</p>
                    <p>{selectedEvaluation.date}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Period</p>
                    <p>{selectedEvaluation.period}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="outline" className={getStatusColor(selectedEvaluation.status)}>
                      {selectedEvaluation.status}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Created By</p>
                    <p>{selectedEvaluation.createdBy}</p>
                  </div>

                  {selectedEvaluation.type === "Formation" && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Training</p>
                      <div>
                        <p>{selectedEvaluation.training.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvaluation.training.type} • {selectedEvaluation.training.startDate} to{" "}
                          {selectedEvaluation.training.endDate}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Performance Scores</h3>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Communication</span>
                        <span>{selectedEvaluation.scores.communication}/5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(selectedEvaluation.scores.communication / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Technical Skills</span>
                        <span>{selectedEvaluation.scores.technicalSkills}/5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(selectedEvaluation.scores.technicalSkills / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Problem Solving</span>
                        <span>{selectedEvaluation.scores.problemSolving}/5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(selectedEvaluation.scores.problemSolving / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Teamwork</span>
                        <span>{selectedEvaluation.scores.teamwork}/5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(selectedEvaluation.scores.teamwork / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Customer Service</span>
                        <span>{selectedEvaluation.scores.customerService}/5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(selectedEvaluation.scores.customerService / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Overall Average</span>
                        <span>{calculateAverage(selectedEvaluation.scores).toFixed(1)}/5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(calculateAverage(selectedEvaluation.scores) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <h3 className="font-medium">Comments</h3>
                <p className="text-sm">{selectedEvaluation.comments}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

