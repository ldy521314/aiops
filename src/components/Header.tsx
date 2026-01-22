import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <Search className="text-slate-400" size={20} />
        <Input
          placeholder="搜索资源、告警、日志..."
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="text-slate-300 cursor-pointer hover:text-white transition-colors" size={20} />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </div>
      </div>
    </header>
  );
}