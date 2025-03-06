import type React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string; 
}

export default function DashboardCard({ title, value, icon, change }: DashboardCardProps) {
  // Check if the change is negative
  const isNegative = change.startsWith("-");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        {icon}
      </div>
      <div className="flex items-center mt-4 text-sm">
        {/* Conditionally render the icon based on whether the change is negative */}
        {isNegative ? (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        ) : (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        )}
        {/* Conditionally set the text color based on whether the change is negative */}
        <span className={isNegative ? "text-red-500" : "text-green-500"}>
          {change}
        </span>
        <span className="text-gray-500 ml-1">from last month</span>
      </div>
    </div>
  );
}