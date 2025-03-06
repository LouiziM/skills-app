interface BarProps {
  name?: string;
  percentage: number;
  color: string;
  displayPercentage?: boolean; // New prop to control visibility of percentage text
}

export default function Bar({ name, percentage, color, displayPercentage = true }: BarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        {/* Conditionally render the percentage text */}
        {displayPercentage && (
          <span className="text-sm text-gray-500">{percentage}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}