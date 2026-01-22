import { LayoutDashboard, AlertCircle, Server, Activity, FileText, Settings, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: '仪表盘', path: '/' },
  { icon: AlertCircle, label: '智能告警', path: '/alerts' },
  { icon: Server, label: '资源监控', path: '/resources' },
  { icon: Activity, label: 'Pod分析', path: '/pod-analysis' },
  { icon: FileText, label: '日志分析', path: '/logs' },
  { icon: Settings, label: '自动化运维', path: '/automation' },
  { icon: Users, label: '用户管理', path: '/users' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-slate-900 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">AIOps Platform</h1>
        <p className="text-sm text-slate-400 mt-1">运维智能化平台</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-400">管理员</p>
          </div>
        </div>
      </div>
    </div>
  );
}