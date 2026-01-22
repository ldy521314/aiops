# AIOps运维智能化平台 - 开发计划

## 设计指南

### 设计参考
- **Datadog.com**: 专业的监控仪表盘设计
- **Grafana.com**: 数据可视化和图表设计
- **风格**: 现代科技感 + 深色主题 + 数据可视化

### 色彩方案
- Primary: #0F172A (深蓝黑 - 背景)
- Secondary: #1E293B (石板灰 - 卡片/区块)
- Accent: #3B82F6 (科技蓝 - CTA和高亮)
- Success: #10B981 (翠绿 - 健康状态)
- Warning: #F59E0B (琥珀黄 - 警告)
- Danger: #EF4444 (红色 - 错误/严重告警)
- Text: #F8FAFC (白色), #94A3B8 (浅灰 - 次要文本)

### 字体排版
- Heading1: Inter font-weight 700 (32px)
- Heading2: Inter font-weight 600 (24px)
- Heading3: Inter font-weight 600 (18px)
- Body/Normal: Inter font-weight 400 (14px)
- Body/Emphasis: Inter font-weight 600 (14px)
- Code/Monospace: JetBrains Mono font-weight 400 (13px)

### 关键组件样式
- **卡片**: 深色背景 (#1E293B), 1px边框 (#334155), 8px圆角
- **按钮**: 蓝色背景 (#3B82F6), 白色文本, 6px圆角, hover: 亮度+10%
- **表格**: 斑马纹, hover高亮行, 紧凑间距
- **图表**: 使用recharts库, 蓝绿色系渐变, 网格线半透明
- **状态指示器**: 圆点+文本, 颜色对应状态(绿/黄/红)

### 布局与间距
- 侧边栏: 固定宽度240px, 深色背景
- 主内容区: 左侧留出侧边栏空间, 24px内边距
- 卡片间距: 16px gap
- 网格布局: 响应式 (桌面3列, 平板2列, 移动1列)

### 需要生成的图片
1. **dashboard-hero-bg.jpg** - 科技感数据中心背景图, 深蓝色调, 服务器机房 (Style: photorealistic, dark tech)
2. **k8s-cluster-icon.png** - Kubernetes集群图标, 简洁现代 (Style: minimalist, tech icon)
3. **monitoring-chart-bg.jpg** - 监控图表背景纹理, 抽象数据流 (Style: abstract, data visualization)
4. **alert-notification-icon.png** - 告警通知图标, 醒目设计 (Style: flat design, warning icon)

---

## 开发任务

### 1. 项目结构设置
- 安装必要依赖: recharts (图表库), lucide-react (图标库), date-fns (日期处理)
- 创建页面路由结构
- 设置全局样式和主题

### 2. 生成图片资源
- 使用ImageCreator.generate_images生成4张图片

### 3. 布局组件
- **Sidebar.tsx**: 侧边导航栏, 包含菜单项和logo
- **Header.tsx**: 顶部栏, 包含用户信息和通知
- **Layout.tsx**: 主布局容器, 整合Sidebar和Header

### 4. 仪表盘首页 (Dashboard.tsx)
- 系统健康状态卡片
- ECS运行时长统计卡片
- K8s集群健康状况卡片
- 关键指标监控图表 (CPU、内存、网络)
- 告警统计和趋势图

### 5. 智能告警中心 (AlertCenter.tsx)
- 实时告警列表表格
- 告警级别筛选器
- Pod异常告警高亮
- 告警详情弹窗

### 6. 资源监控模块 (ResourceMonitor.tsx)
- ECS实例列表表格 (含运行时长)
- K8s集群监控卡片
- Pod监控列表
- 资源使用率可视化图表

### 7. Pod异常分析 (PodAnalysis.tsx)
- Pod状态检测表格
- 重启次数统计图表
- 异常日志展示
- 智能诊断建议卡片

### 8. 日志分析系统 (LogAnalysis.tsx)
- 日志搜索输入框
- 日志列表展示
- 日志级别筛选
- Pod日志关联视图

### 9. 自动化运维 (Automation.tsx)
- 任务列表表格
- 任务创建表单
- 执行历史记录
- 调度配置面板

### 10. 通用组件
- **MetricCard.tsx**: 指标卡片组件
- **StatusBadge.tsx**: 状态徽章组件
- **ChartContainer.tsx**: 图表容器组件
- **DataTable.tsx**: 数据表格组件

### 11. 模拟数据
- **mockData.ts**: 创建模拟数据用于演示

### 12. 样式优化
- 更新index.css添加自定义滚动条样式
- 响应式布局调整

### 13. 测试与优化
- 运行pnpm run lint检查代码
- 运行pnpm run build构建项目
- 修复任何错误

### 14. 最终检查
- 使用CheckUI.run验证UI渲染质量