import { ClipboardCheck, BarChart3, GraduationCap, Users, TrendingUp } from 'lucide-react';

interface ActivityItemProps {
  title: string;
  time: string;
  type: 'training' | 'evaluation' | 'skill' | 'employee' | 'feedback';
}

export default function ActivityItem({ title, time, type }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'training':
        return <ClipboardCheck className="w-5 h-5 text-purple-500" />;
      case 'evaluation':
        return <BarChart3 className="w-5 h-5 text-orange-500" />;
      case 'skill':
        return <GraduationCap className="w-5 h-5 text-green-500" />;
      case 'employee':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'feedback':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
    }
  };
  
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
