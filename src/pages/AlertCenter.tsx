import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle, Info, Bell, Send, Settings } from 'lucide-react';
import { alerts } from '@/lib/mockData';
import { useState } from 'react';

export default function AlertCenter() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [notificationChannel, setNotificationChannel] = useState('feishu');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Info className="text-slate-500" size={20} />;
    }
  };

  const getLevelBadge = (level: string) => {
    const config = {
      critical: { color: 'bg-red-500', label: '严重' },
      warning: { color: 'bg-yellow-500', label: '警告' },
      info: { color: 'bg-blue-500', label: '信息' },
    };
    return config[level as keyof typeof config] || config.info;
  };

  const criticalCount = alerts.filter(a => a.level === 'critical').length;
  const warningCount = alerts.filter(a => a.level === 'warning').length;
  const infoCount = alerts.filter(a => a.level === 'info').length;

  const handleSendNotification = () => {
    if (!selectedAlert || !webhookUrl) {
      alert('请选择告警并填写Webhook URL');
      return;
    }

    const message = customMessage || `【${getLevelBadge(selectedAlert.level).label}告警】\n标题: ${selectedAlert.title}\n资源: ${selectedAlert.resource}\n时间: ${selectedAlert.time}\n详情: ${selectedAlert.message}`;
    
    console.log('发送通知到:', notificationChannel);
    console.log('Webhook URL:', webhookUrl);
    console.log('消息内容:', message);
    
    alert(`通知已发送到${notificationChannel === 'feishu' ? '飞书' : notificationChannel === 'dingtalk' ? '钉钉' : '微信'}群!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">智能告警中心</h1>
          <p className="text-slate-400 mt-1">实时监控系统告警和异常事件</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Settings size={16} className="mr-2" />
              配置通知
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">告警通知配置</DialogTitle>
              <DialogDescription className="text-slate-400">
                配置告警消息推送到飞书群、钉钉群或微信群
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">通知渠道</Label>
                <Select value={notificationChannel} onValueChange={setNotificationChannel}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="feishu" className="text-white hover:bg-slate-700">飞书群机器人</SelectItem>
                    <SelectItem value="dingtalk" className="text-white hover:bg-slate-700">钉钉群机器人</SelectItem>
                    <SelectItem value="wechat" className="text-white hover:bg-slate-700">企业微信群机器人</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Webhook URL</Label>
                <Input
                  placeholder={
                    notificationChannel === 'feishu'
                      ? 'https://open.feishu.cn/open-apis/bot/v2/hook/...'
                      : notificationChannel === 'dingtalk'
                      ? 'https://oapi.dingtalk.com/robot/send?access_token=...'
                      : 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...'
                  }
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-400">
                  {notificationChannel === 'feishu' && '在飞书群中添加自定义机器人,复制Webhook地址'}
                  {notificationChannel === 'dingtalk' && '在钉钉群中添加自定义机器人,复制Webhook地址'}
                  {notificationChannel === 'wechat' && '在企业微信群中添加群机器人,复制Webhook地址'}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">选择告警</Label>
                <Select value={selectedAlert?.id} onValueChange={(id) => setSelectedAlert(alerts.find(a => a.id === id))}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="选择要发送的告警" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {alerts.map((alert) => (
                      <SelectItem key={alert.id} value={alert.id} className="text-white hover:bg-slate-700">
                        [{getLevelBadge(alert.level).label}] {alert.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">自定义消息内容(可选)</Label>
                <Textarea
                  placeholder="留空则使用默认告警格式"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSendNotification}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Send size={16} className="mr-2" />
                  发送测试通知
                </Button>
              </div>

              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <h4 className="text-sm font-semibold text-white mb-2">配置说明</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• <strong className="text-white">飞书</strong>: 群设置 → 群机器人 → 添加机器人 → 自定义机器人</li>
                  <li>• <strong className="text-white">钉钉</strong>: 群设置 → 智能群助手 → 添加机器人 → 自定义</li>
                  <li>• <strong className="text-white">企业微信</strong>: 群设置 → 群机器人 → 添加群机器人</li>
                  <li>• 建议配置关键词验证或IP白名单以提高安全性</li>
                  <li>• 可设置告警级别过滤,只推送严重和警告级别的告警</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">严重告警</p>
                <p className="text-3xl font-bold text-red-500 mt-2">{criticalCount}</p>
              </div>
              <AlertTriangle className="text-red-500" size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">警告</p>
                <p className="text-3xl font-bold text-yellow-500 mt-2">{warningCount}</p>
              </div>
              <AlertTriangle className="text-yellow-500" size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">信息</p>
                <p className="text-3xl font-bold text-blue-500 mt-2">{infoCount}</p>
              </div>
              <Info className="text-blue-500" size={40} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell size={20} />
            最新告警
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">级别</TableHead>
                <TableHead className="text-slate-300">标题</TableHead>
                <TableHead className="text-slate-300">资源</TableHead>
                <TableHead className="text-slate-300">时间</TableHead>
                <TableHead className="text-slate-300">详情</TableHead>
                <TableHead className="text-slate-300">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => {
                const levelBadge = getLevelBadge(alert.level);
                return (
                  <TableRow key={alert.id} className="border-slate-700 hover:bg-slate-800">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLevelIcon(alert.level)}
                        <Badge className={`${levelBadge.color} text-white border-0`}>
                          {levelBadge.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-white">{alert.title}</TableCell>
                    <TableCell className="text-slate-300">{alert.resource}</TableCell>
                    <TableCell className="text-slate-400">{alert.time}</TableCell>
                    <TableCell className="text-slate-300">{alert.message}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-900 hover:text-blue-300"
                              onClick={() => setSelectedAlert(alert)}
                            >
                              <Send size={14} className="mr-1" />
                              推送
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-900 border-slate-700 text-white">
                            <DialogHeader>
                              <DialogTitle className="text-white">推送告警通知</DialogTitle>
                              <DialogDescription className="text-slate-400">
                                将此告警推送到群聊
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="p-4 bg-slate-800 rounded-lg">
                                <p className="text-sm text-slate-400">告警标题</p>
                                <p className="text-white font-medium mt-1">{alert.title}</p>
                                <p className="text-sm text-slate-400 mt-2">告警详情</p>
                                <p className="text-slate-300 mt-1">{alert.message}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <Label className="text-white">选择推送渠道</Label>
                                <Select value={notificationChannel} onValueChange={setNotificationChannel}>
                                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-800 border-slate-700">
                                    <SelectItem value="feishu" className="text-white hover:bg-slate-700">飞书群</SelectItem>
                                    <SelectItem value="dingtalk" className="text-white hover:bg-slate-700">钉钉群</SelectItem>
                                    <SelectItem value="wechat" className="text-white hover:bg-slate-700">企业微信群</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Button 
                                onClick={handleSendNotification}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                <Send size={16} className="mr-2" />
                                立即推送
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-transparent border-green-600 text-green-400 hover:bg-green-900 hover:text-green-300"
                        >
                          <CheckCircle size={14} className="mr-1" />
                          确认
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

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">通知配置示例</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="font-semibold text-white mb-2">飞书群机器人</h3>
              <p className="text-sm text-slate-400 mb-3">支持富文本消息和卡片消息</p>
              <code className="text-xs text-green-400 bg-slate-900 p-2 rounded block overflow-x-auto">
                https://open.feishu.cn/open-apis/bot/v2/hook/xxx
              </code>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="font-semibold text-white mb-2">钉钉群机器人</h3>
              <p className="text-sm text-slate-400 mb-3">支持Markdown和ActionCard</p>
              <code className="text-xs text-green-400 bg-slate-900 p-2 rounded block overflow-x-auto">
                https://oapi.dingtalk.com/robot/send?access_token=xxx
              </code>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="font-semibold text-white mb-2">企业微信群机器人</h3>
              <p className="text-sm text-slate-400 mb-3">支持文本和Markdown消息</p>
              <code className="text-xs text-green-400 bg-slate-900 p-2 rounded block overflow-x-auto">
                https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}