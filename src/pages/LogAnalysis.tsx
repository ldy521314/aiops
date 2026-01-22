import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Monitor, Database } from 'lucide-react';
import { logs } from '@/lib/mockData';
import { useState } from 'react';

export default function LogAnalysis() {
  const [viewMode, setViewMode] = useState<'mock' | 'grafana'>('mock');
  const grafanaUrl = import.meta.env.VITE_GRAFANA_URL || '';

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">日志分析系统</h1>
          <p className="text-slate-400 mt-1">日志搜索、聚合分析和异常检测</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'mock' ? 'default' : 'outline'}
            onClick={() => setViewMode('mock')}
            className={viewMode === 'mock' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white'
            }
          >
            <Database size={16} className="mr-2" />
            Mock数据
          </Button>
          <Button
            variant={viewMode === 'grafana' ? 'default' : 'outline'}
            onClick={() => setViewMode('grafana')}
            disabled={!grafanaUrl}
            className={viewMode === 'grafana' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }
          >
            <Monitor size={16} className="mr-2" />
            Grafana视图
          </Button>
        </div>
      </div>

      {!grafanaUrl && (
        <Card className="bg-yellow-900/20 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Monitor className="text-yellow-500 shrink-0 mt-1" size={20} />
              <div>
                <p className="text-yellow-300 font-semibold mb-1">Grafana未配置</p>
                <p className="text-yellow-200/80 text-sm">
                  要启用Grafana日志可视化,请在 <code className="bg-slate-800 px-2 py-1 rounded">.env</code> 文件中配置 
                  <code className="bg-slate-800 px-2 py-1 rounded ml-1">VITE_GRAFANA_URL</code>
                </p>
                <p className="text-yellow-200/80 text-sm mt-2">
                  参考部署文档中的 "日志系统集成指南" 章节进行配置
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === 'grafana' && grafanaUrl ? (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor size={20} />
              Grafana日志可视化
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full" style={{ height: '800px' }}>
              <iframe
                src={grafanaUrl}
                className="w-full h-full rounded-lg border border-slate-700"
                title="Grafana日志分析"
                allowFullScreen
              />
            </div>
            <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-400">
                <strong className="text-slate-300">提示:</strong> 
                Grafana提供强大的日志查询和可视化功能。您可以使用LogQL语言进行复杂的日志过滤和聚合分析。
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <Input
                      placeholder="搜索日志内容、Pod名称、错误信息..."
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    搜索
                  </Button>
                </div>
                <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                  <Download size={16} className="mr-2" />
                  导出日志
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400">错误日志</p>
                  <p className="text-3xl font-bold text-red-500 mt-2">
                    {logs.filter(l => l.level === 'error').length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400">警告日志</p>
                  <p className="text-3xl font-bold text-yellow-500 mt-2">
                    {logs.filter(l => l.level === 'warning').length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400">信息日志</p>
                  <p className="text-3xl font-bold text-blue-500 mt-2">
                    {logs.filter(l => l.level === 'info').length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">实时日志流</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                {logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-3 rounded border ${
                      log.level === 'error' ? 'bg-red-900/20 border-red-500/30' :
                      log.level === 'warning' ? 'bg-yellow-900/20 border-yellow-500/30' :
                      'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Badge className={`${getLevelColor(log.level)} text-white border-0 shrink-0`}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-slate-400">{log.time}</span>
                          <span className="text-blue-400">{log.pod}</span>
                        </div>
                        <p className={`${
                          log.level === 'error' ? 'text-red-300' :
                          log.level === 'warning' ? 'text-yellow-300' :
                          'text-slate-300'
                        } break-words`}>
                          {log.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Pod日志关联分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-white">worker-job-4h7n8</p>
                    <Badge className="bg-red-500 text-white border-0">高频错误</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    检测到该Pod在过去1小时内产生了多条错误日志,可能存在内存泄漏问题
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-slate-900 rounded text-xs font-mono text-red-300">
                      OutOfMemoryError: Java heap space
                    </div>
                    <div className="p-2 bg-slate-900 rounded text-xs font-mono text-red-300">
                      Failed to process message: null pointer exception
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-sm text-blue-400">智能建议: 增加JVM堆内存配置至4GB,并启用GC日志监控</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-white">backend-api-9k2m4</p>
                    <Badge className="bg-yellow-500 text-white border-0">间歇性警告</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    数据库连接超时,可能与网络延迟或数据库负载有关
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-slate-900 rounded text-xs font-mono text-yellow-300">
                      Database connection timeout after 30s
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-sm text-blue-400">智能建议: 检查数据库连接池配置,考虑增加超时时间或优化慢查询</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}