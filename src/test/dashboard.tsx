import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const evaluationData = [
  { name: "Jan", manager: 12, formation: 8 },
  { name: "Feb", manager: 15, formation: 10 },
  { name: "Mar", manager: 18, formation: 12 },
  { name: "Apr", manager: 14, formation: 15 },
  { name: "May", manager: 20, formation: 18 },
  { name: "Jun", manager: 22, formation: 20 },
]

const competencyData = [
  { name: "Communication", value: 75 },
  { name: "Technical Skills", value: 82 },
  { name: "Problem Solving", value: 68 },
  { name: "Teamwork", value: 90 },
  { name: "Customer Service", value: 85 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Overview of evaluations, trainings, and competencies</CardDescription>
        </CardHeader>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Evaluations Overview</CardTitle>
          <CardDescription>Monthly evaluations by type</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evaluationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="manager" name="Manager Evaluations" fill="#0088FE" />
              <Bar dataKey="formation" name="Formation Evaluations" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Competency Distribution</CardTitle>
          <CardDescription>Average competency levels</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={competencyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {competencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Evaluations</CardTitle>
          <CardDescription>Evaluations awaiting review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">12</div>
          <Progress value={40} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">40% of total evaluations</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Trainings</CardTitle>
          <CardDescription>Scheduled in next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">8</div>
          <Progress value={75} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">75% enrollment rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Trainings</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">24</div>
          <Progress value={85} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">85% completion rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Improvements</CardTitle>
          <CardDescription>Month over month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">+12%</div>
          <Progress value={65} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">65% of employees improved</p>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest evaluations and trainings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="evaluations">
            <TabsList className="mb-4">
              <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
              <TabsTrigger value="trainings">Trainings</TabsTrigger>
            </TabsList>
            <TabsContent value="evaluations">
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Employee #{i} Evaluation</p>
                      <p className="text-sm text-muted-foreground">
                        Manager Evaluation • {i} day{i !== 1 ? "s" : ""} ago
                      </p>
                    </div>
                    <div className="text-sm font-medium">{["Draft", "Submitted", "Reviewed"][i % 3]}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="trainings">
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Training Session #{i}</p>
                      <p className="text-sm text-muted-foreground">
                        {["Technical", "Communication", "Customer Service"][i % 3]} • {i + 2} day{i !== 1 ? "s" : ""}{" "}
                        ago
                      </p>
                    </div>
                    <div className="text-sm font-medium">{["Completed", "In Progress", "Scheduled"][i % 3]}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

