import { Badge } from '@/components/ui/badge';

type Status = 'healthy' | 'warning' | 'critical' | 'unknown';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusConfig = {
  healthy: { color: 'bg-green-500', text: '健康' },
  warning: { color: 'bg-yellow-500', text: '警告' },
  critical: { color: 'bg-red-500', text: '严重' },
  unknown: { color: 'bg-gray-500', text: '未知' },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={`${config.color} text-white border-0`}>
      <span className="w-2 h-2 rounded-full bg-white mr-1.5"></span>
      {label || config.text}
    </Badge>
  );
}