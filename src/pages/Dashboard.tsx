import { Server, Activity, AlertTriangle, Clock } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ecsInstances, k8sClusters, alerts, metricsHistory } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">仪表盘</h1>
          <p className="text-slate-400 mt-1">系统整体运行状况概览</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">最后更新</p>
          <p className="text-white font-medium">2026-01-21 14:35:20</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="ECS实例总数"
          value={ecsInstances.length}
          icon={Server}
          subtitle="4个实例运行中"
        />
        <MetricCard
          title="K8s集群"
          value={k8sClusters.length}
          icon={Activity}
          subtitle="22个节点在线"
        />
        <MetricCard
          title="活跃告警"
          value={alerts.filter(a => a.level === 'critical' || a.level === 'warning').length}
          icon={AlertTriangle}
          trend={{ value: 12, isPositive: false }}
        />
        <MetricCard
          title="平均运行时长"
          value="37.8天"
          icon={Clock}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">ECS实例运行状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ecsInstances.map((instance) => (
                <div key={instance.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-white">{instance.name}</p>
                      <StatusBadge status={instance.status as any} />
                    </div>
                    <p className="text-sm text-slate-400 mt-1">运行时长: {instance.uptime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">CPU: {instance.cpu}%</p>
                    <p className="text-sm text-slate-400">内存: {instance.memory}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">K8s集群健康状况</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {k8sClusters.map((cluster) => (
                <div key={cluster.id} className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://mgx-backend-cdn.metadl.com/generate/images/923974/2026-01-21/de8b699d-2057-427f-9c1c-19e064dc0037.png" 
                        alt="K8s" 
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-medium text-white">{cluster.name}</p>
                        <p className="text-xs text-slate-400">{cluster.nodes}个节点 / {cluster.pods}个Pod</p>
                      </div>
                    </div>
                    <StatusBadge status={cluster.status as any} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900 p-2 rounded">
                      <p className="text-xs text-slate-400">CPU使用率</p>
                      <p className="text-lg font-semibold text-white">{cluster.cpu}%</p>
                    </div>
                    <div className="bg-slate-900 p-2 rounded">
                      <p className="text-xs text-slate-400">内存使用率</p>
                      <p className="text-lg font-semibold text-white">{cluster.memory}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">系统资源趋势 (24小时)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={metricsHistory}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#F8FAFC' }}
              />
              <Area type="monotone" dataKey="cpu" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCpu)" />
              <Area type="monotone" dataKey="memory" stroke="#10B981" fillOpacity={1} fill="url(#colorMemory)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">最新告警</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-3 bg-slate-800 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.level === 'critical' ? 'bg-red-500' : 
                  alert.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-white">{alert.title}</p>
                  <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-2">{alert.time} · {alert.resource}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}