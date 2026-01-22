export const ecsInstances = [
  { id: 'ecs-001', name: 'web-server-01', hostname: 'web-prod-01.example.com', status: 'healthy', uptime: '45天 12小时', cpu: 45, memory: 62, region: 'cn-beijing' },
  { id: 'ecs-002', name: 'api-server-01', hostname: 'api-prod-01.example.com', status: 'healthy', uptime: '30天 8小时', cpu: 68, memory: 75, region: 'cn-shanghai' },
  { id: 'ecs-003', name: 'db-server-01', hostname: 'db-prod-01.example.com', status: 'warning', uptime: '15天 3小时', cpu: 82, memory: 88, region: 'cn-hangzhou' },
  { id: 'ecs-004', name: 'cache-server-01', hostname: 'cache-prod-01.example.com', status: 'healthy', uptime: '60天 20小时', cpu: 35, memory: 45, region: 'cn-beijing' },
];

export const k8sClusters = [
  { id: 'k8s-prod', name: '生产集群', status: 'healthy', nodes: 12, pods: 156, cpu: 58, memory: 65 },
  { id: 'k8s-test', name: '测试集群', status: 'warning', nodes: 6, pods: 48, cpu: 72, memory: 80 },
  { id: 'k8s-dev', name: '开发集群', status: 'healthy', nodes: 4, pods: 32, cpu: 45, memory: 52 },
];

export const pods = [
  { id: 'pod-001', name: 'frontend-web-7d8f9', namespace: 'production', status: 'running', restarts: 0, age: '5天', cpu: 45, memory: 512 },
  { id: 'pod-002', name: 'backend-api-9k2m4', namespace: 'production', status: 'running', restarts: 2, age: '3天', cpu: 68, memory: 1024 },
  { id: 'pod-003', name: 'worker-job-4h7n8', namespace: 'production', status: 'error', restarts: 15, age: '1天', cpu: 92, memory: 2048 },
  { id: 'pod-004', name: 'redis-cache-2k9m1', namespace: 'production', status: 'running', restarts: 0, age: '10天', cpu: 25, memory: 256 },
  { id: 'pod-005', name: 'mysql-db-5n3k7', namespace: 'production', status: 'running', restarts: 1, age: '8天', cpu: 55, memory: 4096 },
];

export const alerts = [
  { id: 'alert-001', level: 'critical', title: 'Pod worker-job-4h7n8 频繁重启', resource: 'pod-003', time: '5分钟前', message: 'Pod在过去1小时内重启了15次' },
  { id: 'alert-002', level: 'warning', title: 'ECS实例 db-server-01 CPU使用率过高', resource: 'ecs-003', time: '15分钟前', message: 'CPU使用率持续超过80%' },
  { id: 'alert-003', level: 'warning', title: 'K8s测试集群内存使用率告警', resource: 'k8s-test', time: '30分钟前', message: '集群内存使用率达到80%' },
  { id: 'alert-004', level: 'info', title: 'backend-api-9k2m4 发生重启', resource: 'pod-002', time: '1小时前', message: 'Pod已自动恢复正常' },
];

export const logs = [
  { id: 'log-001', level: 'error', pod: 'worker-job-4h7n8', time: '2026-01-21 14:32:15', message: 'OutOfMemoryError: Java heap space' },
  { id: 'log-002', level: 'warning', pod: 'backend-api-9k2m4', time: '2026-01-21 14:28:42', message: 'Database connection timeout after 30s' },
  { id: 'log-003', level: 'info', pod: 'frontend-web-7d8f9', time: '2026-01-21 14:25:10', message: 'Successfully deployed version 2.3.1' },
  { id: 'log-004', level: 'error', pod: 'worker-job-4h7n8', time: '2026-01-21 14:20:05', message: 'Failed to process message: null pointer exception' },
];

export const automationTasks = [
  { id: 'task-001', name: '每日数据库备份', type: 'scheduled', status: 'active', lastRun: '2026-01-21 02:00:00', nextRun: '2026-01-22 02:00:00' },
  { id: 'task-002', name: 'Pod自动扩容', type: 'trigger', status: 'active', lastRun: '2026-01-21 10:15:30', nextRun: '按需触发' },
  { id: 'task-003', name: '日志清理任务', type: 'scheduled', status: 'active', lastRun: '2026-01-20 23:00:00', nextRun: '2026-01-21 23:00:00' },
  { id: 'task-004', name: '异常Pod重启', type: 'trigger', status: 'paused', lastRun: '2026-01-21 12:30:00', nextRun: '-' },
];

export const users = [
  { id: 'user-001', username: 'admin', name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', lastLogin: '2026-01-21 14:30:00', createdAt: '2025-01-01' },
  { id: 'user-002', username: 'ops_user1', name: '李四', email: 'lisi@example.com', role: 'operator', status: 'active', lastLogin: '2026-01-21 10:15:00', createdAt: '2025-03-15' },
  { id: 'user-003', username: 'dev_user1', name: '王五', email: 'wangwu@example.com', role: 'developer', status: 'active', lastLogin: '2026-01-20 18:45:00', createdAt: '2025-06-20' },
  { id: 'user-004', username: 'viewer1', name: '赵六', email: 'zhaoliu@example.com', role: 'viewer', status: 'inactive', lastLogin: '2026-01-15 09:20:00', createdAt: '2025-09-10' },
  { id: 'user-005', username: 'ops_user2', name: '孙七', email: 'sunqi@example.com', role: 'operator', status: 'active', lastLogin: '2026-01-21 13:00:00', createdAt: '2025-11-05' },
];

export const metricsHistory = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  cpu: Math.floor(Math.random() * 40) + 40,
  memory: Math.floor(Math.random() * 30) + 50,
  network: Math.floor(Math.random() * 500) + 200,
}));