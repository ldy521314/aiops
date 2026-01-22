import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { pods } from '@/lib/mockData';

const restartData = pods.map(pod => ({
  name: pod.name.split('-')[0],
  restarts: pod.restarts,
}));

export default function PodAnalysis() {
  const criticalPods = pods.filter(p => p.restarts > 5 || p.status === 'error');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Pod异常分析</h1>
        <p className="text-slate-400 mt-1">Pod状态检测、异常诊断和智能修复建议</p>
      </div>

      {criticalPods.length > 0 && (
        <Alert className="bg-red-900/20 border-red-500">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-300">
            检测到 {criticalPods.length} 个Pod存在异常,需要立即关注
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">正常运行</p>
                <p className="text-3xl font-bold text-green-500 mt-2">
                  {pods.filter(p => p.status === 'running' && p.restarts < 5).length}
                </p>
              </div>
              <CheckCircle className="text-green-500" size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">频繁重启</p>
                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  {pods.filter(p => p.restarts >= 5 && p.restarts < 10).length}
                </p>
              </div>
              <AlertTriangle className="text-yellow-500" size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">异常状态</p>
                <p className="text-3xl font-bold text-red-500 mt-2">
                  {pods.filter(p => p.status === 'error' || p.restarts >= 10).length}
                </p>
              </div>
              <XCircle className="text-red-500" size={40} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Pod重启次数统计</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={restartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#F8FAFC' }}
              />
              <Bar dataKey="restarts" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Pod状态详情</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">Pod名称</TableHead>
                <TableHead className="text-slate-300">状态</TableHead>
                <TableHead className="text-slate-300">重启次数</TableHead>
                <TableHead className="text-slate-300">运行时长</TableHead>
                <TableHead className="text-slate-300">诊断建议</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pods.map((pod) => {
                const isAbnormal = pod.restarts > 5 || pod.status === 'error';
                const diagnosis = pod.status === 'error' 
                  ? '内存溢出,建议增加内存限制' 
                  : pod.restarts > 10 
                  ? '频繁重启,检查应用日志和健康检查配置'
                  : pod.restarts > 5
                  ? '偶尔重启,监控资源使用情况'
                  : '运行正常';

                return (
                  <TableRow key={pod.id} className={`border-slate-700 hover:bg-slate-800 ${isAbnormal ? 'bg-red-900/10' : ''}`}>
                    <TableCell>
                      <p className="font-medium text-white">{pod.name}</p>
                      <p className="text-sm text-slate-400">{pod.namespace}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        pod.status === 'running' ? 'bg-green-500' : 'bg-red-500'
                      } text-white border-0`}>
                        {pod.status === 'running' ? '运行中' : '错误'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold ${
                        pod.restarts > 10 ? 'text-red-400' : 
                        pod.restarts > 5 ? 'text-yellow-400' : 'text-slate-300'
                      }`}>
                        {pod.restarts}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-300">{pod.age}</TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        {isAbnormal && <AlertTriangle className="text-yellow-500 mt-0.5" size={16} />}
                        <span className={`text-sm ${isAbnormal ? 'text-yellow-300' : 'text-slate-400'}`}>
                          {diagnosis}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">智能修复建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalPods.map((pod) => (
              <div key={pod.id} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-500 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="font-semibold text-white">{pod.name}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {pod.status === 'error' ? '状态异常' : `已重启${pod.restarts}次`}
                    </p>
                    <div className="mt-3 p-3 bg-slate-900 rounded">
                      <p className="text-sm font-medium text-blue-400 mb-2">建议操作:</p>
                      <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                        <li>检查Pod日志: kubectl logs {pod.name} -n {pod.namespace}</li>
                        <li>查看事件: kubectl describe pod {pod.name} -n {pod.namespace}</li>
                        {pod.status === 'error' && <li>增加内存限制至4GB并重启Pod</li>}
                        {pod.restarts > 10 && <li>调整健康检查探针的超时时间</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}