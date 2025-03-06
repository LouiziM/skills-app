import { BarChart3, Users, GraduationCap, ClipboardCheck } from "lucide-react"
import DashboardCard from "./DashboardCard"
import Bar from "../components/ui/bar"
import ActivityItem from "./ActivityItem"

export default function Dashboard() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Employees" value="124" icon={<Users className="w-8 h-8 text-blue-500" />} change="+4%" />
        <DashboardCard
          title="Skills"
          value="48"
          icon={<GraduationCap className="w-8 h-8 text-green-500" />}
          change="+12%"
        />
        <DashboardCard
          title="Trainings"
          value="16"
          icon={<ClipboardCheck className="w-8 h-8 text-purple-500" />}
          change="-2%"
        />
        <DashboardCard
          title="Evaluations"
          value="87"
          icon={<BarChart3 className="w-8 h-8 text-orange-500" />}
          change="+7%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Skills Distribution</h2>
          <div className="space-y-4">
            <Bar name="Communication" percentage={78} color="bg-blue-500" />
            <Bar name="Technical Support" percentage={65} color="bg-green-500" />
            <Bar name="Problem Solving" percentage={82} color="bg-purple-500" />
            <Bar name="Customer Service" percentage={91} color="bg-orange-500" />
            <Bar name="Product Knowledge" percentage={58} color="bg-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <ActivityItem title="New Training: Advanced Customer Support" time="2 hours ago" type="training" />
            <ActivityItem title="Evaluation Completed: Team Alpha" time="Yesterday" type="evaluation" />
            <ActivityItem title="New Skill Added: Cloud Infrastructure" time="2 days ago" type="skill" />
            <ActivityItem title="Employee Onboarded: Marie Dupont" time="3 days ago" type="employee" />
            <ActivityItem title="Training Feedback Submitted" time="1 week ago" type="feedback" />
          </div>
        </div>
      </div>
    </div>
  )
}

