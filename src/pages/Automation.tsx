import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Plus } from 'lucide-react';
import { automationTasks } from '@/lib/mockData';

export default function Automation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">自动化运维</h1>
          <p className="text-slate-400 mt-1">任务管理、脚本执行和调度配置</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus size={16} className="mr-2" />
          创建任务
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">活跃任务</p>
              <p className="text-3xl font-bold text-green-500 mt-2">
                {automationTasks.filter(t => t.status === 'active').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">暂停任务</p>
              <p className="text-3xl font-bold text-yellow-500 mt-2">
                {automationTasks.filter(t => t.status === 'paused').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">自动化任务列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">任务名称</TableHead>
                <TableHead className="text-slate-300">类型</TableHead>
                <TableHead className="text-slate-300">状态</TableHead>
                <TableHead className="text-slate-300">上次执行</TableHead>
                <TableHead className="text-slate-300">下次执行</TableHead>
                <TableHead className="text-slate-300">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automationTasks.map((task) => (
                <TableRow key={task.id} className="border-slate-700 hover:bg-slate-800">
                  <TableCell>
                    <p className="font-medium text-white">{task.name}</p>
                    <p className="text-sm text-slate-400">{task.id}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-slate-700 text-slate-300 border-0">
                      {task.type === 'scheduled' ? '定时任务' : '触发任务'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${
                      task.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white border-0`}>
                      {task.status === 'active' ? '运行中' : '已暂停'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{task.lastRun}</TableCell>
                  <TableCell className="text-slate-300">{task.nextRun}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {task.status === 'active' ? (
                        <Button size="sm" variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                          <Pause size={14} className="mr-1" />
                          暂停
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                          <Play size={14} className="mr-1" />
                          启动
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                        编辑
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">常用运维脚本</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Pod自动重启脚本', desc: '检测异常Pod并自动重启' },
                { name: '资源清理脚本', desc: '清理未使用的镜像和容器' },
                { name: '日志归档脚本', desc: '定期归档历史日志文件' },
                { name: '健康检查脚本', desc: '全面检查集群健康状态' },
              ].map((script, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{script.name}</p>
                    <p className="text-sm text-slate-400 mt-1">{script.desc}</p>
                  </div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    执行
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">执行历史</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: '每日数据库备份', time: '2026-01-21 02:00:00', status: 'success' },
                { task: 'Pod自动扩容', time: '2026-01-21 10:15:30', status: 'success' },
                { task: '异常Pod重启', time: '2026-01-21 12:30:00', status: 'failed' },
                { task: '日志清理任务', time: '2026-01-20 23:00:00', status: 'success' },
              ].map((history, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-white">{history.task}</p>
                    <p className="text-sm text-slate-400 mt-1">{history.time}</p>
                  </div>
                  <Badge className={`${
                    history.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  } text-white border-0`}>
                    {history.status === 'success' ? '成功' : '失败'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}