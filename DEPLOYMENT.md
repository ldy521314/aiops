# AIOps运维智能化平台 - 部署文档

## 项目简介

AIOps运维智能化平台是一个基于React + TypeScript + Vite构建的现代化运维监控系统,提供实时监控、智能告警、资源管理、日志分析等功能。

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite 5
- **UI组件库**: shadcn/ui + Tailwind CSS
- **路由**: React Router v6
- **数据可视化**: Recharts
- **状态管理**: React Query (TanStack Query)
- **包管理器**: pnpm

## 系统要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- 现代浏览器(Chrome, Firefox, Safari, Edge)

## 本地开发部署

### 1. 克隆项目

```bash
git clone https://github.com/ldy521314/aiops.git
cd aiops
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm run dev
```

开发服务器将在 `http://localhost:8080` 启动

### 4. 代码检查

```bash
# 运行ESLint检查
pnpm run lint

# 自动修复可修复的问题
pnpm run lint --fix
```

### 5. 构建生产版本

```bash
pnpm run build
```

构建产物将输出到 `dist/` 目录

### 6. 预览生产构建

```bash
pnpm run preview
```

## 生产环境部署

### 方案一: Nginx部署

#### 1. 构建项目

```bash
pnpm run build
```

#### 2. Nginx配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/aiops/dist;
    index index.html;

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API代理(如果需要)
    location /api/ {
        proxy_pass http://backend-server:port;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

#### 3. 部署步骤

```bash
# 上传构建产物到服务器
scp -r dist/* user@server:/var/www/aiops/dist/

# 重启Nginx
sudo systemctl restart nginx
```

### 方案二: Docker部署

#### 1. 创建Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm run build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. 创建nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 3. 构建和运行Docker容器

```bash
# 构建镜像
docker build -t aiops-frontend:latest .

# 运行容器
docker run -d -p 80:80 --name aiops-frontend aiops-frontend:latest
```

### 方案三: Vercel部署

#### 1. 安装Vercel CLI

```bash
npm install -g vercel
```

#### 2. 部署到Vercel

```bash
vercel --prod
```

#### 3. 配置vercel.json(可选)

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 方案四: GitHub Pages部署

#### 1. 修改vite.config.ts

```typescript
export default defineConfig({
  base: '/aiops/', // 替换为你的仓库名
  // ... 其他配置
});
```

#### 2. 添加部署脚本到package.json

```json
{
  "scripts": {
    "deploy": "pnpm run build && gh-pages -d dist"
  }
}
```

#### 3. 安装gh-pages并部署

```bash
pnpm add -D gh-pages
pnpm run deploy
```

## 环境变量配置

创建 `.env` 文件配置环境变量:

```env
# API基础URL
VITE_API_BASE_URL=https://api.your-domain.com

# 应用标题
VITE_APP_TITLE=AIOps运维智能化平台

# Grafana配置
VITE_GRAFANA_URL=http://your-grafana-server:3000

# 其他配置...
```

## 功能模块说明

### 1. 仪表盘 (/)
- ECS实例运行时长统计
- K8s集群健康状况
- 系统资源趋势图表
- 最新告警展示

### 2. 智能告警 (/alerts)
- 实时告警列表
- 告警级别分类(严重/警告/信息)
- 支持推送到飞书/钉钉/企业微信群
- Webhook配置管理

### 3. 资源监控 (/resources)
- ECS实例列表(含机器名称)
- K8s集群监控
- Pod资源使用情况

### 4. Pod分析 (/pod-analysis)
- Pod状态检测
- 重启次数统计
- 异常诊断建议

### 5. 日志分析 (/logs)
- 日志搜索功能
- 实时日志流
- Pod日志关联分析
- **Grafana日志可视化集成**
- **支持切换Mock数据和Grafana视图**

### 6. 自动化运维 (/automation)
- 自动化任务管理
- 执行历史记录
- 常用运维脚本

### 7. 用户管理 (/users)
- 用户列表管理
- 角色权限配置
- 用户状态管理

## 告警通知配置

### 飞书群机器人配置

1. 在飞书群中添加自定义机器人
2. 复制Webhook URL: `https://open.feishu.cn/open-apis/bot/v2/hook/...`
3. 在告警中心点击"配置通知"
4. 选择"飞书群机器人"并粘贴URL

### 钉钉群机器人配置

1. 在钉钉群中添加自定义机器人
2. 复制Webhook URL: `https://oapi.dingtalk.com/robot/send?access_token=...`
3. 在告警中心点击"配置通知"
4. 选择"钉钉群机器人"并粘贴URL

### 企业微信群机器人配置

1. 在企业微信群中添加群机器人
2. 复制Webhook URL: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...`
3. 在告警中心点击"配置通知"
4. 选择"企业微信群机器人"并粘贴URL

## 日志系统集成指南

### Grafana + Loki 集成

#### 1. 安装Grafana和Loki

**使用Docker Compose部署:**

创建 `docker-compose.yml`:

```yaml
version: '3'

services:
  loki:
    image: grafana/loki:2.9.0
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml
      - loki-data:/loki

  promtail:
    image: grafana/promtail:2.9.0
    volumes:
      - /var/log:/var/log
      - ./promtail-config.yaml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
    depends_on:
      - loki

  grafana:
    image: grafana/grafana:10.0.0
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer
    volumes:
      - grafana-data:/var/lib/grafana
    depends_on:
      - loki

volumes:
  loki-data:
  grafana-data:
```

创建 `loki-config.yaml`:

```yaml
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 127.0.0.1
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
  chunk_idle_period: 5m
  chunk_retain_period: 30s

schema_config:
  configs:
    - from: 2020-05-15
      store: boltdb
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 168h

storage_config:
  boltdb:
    directory: /loki/index
  filesystem:
    directory: /loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h
```

创建 `promtail-config.yaml`:

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          __path__: /var/log/*log

  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
```

**启动服务:**

```bash
docker-compose up -d
```

#### 2. 配置Grafana数据源

1. 访问 `http://your-server:3000` (默认用户名/密码: admin/admin)
2. 进入 Configuration → Data Sources
3. 点击 "Add data source"
4. 选择 "Loki"
5. 配置URL: `http://loki:3100`
6. 点击 "Save & Test"

#### 3. 创建日志Dashboard

在Grafana中创建新的Dashboard:

```json
{
  "dashboard": {
    "title": "AIOps日志分析",
    "panels": [
      {
        "title": "实时日志流",
        "type": "logs",
        "datasource": "Loki",
        "targets": [
          {
            "expr": "{job=\"kubernetes-pods\"}"
          }
        ]
      },
      {
        "title": "错误日志统计",
        "type": "graph",
        "datasource": "Loki",
        "targets": [
          {
            "expr": "sum(rate({job=\"kubernetes-pods\"} |= \"error\" [5m])) by (pod)"
          }
        ]
      }
    ]
  }
}
```

#### 4. 获取嵌入链接

1. 在Grafana Dashboard中点击 "Share" → "Embed"
2. 复制iframe代码或直接使用URL
3. 在前端页面配置环境变量 `VITE_GRAFANA_URL`

**示例嵌入URL格式:**
```
http://your-grafana-server:3000/d/dashboard-id/dashboard-name?orgId=1&from=now-6h&to=now&theme=dark&kiosk
```

#### 5. 前端集成

在 `.env` 文件中配置:

```env
VITE_GRAFANA_URL=http://your-grafana-server:3000/d/your-dashboard-id/aiops-logs?orgId=1&theme=dark&kiosk
```

前端代码已支持通过切换按钮在Mock数据和Grafana视图之间切换。

### OpenTelemetry 集成

#### 1. 安装OpenTelemetry Collector

创建 `otel-collector-config.yaml`:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 10s
    send_batch_size: 1024

exporters:
  logging:
    loglevel: debug
  
  jaeger:
    endpoint: jaeger:14250
    tls:
      insecure: true
  
  prometheus:
    endpoint: "0.0.0.0:8889"

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, jaeger]
    
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, prometheus]
    
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging]
```

#### 2. Docker Compose配置

```yaml
version: '3'

services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "14250:14250"
    environment:
      - COLLECTOR_OTLP_ENABLED=true

  otel-collector:
    image: otel/opentelemetry-collector:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
      - "8889:8889"   # Prometheus metrics
    depends_on:
      - jaeger

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
```

#### 3. 应用程序集成

**Node.js应用示例:**

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'aiops-backend',
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  metricReader: new OTLPMetricExporter({
    url: 'http://otel-collector:4318/v1/metrics',
  }),
});

sdk.start();
```

#### 4. Kubernetes集成

创建 `otel-daemonset.yaml`:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: otel-collector
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: otel-collector
  template:
    metadata:
      labels:
        app: otel-collector
    spec:
      containers:
      - name: otel-collector
        image: otel/opentelemetry-collector:latest
        ports:
        - containerPort: 4317
          name: otlp-grpc
        - containerPort: 4318
          name: otlp-http
        volumeMounts:
        - name: config
          mountPath: /etc/otel
      volumes:
      - name: config
        configMap:
          name: otel-collector-config
```

### 日志查询最佳实践

#### Grafana Loki查询语言(LogQL)

**基础查询:**
```logql
{job="kubernetes-pods", namespace="production"}
```

**过滤错误日志:**
```logql
{job="kubernetes-pods"} |= "error" | json
```

**统计错误率:**
```logql
sum(rate({job="kubernetes-pods"} |= "error" [5m])) by (pod)
```

**正则表达式过滤:**
```logql
{job="kubernetes-pods"} |~ "error|exception|failed"
```

#### OpenTelemetry查询

**Jaeger UI查询:**
1. 访问 `http://your-server:16686`
2. 选择服务名称
3. 设置时间范围
4. 添加标签过滤(如: `error=true`)

**Prometheus查询:**
```promql
# 请求错误率
rate(http_requests_total{status=~"5.."}[5m])

# 平均响应时间
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```

## 性能优化建议

1. **代码分割**: 使用动态import()进行路由级别的代码分割
2. **资源压缩**: 启用Gzip/Brotli压缩
3. **CDN加速**: 将静态资源部署到CDN
4. **图片优化**: 使用WebP格式,启用懒加载
5. **缓存策略**: 合理设置静态资源缓存时间
6. **日志采样**: 在高流量场景下启用日志采样减少存储成本

## 监控和日志

建议集成以下监控工具:

- **Sentry**: 前端错误监控
- **Google Analytics**: 用户行为分析
- **Web Vitals**: 性能指标监控
- **Grafana**: 日志可视化和监控
- **Jaeger**: 分布式追踪

## 常见问题

### 1. 路由404问题

确保服务器配置了SPA路由回退到index.html

### 2. 跨域问题

在开发环境配置代理,生产环境配置CORS

### 3. 构建失败

检查Node.js版本和依赖版本是否匹配

### 4. Grafana嵌入显示空白

- 检查Grafana配置中是否启用了匿名访问
- 确认iframe的CSP策略允许嵌入
- 在Grafana配置中添加: `GF_AUTH_ANONYMOUS_ENABLED=true`

### 5. OpenTelemetry数据未上报

- 检查Collector是否正常运行
- 验证应用程序中的OTLP endpoint配置
- 查看Collector日志排查问题

## 安全建议

1. **Grafana访问控制**: 
   - 生产环境禁用匿名访问
   - 使用OAuth或LDAP集成
   - 设置只读用户权限

2. **日志脱敏**:
   - 过滤敏感信息(密码、token、个人信息)
   - 使用日志脱敏规则

3. **网络隔离**:
   - 将监控系统部署在独立网络
   - 使用VPN或堡垒机访问

## 技术支持

- 项目地址: https://github.com/ldy521314/aiops
- 问题反馈: https://github.com/ldy521314/aiops/issues
- Grafana文档: https://grafana.com/docs/
- OpenTelemetry文档: https://opentelemetry.io/docs/

## 许可证

MIT License

---

**最后更新**: 2026-01-21
**版本**: 1.1.0