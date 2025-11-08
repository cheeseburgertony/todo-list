# 📝 Todo List - 个人代办管理应用

一个功能完善、界面精美的 Todo List 应用。

![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.28.0-1890FF)

## ✨ 核心特性

### 🎯 任务管理
- ✅ **创建任务** - 支持标题和详细描述
- 📋 **子任务** - 为主任务添加多个步骤,追踪细节进度
- ⭐ **重要标记** - 标记重要任务,优先显示
- ✔️ **完成状态** - 实时切换任务完成状态
- 🗑️ **删除任务** - 单个或批量删除
- 📊 **进度追踪** - 显示任务完成百分比和数量

### 🔍 高级功能
- **实时搜索** - 防抖搜索,快速过滤任务
- **多维排序** - 按创建时间、重要性、标题排序,支持正/倒序
- **批量操作** - 全选、批量删除,高效管理
- **任务详情** - 侧滑抽屉查看和编辑完整任务信息
- **悬浮按钮** - 快速创建新任务

### 🎨 用户体验
- **渐变背景** - 动态渐变色背景动画
- **粘性头部** - 滚动时控制栏始终可见
- **溢出提示** - 文本溢出自动显示 Tooltip
- **现代 UI** - 基于 Ant Design 的精美界面

## 🛠️ 技术栈

### 前端框架
- **React 19** - 最新的 React 版本,使用函数组件和 Hooks
- **TypeScript** - 类型安全,提升开发体验
- **Vite** - 极速的开发服务器和构建工具

### UI 组件库
- **Ant Design 5** - 企业级 UI 组件库
- **@ant-design/icons** - 丰富的图标库
- **Less** - CSS 预处理器,支持嵌套和变量

### 工具库
- **ahooks** - React Hooks 工具库(防抖、节流等)
- **classnames** - 动态 className 工具


## 📦 项目结构

```
src/
├── components/
│   └── TodoList/
│       ├── index.tsx              # TodoList主组件
│       ├── index.less             # TodoList主样式
│       ├── types.ts               # 类型定义
│       ├── c-cpns/                # 子组件
│       │   ├── AddTask/           # 任务创建组件(Modal + 悬浮按钮)
│       │   ├── TaskControl/       # 任务控制栏组件(包括完成进度、排序、批量操作)
│       │   ├── TaskItem/          # 任务卡片组件
│       │   ├── TaskDetail/        # 任务详情组件
│       │   ├── SearchBox/         # 搜索框组件
│       │   └── BatchActions/      # 批量操作组件
│       └── hooks/
│           └── useTodoStorage.ts       # 持久化localStorage封装
├── App.tsx                        # 根组件  
├── App.less                       # 全局样式
└── main.tsx
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📖 使用指南

### 创建任务
1. 点击右下角的 **+** 悬浮按钮
2. 输入任务标题和描述
3. 按 **Enter** 或点击确定按钮快速创建任务

### 管理任务
- **完成任务** - 点击任务卡片左侧的复选框
- **标记重要** - 点击星标图标，标记为重要任务
- **查看详情** - 点击任务卡片进入详情页
- **编辑任务** - 在详情页修改标题、描述、子任务（步骤）等
- **删除任务** - 点击任务卡片的删除图标

### 子任务管理
1. 打开任务详情
2. 在"子任务"区域添加步骤
3. 勾选完成的步骤
4. 查看步骤完成进度

### 搜索和排序
- **搜索** - 在顶部搜索框输入关键词(支持标题和描述搜索)
- **排序** - 选择排序方式(创建时间/重要性/标题)
- **切换顺序** - 点击升序/降序按钮

### 批量操作
1. 点击 **批量管理** 按钮
2. 选择需要操作的任务
3. 点击 **全选** 或 **取消选择**
4. 点击 **批量删除** 删除选中的任务
5. 点击 **退出批量管理** 返回正常模式


## 💾 数据存储

应用使用浏览器的 **localStorage** 进行客户端数据持久化:

### 存储机制

- **存储键**: `tasks` - 存储所有任务数据
- **数据格式**: JSON 字符串
- **存储时机**: 每次任务增删改操作后自动保存
- **读取时机**: 应用初始化时自动加载

### 数据结构

```typescript
interface ITask {
  id: number;              // 任务唯一标识
  title: string;           // 任务标题
  description: string;     // 任务描述
  completed: boolean;      // 完成状态
  important?: boolean;     // 重要标记
  createdAt: number;       // 创建时间戳
  steps?: IStep[];         // 子任务步骤
}

interface IStep {
  id: number;              // 步骤ID
  title: string;           // 步骤标题
  completed: boolean;      // 完成状态
}
```

### 持久化封装

通过 `useTodoStorage` Hook 封装了 localStorage 的操作:

```typescript
const { tasks, updateTasks } = useTodoStorage();

// 自动从 localStorage 加载数据
// 任何更新操作都会自动同步到 localStorage
updateTasks([...tasks, newTask]);
```

### 方案问题

⚠️ **数据安全**:
- 清除浏览器缓存会删除所有数据
- localStorage 容量限制约 5-10MB
- 数据存储在本地,不支持跨设备同步

💡 **后续优化**:
- 考虑使用数据库和后端服务实现数据同步和备份
- 增加用户账户系统支持多设备访问
- 实现数据加密保护隐私
