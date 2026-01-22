import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/StatusBadge';
import { ecsInstances, k8sClusters, pods } from '@/lib/mockData';

export default function ResourceMonitor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">资源监控</h1>
        <p className="text-slate-400 mt-1">ECS实例、K8s集群和Pod资源监控</p>
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">ECS实例列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">实例名称</TableHead>
                <TableHead className="text-slate-300">机器名称</TableHead>
                <TableHead className="text-slate-300">状态</TableHead>
                <TableHead className="text-slate-300">运行时长</TableHead>
                <TableHead className="text-slate-300">CPU使用率</TableHead>
                <TableHead className="text-slate-300">内存使用率</TableHead>
                <TableHead className="text-slate-300">区域</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecsInstances.map((instance) => (
                <TableRow key={instance.id} className="border-slate-700 hover:bg-slate-800">
                  <TableCell>
                    <p className="font-medium text-white">{instance.name}</p>
                    <p className="text-sm text-slate-400">{instance.id}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-mono text-sm text-blue-400">{instance.hostname}</p>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={instance.status as any} />
                  </TableCell>
                  <TableCell className="text-slate-300">{instance.uptime}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{instance.cpu}%</span>
                      </div>
                      <Progress value={instance.cpu} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{instance.memory}%</span>
                      </div>
                      <Progress value={instance.memory} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{instance.region}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">K8s集群监控</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {k8sClusters.map((cluster) => (
              <div key={cluster.id} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://mgx-backend-cdn.metadl.com/generate/images/923974/2026-01-21/de8b699d-2057-427f-9c1c-19e064dc0037.png" 
                      alt="K8s" 
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="font-semibold text-white">{cluster.name}</p>
                      <p className="text-xs text-slate-400">{cluster.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={cluster.status as any} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">节点数</span>
                    <span className="text-white font-medium">{cluster.nodes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Pod数</span>
                    <span className="text-white font-medium">{cluster.pods}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-700">
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">CPU</span>
                          <span className="text-white">{cluster.cpu}%</span>
                        </div>
                        <Progress value={cluster.cpu} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">内存</span>
                          <span className="text-white">{cluster.memory}%</span>
                        </div>
                        <Progress value={cluster.memory} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Pod监控列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">Pod名称</TableHead>
                <TableHead className="text-slate-300">命名空间</TableHead>
                <TableHead className="text-slate-300">状态</TableHead>
                <TableHead className="text-slate-300">重启次数</TableHead>
                <TableHead className="text-slate-300">运行时长</TableHead>
                <TableHead className="text-slate-300">CPU</TableHead>
                <TableHead className="text-slate-300">内存</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pods.map((pod) => (
                <TableRow key={pod.id} className="border-slate-700 hover:bg-slate-800">
                  <TableCell>
                    <p className="font-medium text-white">{pod.name}</p>
                    <p className="text-sm text-slate-400">{pod.id}</p>
                  </TableCell>
                  <TableCell className="text-slate-300">{pod.namespace}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={pod.status === 'running' ? 'healthy' : 'critical'} 
                      label={pod.status === 'running' ? '运行中' : '错误'}
                    />
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${pod.restarts > 5 ? 'text-red-400' : 'text-slate-300'}`}>
                      {pod.restarts}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300">{pod.age}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${pod.cpu > 80 ? 'text-red-400' : 'text-slate-300'}`}>
                      {pod.cpu}%
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300">{pod.memory}MB</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}