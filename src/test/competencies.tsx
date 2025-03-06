"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, ChevronUp, ChevronDown, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data
const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    position: "Customer Service Representative",
    skills: {
      communication: { level: 4, trend: "up" },
      technicalSkills: { level: 3, trend: "up" },
      problemSolving: { level: 4, trend: "stable" },
      teamwork: { level: 5, trend: "stable" },
      customerService: { level: 4, trend: "up" },
    },
    history: [
      { month: "Jan", communication: 3, technicalSkills: 2, problemSolving: 3, teamwork: 4, customerService: 3 },
      { month: "Feb", communication: 3, technicalSkills: 2, problemSolving: 3, teamwork: 4, customerService: 3 },
      { month: "Mar", communication: 3, technicalSkills: 3, problemSolving: 3, teamwork: 4, customerService: 4 },
      { month: "Apr", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 5, customerService: 4 },
      { month: "May", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 5, customerService: 4 },
      { month: "Jun", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 5, customerService: 4 },
    ],
  },
  {
    id: "EMP002",
    name: "Alice Johnson",
    position: "Technical Support Specialist",
    skills: {
      communication: { level: 5, trend: "up" },
      technicalSkills: { level: 4, trend: "up" },
      problemSolving: { level: 4, trend: "up" },
      teamwork: { level: 4, trend: "stable" },
      customerService: { level: 5, trend: "up" },
    },
    history: [
      { month: "Jan", communication: 4, technicalSkills: 3, problemSolving: 3, teamwork: 4, customerService: 4 },
      { month: "Feb", communication: 4, technicalSkills: 3, problemSolving: 3, teamwork: 4, customerService: 4 },
      { month: "Mar", communication: 4, technicalSkills: 4, problemSolving: 4, teamwork: 4, customerService: 4 },
      { month: "Apr", communication: 5, technicalSkills: 4, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "May", communication: 5, technicalSkills: 4, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "Jun", communication: 5, technicalSkills: 4, problemSolving: 4, teamwork: 4, customerService: 5 },
    ],
  },
  {
    id: "EMP003",
    name: "Robert Brown",
    position: "Customer Service Representative",
    skills: {
      communication: { level: 3, trend: "up" },
      technicalSkills: { level: 4, trend: "stable" },
      problemSolving: { level: 3, trend: "up" },
      teamwork: { level: 3, trend: "up" },
      customerService: { level: 3, trend: "up" },
    },
    history: [
      { month: "Jan", communication: 2, technicalSkills: 4, problemSolving: 2, teamwork: 2, customerService: 2 },
      { month: "Feb", communication: 2, technicalSkills: 4, problemSolving: 2, teamwork: 2, customerService: 2 },
      { month: "Mar", communication: 3, technicalSkills: 4, problemSolving: 3, teamwork: 3, customerService: 3 },
      { month: "Apr", communication: 3, technicalSkills: 4, problemSolving: 3, teamwork: 3, customerService: 3 },
      { month: "May", communication: 3, technicalSkills: 4, problemSolving: 3, teamwork: 3, customerService: 3 },
      { month: "Jun", communication: 3, technicalSkills: 4, problemSolving: 3, teamwork: 3, customerService: 3 },
    ],
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    position: "Technical Support Specialist",
    skills: {
      communication: { level: 4, trend: "stable" },
      technicalSkills: { level: 5, trend: "stable" },
      problemSolving: { level: 5, trend: "stable" },
      teamwork: { level: 4, trend: "stable" },
      customerService: { level: 4, trend: "up" },
    },
    history: [
      { month: "Jan", communication: 4, technicalSkills: 5, problemSolving: 5, teamwork: 4, customerService: 3 },
      { month: "Feb", communication: 4, technicalSkills: 5, problemSolving: 5, teamwork: 4, customerService: 3 },
      { month: "Mar", communication: 4, technicalSkills: 5, problemSolving: 5, teamwork: 4, customerService: 4 },
      { month: "Apr", communication: 4, technicalSkills: 5, problemSolving: 5, teamwork: 4, customerService: 4 },
      { month: "May", communication: 4, technicalSkills: 5, problemSolving: 5, teamwork: 4, customerService: 4 },
      { month: "Jun", communication: 4, technicalSkills: 5, problemSolving: 5, teamwork: 4, customerService: 4 },
    ],
  },
  {
    id: "EMP005",
    name: "Michael Wilson",
    position: "Customer Service Representative",
    skills: {
      communication: { level: 4, trend: "stable" },
      technicalSkills: { level: 3, trend: "up" },
      problemSolving: { level: 4, trend: "stable" },
      teamwork: { level: 4, trend: "stable" },
      customerService: { level: 5, trend: "stable" },
    },
    history: [
      { month: "Jan", communication: 4, technicalSkills: 2, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "Feb", communication: 4, technicalSkills: 2, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "Mar", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "Apr", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "May", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 4, customerService: 5 },
      { month: "Jun", communication: 4, technicalSkills: 3, problemSolving: 4, teamwork: 4, customerService: 5 },
    ],
  },
]

const teamData = [
  { month: "Jan", communication: 3.4, technicalSkills: 3.2, problemSolving: 3.4, teamwork: 3.6, customerService: 3.4 },
  { month: "Feb", communication: 3.4, technicalSkills: 3.2, problemSolving: 3.4, teamwork: 3.6, customerService: 3.4 },
  { month: "Mar", communication: 3.6, technicalSkills: 3.8, problemSolving: 3.8, teamwork: 3.8, customerService: 4.0 },
  { month: "Apr", communication: 4.0, technicalSkills: 3.8, problemSolving: 4.0, teamwork: 4.2, customerService: 4.2 },
  { month: "May", communication: 4.0, technicalSkills: 3.8, problemSolving: 4.0, teamwork: 4.2, customerService: 4.2 },
  { month: "Jun", communication: 4.0, technicalSkills: 3.8, problemSolving: 4.0, teamwork: 4.2, customerService: 4.2 },
]

const skillDistribution = [
  { name: "Level 1", count: 0 },
  { name: "Level 2", count: 2 },
  { name: "Level 3", count: 7 },
  { name: "Level 4", count: 12 },
  { name: "Level 5", count: 4 },
]

export default function Competencies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPosition, setFilterPosition] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  // Filter employees based on search term and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition =
      filterPosition === "all" || employee.position.toLowerCase().includes(filterPosition.toLowerCase())

    return matchesSearch && matchesPosition
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ChevronUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ChevronDown className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-blue-500"
      case 5:
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const calculateTeamAverage = (skill: string) => {
    const sum = employees.reduce(
      (acc, employee) => acc + employee.skills[skill as keyof typeof employee.skills].level,
      0,
    )
    return (sum / employees.length).toFixed(1)
  }

  const teamAverages = {
    communication: calculateTeamAverage("communication"),
    technicalSkills: calculateTeamAverage("technicalSkills"),
    problemSolving: calculateTeamAverage("problemSolving"),
    teamwork: calculateTeamAverage("teamwork"),
    customerService: calculateTeamAverage("customerService"),
  }

  const radarChartData = [
    { skill: "Communication", value: Number.parseFloat(teamAverages.communication) },
    { skill: "Technical Skills", value: Number.parseFloat(teamAverages.technicalSkills) },
    { skill: "Problem Solving", value: Number.parseFloat(teamAverages.problemSolving) },
    { skill: "Teamwork", value: Number.parseFloat(teamAverages.teamwork) },
    { skill: "Customer Service", value: Number.parseFloat(teamAverages.customerService) },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Competencies & Skills</h2>
      </div>

      <Tabs defaultValue="individual">
        <TabsList>
          <TabsTrigger value="individual">Individual Skills</TabsTrigger>
          <TabsTrigger value="team">Team Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
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

            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-[280px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="customer service">Customer Service Representative</SelectItem>
                <SelectItem value="technical support">Technical Support Specialist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <Card
                key={employee.id}
                className={`cursor-pointer transition-all ${selectedEmployee === employee.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedEmployee(employee.id === selectedEmployee ? null : employee.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription>{employee.position}</CardDescription>
                  <Badge variant="outline" className="mt-1 w-fit">
                    {employee.id}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(employee.skills).map(([skill, { level, trend }]) => (
                      <div key={skill} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{skill.replace(/([A-Z])/g, " $1").trim()}</span>
                          <div className="flex items-center">
                            <span>{level}/5</span>
                            {getTrendIcon(trend)}
                          </div>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getSkillLevelColor(level)}`}
                            style={{ width: `${(level / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedEmployee && (
            <Card>
              <CardHeader>
                <CardTitle>Skill Progression</CardTitle>
                <CardDescription>
                  Historical skill development for {employees.find((e) => e.id === selectedEmployee)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={employees.find((e) => e.id === selectedEmployee)?.history}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="communication" stroke="#8884d8" name="Communication" />
                      <Line type="monotone" dataKey="technicalSkills" stroke="#82ca9d" name="Technical Skills" />
                      <Line type="monotone" dataKey="problemSolving" stroke="#ffc658" name="Problem Solving" />
                      <Line type="monotone" dataKey="teamwork" stroke="#ff8042" name="Teamwork" />
                      <Line type="monotone" dataKey="customerService" stroke="#0088fe" name="Customer Service" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button>Generate Skill Report</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Skill Progression</CardTitle>
                <CardDescription>Average skill levels over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teamData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="communication" stroke="#8884d8" name="Communication" />
                      <Line type="monotone" dataKey="technicalSkills" stroke="#82ca9d" name="Technical Skills" />
                      <Line type="monotone" dataKey="problemSolving" stroke="#ffc658" name="Problem Solving" />
                      <Line type="monotone" dataKey="teamwork" stroke="#ff8042" name="Teamwork" />
                      <Line type="monotone" dataKey="customerService" stroke="#0088fe" name="Customer Service" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Level Distribution</CardTitle>
                <CardDescription>Number of employees at each skill level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" name="Employees" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Skill Summary</CardTitle>
              <CardDescription>Current average skill levels across the team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {Object.entries(teamAverages).map(([skill, average]) => (
                  <div key={skill} className="space-y-2">
                    <h3 className="text-center font-medium capitalize">{skill.replace(/([A-Z])/g, " $1").trim()}</h3>
                    <div className="flex justify-center">
                      <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                          />
                          <circle
                            className="text-primary stroke-current"
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray={`${(Number.parseFloat(average) / 5) * 251.2}, 251.2`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{average}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Team Skill Radar</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Team" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Improvement Opportunities</CardTitle>
              <CardDescription>Areas where the team can focus on skill development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(teamAverages)
                  .sort(([, a], [, b]) => Number.parseFloat(a) - Number.parseFloat(b))
                  .slice(0, 3)
                  .map(([skill, average]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium capitalize">{skill.replace(/([A-Z])/g, " $1").trim()}</h4>
                        <p className="text-sm text-muted-foreground">Current average: {average}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Improve
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Improve {skill.replace(/([A-Z])/g, " $1").trim()} Skills</DialogTitle>
                            <DialogDescription>
                              Suggested actions to improve this skill across the team.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">1. Training Sessions</h4>
                              <p className="text-sm text-muted-foreground">
                                Organize focused training sessions on{" "}
                                {skill
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()
                                  .toLowerCase()}
                                .
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium">2. Peer Mentoring</h4>
                              <p className="text-sm text-muted-foreground">
                                Set up a peer mentoring program to share knowledge and best practices.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium">3. Performance Incentives</h4>
                              <p className="text-sm text-muted-foreground">
                                Implement incentives for employees who show significant improvement in this skill.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

