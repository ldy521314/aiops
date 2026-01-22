import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { users } from '@/lib/mockData';

export default function UserManagement() {
  const getRoleBadge = (role: string) => {
    const config = {
      admin: { color: 'bg-purple-500', label: '管理员' },
      operator: { color: 'bg-blue-500', label: '运维人员' },
      developer: { color: 'bg-green-500', label: '开发人员' },
      viewer: { color: 'bg-gray-500', label: '只读用户' },
    };
    return config[role as keyof typeof config] || config.viewer;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">用户管理</h1>
          <p className="text-slate-400 mt-1">管理平台用户账号和权限</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <UserPlus size={16} className="mr-2" />
          添加用户
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">总用户数</p>
              <p className="text-3xl font-bold text-white mt-2">{users.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">活跃用户</p>
              <p className="text-3xl font-bold text-green-500 mt-2">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">管理员</p>
              <p className="text-3xl font-bold text-purple-500 mt-2">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">运维人员</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">
                {users.filter(u => u.role === 'operator').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">用户列表</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  placeholder="搜索用户..."
                  className="pl-9 w-64 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">用户名</TableHead>
                <TableHead className="text-slate-300">姓名</TableHead>
                <TableHead className="text-slate-300">邮箱</TableHead>
                <TableHead className="text-slate-300">角色</TableHead>
                <TableHead className="text-slate-300">状态</TableHead>
                <TableHead className="text-slate-300">最后登录</TableHead>
                <TableHead className="text-slate-300">创建时间</TableHead>
                <TableHead className="text-slate-300">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const roleBadge = getRoleBadge(user.role);
                return (
                  <TableRow key={user.id} className="border-slate-700 hover:bg-slate-800">
                    <TableCell>
                      <p className="font-medium text-white">{user.username}</p>
                      <p className="text-sm text-slate-400">{user.id}</p>
                    </TableCell>
                    <TableCell className="text-slate-300">{user.name}</TableCell>
                    <TableCell className="text-slate-300">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={`${roleBadge.color} text-white border-0`}>
                        {roleBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                      } text-white border-0`}>
                        {user.status === 'active' ? '活跃' : '未激活'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{user.lastLogin}</TableCell>
                    <TableCell className="text-slate-300">{user.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                          <Edit size={14} className="mr-1" />
                          编辑
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent border-red-600 text-red-400 hover:bg-red-900 hover:text-red-300">
                          <Trash2 size={14} className="mr-1" />
                          删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">角色权限说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-purple-500 text-white border-0">管理员</Badge>
                  <span className="text-white font-medium">Admin</span>
                </div>
                <p className="text-sm text-slate-400">拥有所有权限,可以管理用户、配置系统、执行所有运维操作</p>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-blue-500 text-white border-0">运维人员</Badge>
                  <span className="text-white font-medium">Operator</span>
                </div>
                <p className="text-sm text-slate-400">可以查看监控数据、处理告警、执行运维任务和自动化脚本</p>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-green-500 text-white border-0">开发人员</Badge>
                  <span className="text-white font-medium">Developer</span>
                </div>
                <p className="text-sm text-slate-400">可以查看应用日志、Pod状态、资源使用情况,不能执行运维操作</p>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-gray-500 text-white border-0">只读用户</Badge>
                  <span className="text-white font-medium">Viewer</span>
                </div>
                <p className="text-sm text-slate-400">只能查看仪表盘和监控数据,无法进行任何操作</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { user: '张三', action: '登录系统', time: '2026-01-21 14:30:00' },
                { user: '孙七', action: '执行了Pod重启任务', time: '2026-01-21 13:00:00' },
                { user: '李四', action: '确认了一条告警', time: '2026-01-21 10:15:00' },
                { user: '王五', action: '查看了日志分析', time: '2026-01-20 18:45:00' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-sm text-slate-400 mt-1">{activity.action}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}