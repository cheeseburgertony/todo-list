# TODO List 项目说明文档

## 1. 技术选型

### 核心技术栈

#### 编程语言

- **TypeScript**
  - **选择理由**：提供静态类型检查，减少运行时错误，提升代码可维护性和开发体验
  - **替代方案**：纯 JavaScript
  - **为什么不用 JavaScript**：大型项目中类型安全至关重要，TypeScript 的类型系统能在编译阶段发现潜在问题

#### 前端框架

- **React**
  - **选择理由**：
    - 组件化开发，代码复用性高
    - 虚拟 DOM 提供高性能渲染
    - 生态系统成熟，社区活跃
    - Hooks API 简化状态管理和副作用处理
  - **替代方案**：Vue.js、Angular
  - **为什么选择 React**：熟悉度高，组件化思想清晰，适合构建复杂交互的单页应用

#### 构建工具

- **Vite**
  - **选择理由**：
    - 极速的开发服务器启动(基于 ESM)
    - 热模块替换(HMR)响应快
    - 生产构建基于 Rollup，打包体积小
  - **替代方案**：Webpack
  - **为什么选择 Vite**：开发体验优秀，配置简单，构建速度快

#### UI 组件库

- **Ant Design**
  - **选择理由**：
    - 企业级 UI 设计，组件丰富
    - 开箱即用，样式统一
    - 文档完善，社区支持好
    - 提供 Modal、Drawer、Form 等高级组件
  - **替代方案**：Material-UI、Shadcn/UI
  - **为什么选择 Ant Design**：中文文档友好，组件质量高，适合快速开发

#### 样式方案

- **Less**
  - **选择理由**：
    - 支持变量、嵌套、混合等高级特性
    - 与 Ant Design 配合使用(Ant Design 使用 Less)
    - 语法简洁，易于维护
  - **替代方案**：Sass、CSS-in-JS、Tailwind CSS
  - **为什么选择 Less**：与 UI 库配套，避免样式冲突，易上手，Vite 支持良好

#### 工具库

- **ahooks**

  - **选择理由**：提供高质量的 React Hooks 工具(防抖、节流等)
  - **用途**：搜索框防抖优化，避免频繁触发过滤操作

- **classnames**
  - **选择理由**：动态拼接 className，简化条件样式处理
  - **用途**：任务完成状态、选中状态的样式切换

### 数据存储方案

#### 客户端存储

- **localStorage**
  - **选择理由**：
    - 浏览器原生 API，无需引入额外库
    - 持久化存储，刷新页面数据不丢失
    - 容量足够（5-10MB），适合中小型应用
  - **替代方案**：IndexedDB、sessionStorage、后端数据库
  - **为什么不用 IndexedDB**：
    - 个人认为当前需求简单，不需要复杂查询
    - localStorage API 更简单，开发效率高
  - **为什么不用后端**：
    - 项目目前定位为纯前端应用
    - 无需用户认证和多设备同步
    - 降低部署和维护成本

## 2. 项目结构设计

### 整体架构

```
纯前端 SPA 应用
├── UI 层 (React 组件)
├── 状态管理 (React Hooks)
└── 数据持久化 (localStorage)
```

### 目录结构

```
todo-list/
├── public/                      # 静态资源
├── src/
│   ├── components/              # 组件目录
│   │   └── TodoList/           # TodoList 主模块
│   │       ├── index.tsx       # 主组件(状态管理、业务逻辑)
│   │       ├── index.less      # 主组件样式
│   │       ├── types.ts        # TypeScript 类型定义
│   │       ├── c-cpns/         # 子组件目录
│   │       │   ├── AddTask/    # 任务创建组件
│   │       │   ├── SearchBox/  # 搜索框组件
│   │       │   ├── TaskControl/# 控制面板组件
│   │       │   ├── TaskItem/   # 任务卡片组件
│   │       │   ├── TaskDetail/ # 任务详情组件
│   │       │   └── BatchActions/# 批量操作组件
│   │       └── hooks/          # 自定义 Hooks
│   │           └── useTodoStorage.ts # 数据持久化 Hook
│   ├── App.tsx                 # 根组件
│   ├── App.less                # 全局样式
│   └── main.tsx                # 应用入口
├── index.html                  # HTML 模板
├── package.json                # 依赖配置
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # Vite 配置
├── eslint.config.js            # ESLint 配置
├── README.md                   # 项目说明
└── DOC.md                      # 详细文档
```

### 模块职责说明

#### 核心模块

**1. TodoList (主组件)**

- **职责**：
  - 状态管理(任务列表、排序方式、搜索关键词等)
  - 业务逻辑(增删改查、排序、过滤、批量操作)
  - 子组件组合和数据传递
- **关键状态**：
  ```typescript
  - tasks: ITask[]              // 任务列表
  - sortOrder: SortOrderType    // 排序方式
  - isAscending: boolean        // 升序/降序
  - searchKeyword: string       // 搜索关键词
  - selectedTask: ITask | null  // 当前选中任务
  - selectedTaskIds: Set<number>// 批量选中的任务 ID
  - isBatchMode: boolean        // 批量模式开关
  ```

**2. useTodoStorage (自定义 Hook)**

- **职责**：封装 localStorage 读写逻辑
- **功能**：
  - 初始化时从 localStorage 加载数据
  - 提供 updateTasks 方法更新数据并自动同步到 localStorage
  - 数据序列化/反序列化处理
- **实现**：

  ```typescript
  export const useTodoStorage = () => {
    const [tasks, setTasks] = useState<ITask[]>(() => {
      // 初始化时从 localStorage 读取
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    });

    const updateTasks = (newTasks: ITask[]) => {
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    };

    return { tasks, updateTasks };
  };
  ```

#### 子组件模块

**1. AddTask (任务创建组件)**

- **UI 形式**：FloatButton + Modal
- **功能**：
  - 点击悬浮按钮打开 Modal
  - 输入任务标题(必填)和描述(可选)
  - 表单验证(防止空格、空字符串)
  - 支持 Enter 键快速提交
  - 打开 Modal 时自动聚焦标题输入框
- **Props**：
  ```typescript
  interface IAddTaskProps {
    onAddTask: (title: string, description: string) => void;
  }
  ```

**2. SearchBox (搜索框组件)**

- **功能**：
  - 实时搜索任务(标题、描述)
  - 防抖优化(300ms)，避免频繁触发过滤
  - 支持清空按钮
- **Props**：
  ```typescript
  interface ISearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }
  ```
- **优化**：使用 ahooks 的 `useDebounceFn` 实现防抖

**3. TaskControl (控制面板组件)**

- **功能**：
  - 显示任务完成进度(进度条 + 数量)
  - 排序控制(创建时间/重要性/标题,升序/降序)
  - 批量操作入口(批量管理、全选、批量删除)
- **Props**：
  ```typescript
  interface ITaskControlProps {
    completedCount: number;
    totalCount: number;
    sortOrder: SortOrderType;
    isAscending: boolean;
    onToggleSortOrder: () => void;
    onChangeSortOrder: (order: SortOrderType) => void;
    isBatchMode: boolean;
    selectedCount: number;
    onToggleBatchMode: () => void;
    onSelectAll: () => void;
    onClearSelection: () => void;
    onBatchDelete: () => void;
  }
  ```

**4. TaskItem (任务卡片组件)**

- **功能**：
  - 显示任务标题、描述、创建时间
  - 完成状态切换(复选框)
  - 重要标记切换(星标按钮)
  - 删除任务
  - 点击卡片打开详情
  - 文本溢出显示 Tooltip
  - 批量模式下支持选中
- **Props**：
  ```typescript
  interface ITaskItemProps {
    task: ITask;
    onToggleComplete: (id: number) => void;
    onToggleImportant: (id: number) => void;
    onTaskDelete: (id: number) => void;
    onClick: (task: ITask) => void;
    isBatchMode?: boolean;
    isSelected?: boolean;
    onToggleSelection?: (id: number) => void;
  }
  ```
- **交互优化**：
  - 阻止按钮点击冒泡,避免误触发卡片点击
  - 使用 ref 检测文本是否溢出,动态显示 Tooltip

**5. TaskDetail (任务详情组件)**

- **UI 形式**：Drawer(侧滑抽屉)
- **功能**：
  - 查看和编辑任务完整信息
  - 修改标题、描述、完成状态、重要标记
  - 管理子任务(步骤):添加、完成、删除
  - 显示创建时间
  - 表单验证
- **Props**：
  ```typescript
  interface ITaskDetailProps {
    task: ITask | null;
    open: boolean;
    onClose: () => void;
    onUpdate: (task: ITask) => void;
  }
  ```
- **数据同步**：使用 `useEffect` 监听 task 变化，初始时自动填充表单

**6. BatchActions (批量操作组件)**

- **功能**：
  - 显示选中数量
  - 全选/取消选择
  - 批量删除(带二次确认对话框)
  - 退出批量模式
- **Props**：
  ```typescript
  interface IBatchActionsProps {
    selectedCount: number;
    totalCount: number;
    onSelectAll: () => void;
    onClearSelection: () => void;
    onBatchDelete: () => void;
    onExit: () => void;
  }
  ```

#### 类型定义模块 (types.ts)

```typescript
// 子任务步骤
export interface IStep {
  id: number;
  title: string;
  completed: boolean;
}

// 任务
export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
  createdAt: number; // 时间戳,避免 Date 序列化问题
  steps?: IStep[]; // 子任务步骤
}

// 排序方式
export type SortOrderType = "createdAt" | "important" | "title";
```

## 3. 需求细节与决策

- 描述是否必填？如何处理空输入？
- 已完成的任务在 UI 或 CLI 中如何显示？
- 任务排序逻辑（默认按创建时间，用户可选按优先级）。
- 如果涉及扩展功能（例如同步/提醒），简述设计思路。

### 任务创建

**Q: 任务描述是否必填?**

- **决策**：描述为可选项
- **理由**：有些任务标题已经足够明确，强制填写描述会影响用户体验，所以只要求标题必填
- **实现**：
  ```typescript
  rules={[{ whitespace: true, message: "任务描述不能为空格" }]}
  // 仅校验非空格,不校验必填
  ```

**Q: 如何处理空输入?**

- **决策**：使用表单验证 + trim() 处理，提交表单时通过定义的验证规则限制空白输入，并在提交前对再对输入进行 trim() 操作，去除多余空格
- **实现**：

  ```typescript
  // 1. 表单验证
  { required: true, message: "请输入任务标题" }
  { whitespace: true, message: "任务标题不能为空格" }

  // 2. 提交时 trim
  onAddTask(values.title.trim(), values.description?.trim() || "");
  ```

**Q: 任务 ID 如何生成?**

- **决策**：通过 `Date.now()` 生成时间戳作为 ID
- **理由**：
  - 简单可靠,无需引入额外的 UUID 库
  - 时间戳本身有序,方便按创建时间排序
  - 目前的单用户场景下不会冲突
- **潜在问题**：如果在同一毫秒内创建多个任务可能冲突
- **优化方案**：可改用 `Date.now() + Math.random()` 生成更唯一的 ID

### 任务显示

**Q: 已完成的任务如何显示?**

- **决策**：
  - 任务卡片整体降低不透明度(opacity: 0.6)
  - 标题添加删除线
  - 文字颜色变灰
  - 仍然显示在列表中,不隐藏
- **理由**：用户可能需要回顾已完成的任务，或取消完成状态，所以通过样式区分已完成任务，而不是隐藏
- **实现**：
  ```less
  &.completed {
    opacity: 0.6;
    .task-title {
      text-decoration: line-through;
      color: #999;
    }
  }
  ```

**Q: 文本溢出如何处理?**

- **决策**：使用 CSS `text-overflow: ellipsis` + Tooltip，只有溢出时才使用省略号显示，并通过 Tooltip 显示完整内容
- **实现**：

  ```typescript
  // 1. 使用 ref 检测是否溢出
  useEffect(() => {
    if (titleRef.current) {
      setIsTitleOverflow(
        titleRef.current.scrollWidth > titleRef.current.clientWidth
      );
    }
  }, [task.title]);

  // 2. 仅在溢出时显示 Tooltip
  <Tooltip title={isTitleOverflow ? task.title : ""}>
    <span ref={titleRef}>{task.title}</span>
  </Tooltip>;
  ```

### 任务排序

**Q: 排序逻辑是什么?**

- **支持的排序方式**：
  1. **创建时间**：按 `createdAt` 时间戳排序
  2. **重要性（优先级）**：重要任务排在前面
  3. **标题**：按字母顺序排序(使用 `localeCompare`)
- **支持正序/倒序切换**：用户根据需要，通过点击升序/降序按钮切换
- **默认排序**：创建时间升序(最早的在前)

**Q: 重要性排序如何处理未标记的任务?**

- **决策**：将 `important` 转为数字(1/0)进行比较
- **实现**：
  ```typescript
  if (sortOrder === "important") {
    res = (a.important ? 1 : 0) - (b.important ? 1 : 0);
  }
  ```
- **效果**：重要任务(1)排在普通任务(0)之前

### 搜索功能

**Q: 搜索范围?**

- **决策**：同时搜索任务标题和描述
- **实现**：
  ```typescript
  filtered = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(keyword) ||
      task.description?.toLowerCase().includes(keyword)
  );
  ```

**Q: 搜索是否区分大小写?**

- **决策**：不区分,统一转为小写比较
- **理由**：提升用户体验,避免因大小写匹配不上

**Q: 搜索性能优化?**

- **决策**：搜索框单独受控 + 防抖，用户输入立即响应，没有延迟感，并且对输入的内容做了防抖优化
- **延迟时间**：300ms
- **理由**：避免用户每输入一个字符就触发过滤,减少不必要的计算

### 批量操作

**Q: 批量模式下复选框的行为?**

- **决策**：
  - 普通模式：复选框用于标记任务完成状态
  - 批量模式：复选框用于选择任务(不改变完成状态)
- **实现**：通过 `isBatchMode` prop 控制复选框的 onChange 行为

**Q: 批量删除是否需要确认?**

- **决策**：需要，使用 Ant Design 的 `Modal.confirm`
- **理由**：防止误操作，导致批量数据丢失，删除是不可逆的
- **实现**：
  ```typescript
  Modal.confirm({
    title: "确认删除",
    content: `确定要删除选中的 ${selectedCount} 个任务吗？此操作不可撤销。`,
    onOk: onBatchDelete,
  });
  ```

### 子任务(步骤)功能

**Q: 为什么需要子任务?**

- **理由**：
  - 复杂任务需要分解为多个步骤，细致化任务管理
  - 追踪细节进度，提升完成感
  - 符合 GTD(Get Things Done)方法论

**Q: 子任务完成状态如何影响主任务?**

- **当前实现**：子任务和主任务完成状态独立，用户可能任务所设计的步骤完成后不代表主任务完成
- **可能的优化**：当所有子任务完成时，自动标记主任务为完成

## 4. AI 使用说明

### 使用的 AI 工具
- **Github Copilot**

### 使用 AI 的环节：
- **代码片段生成**：让 AI 辅助生成大部分的样式代码，保证 UI 美观的同时又提升开发效率；TS 类型定义；部分 React 组件骨架代码（代码补全）
- **优化建议**：例如任务排序、搜索过滤等功能的优化思路；一开始用原生的快速写一个 demo，后用 ai 帮忙接入 Antd 并进行组件拆分重构
- **Bug 定位**：让 ai 定位文本溢出 Tooltip 不显示的问题所在，并给出解决方案；以及 Modal 打开后输入框不自动聚焦
- **文档初稿编写**：让 AI 生成项目 README.md 初稿和当前 DOC.md 的大纲和部分内容，节省时间，再人工补充实际的技术细节

### AI 输出如何修改

#### 修改案例 1：数据持久化方案
  
**AI 初始建议**：使用 localStorage 直接在组件中读写

```typescript
// AI 生成的代码
const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

**人工优化**：封装为自定义 Hook

```typescript
// 优化后的代码
export const useTodoStorage = () => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const updateTasks = (newTasks: ITask[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return { tasks, updateTasks };
};
```

**优化理由**：

- 单独封装为一个 hooks，提高代码复用性
- 方便后续扩展(如添加错误处理、数据校验)和模块单独管理
- 符合 React Hooks 最佳实践

#### 修改案例 2：搜索功能实现

**AI 初始方案**：直接在 onChange 中过滤

```typescript
const handleSearch = (e) => {
  const keyword = e.target.value;
  setSearchKeyword(keyword);
  // 直接过滤,会频繁触发
};
```

**人工优化**：组件独立受控+添加防抖

```typescript
const { run: debouncedSearch } = useDebounceFn(
  (newValue: string) => {
    onChange(newValue);
  },
  { wait: 300 }
);

const handleChange = (e) => {
  const newValue = e.target.value;
  setInputValue(newValue); // 立即更新UI
  debouncedSearch(newValue); // 防抖后触发搜索
};
```

**优化理由**：

- 性能优化,避免频繁计算
- 提升用户体验，输入时无延迟感

#### 修改案例 3：任务创建时间的类型定义

**AI 初始方案**：使用 Date 类型作为创建时间的类型

```typescript
interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
  createdAt: Date; // 创建时间
  steps?: IStep[];
}
```

**人工修改**：使用时间戳

```typescript
interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  important?: boolean;
  createdAt: number; // 创建时间戳
  steps?: IStep[];
}
```

**修改理由**：

- 如果使用 Date 类型，存储到 localStorage 时会被序列化为字符串，读取后需要重新转换为 Date 对象，增加复杂度
- 时间戳在排序和比较时更方便
- 时间戳可以直接用于计算任务的创建时间


## 5. 运行与测试方式

- 本地运行方式（安装依赖、启动命令）。
- 已测试过的环境（例如 Node.js v20，macOS）。
- 已知问题与不足。

### 环境要求
- **Node.js**: >= 18.0.0 (推荐 20.x)
- **npm**: >= 9.0.0
- **浏览器**: 现代浏览器(Chrome 90+、Firefox 88+、Safari 14+、Edge 90+)

### 本地运行

#### 1. 克隆项目
```bash
git clone https://github.com/cheeseburgertony/todo-list.git
cd todo-list
```

#### 2. 安装依赖
```bash
npm install
```

#### 3. 启动开发服务器
```bash
npm run dev
```
- 应用将在 `http://localhost:5173` 启动
- 支持热模块替换(HMR),修改代码后自动刷新

#### 4. 构建生产版本
```bash
npm run build
```
- 输出目录：`dist/`
- 包含优化和压缩后的代码

#### 5. 预览生产构建
```bash
npm run preview
```
- 在本地预览生产版本
- 地址：`http://localhost:4173`

#### 6. 代码检查
```bash
npm run lint
```
- 使用 ESLint 检查代码规范
- 检查 TypeScript 类型错误

### 已测试的环境

#### 开发环境
- **操作系统**：Windows 11
- **Node.js 版本**：v20.11.0
- **npm 版本**：10.2.4
- **浏览器**：Chrome 120

#### 功能测试用例

| 功能模块 | 测试场景 | 测试结果 |
|---------|---------|----------|
| 任务创建 | 创建普通任务 | ✅ 通过 |
| 任务创建 | 标题为空提交 | ✅ 正确拦截 |
| 任务创建 | 标题为空格提交 | ✅ 正确拦截 |
| 任务创建 | Enter 键快速提交 | ✅ 通过 |
| 任务编辑 | 修改标题和描述 | ✅ 通过 |
| 任务编辑 | 添加/删除子任务 | ✅ 通过 |
| 任务操作 | 标记完成/取消完成 | ✅ 通过 |
| 任务操作 | 标记重要/取消重要 | ✅ 通过 |
| 任务操作 | 删除单个任务 | ✅ 通过 |
| 搜索功能 | 搜索标题 | ✅ 通过 |
| 搜索功能 | 搜索描述 | ✅ 通过 |
| 搜索功能 | 不区分大小写 | ✅ 通过 |
| 搜索功能 | 防抖优化 | ✅ 通过 |
| 排序功能 | 按创建时间排序 | ✅ 通过 |
| 排序功能 | 按重要性排序 | ✅ 通过 |
| 排序功能 | 按标题排序 | ✅ 通过 |
| 排序功能 | 升序/降序切换 | ✅ 通过 |
| 批量操作 | 选择多个任务 | ✅ 通过 |
| 批量操作 | 全选/取消选择 | ✅ 通过 |
| 批量操作 | 批量删除 | ✅ 通过 |
| 数据持久化 | 刷新页面数据保留 | ✅ 通过 |
| 数据持久化 | 清除缓存数据消失 | ✅ 符合预期 |
| UI 交互 | 文本溢出显示 Tooltip | ✅ 通过 |
| UI 交互 | 粘性头部固定 | ✅ 通过 |
| UI 交互 | 空状态提示 | ✅ 通过 |
| UI 交互 | 响应式布局 | ✅ 通过 |

### 已知问题与不足

#### 功能层面
1. **无多设备同步**
   - 问题：数据存储在 localStorage,不支持跨设备访问
   - 影响：用户更换设备后数据丢失
   - 解决方案：引入后端服务 + 用户认证系统

2. **无数据备份**
   - 问题：清除浏览器缓存会永久丢失数据
   - 影响：数据安全性低
   - 解决方案：
     - 短期：添加导出/导入功能(JSON 文件)
     - 长期：云端备份（数据库 + 后端服务）

3. **无任务提醒**
   - 问题：无法设置任务截止日期和提醒
   - 影响：时效性任务管理不便
   - 解决方案：
     - 添加截止日期字段
     - 使用 Notification API 或浏览器推送

4. **无任务分类/标签**
   - 问题：所有任务混在一起,分类管理不便
   - 影响：任务量大时查找困难
   - 解决方案：
     - 添加标签系统
     - 添加分类/文件夹功能

5. **无撤销操作**
   - 问题：删除任务后无法恢复
   - 影响：误删除时数据丢失
   - 解决方案：
     - 添加"回收站"功能
     - 实现操作历史和撤销功能

#### 性能层面
1. **大数据量性能**
   - 问题：任务数量超过 1000 时，过滤和排序可能卡顿
   - 当前优化：
     - 使用 `useMemo` 缓存计算结果
     - 搜索防抖优化
   - 进一步优化方案：
     - 虚拟滚动(react-window)
     - Web Worker 处理排序
     - 分页加载

2. **localStorage 容量限制**
   - 问题：localStorage 容量约 5-10MB
   - 影响：长期使用可能超出限制
   - 解决方案：
     - 引入云端存储/后端数据库

#### 用户体验层面
1. **移动端适配**
   - 问题：虽然使用了响应式设计,但移动端操作体验有待优化
   - 改进方向：
     - 手势操作(滑动删除)
     - 优化触摸热区
     - 移动端专用布局

2. **键盘快捷键**
   - 问题：缺少键盘快捷键
   - 改进方向：
     - `Ctrl/Cmd + N` 快速创建任务
     - `Ctrl/Cmd + F` 聚焦搜索框
     - `Delete` 删除选中任务


#### 技术债务
**错误处理不完善**
  - 问题：localStorage 读写失败时没有友好提示
  - 改进方向：
    - try-catch 包裹 localStorage 操作
    - 使用 Toast 提示错误信息

## 6. 总结与反思

### 如果有更多时间的改进方向
1. **引入后端服务**
   - 使用 Node.js + Express/Koa
   - 数据库选择 MongoDB 或 PostgreSQL
   - RESTful API 或 GraphQL

2. **用户认证系统**
   - 注册/登录功能
   - JWT Token 认证
   - 通过用户系统实现多设备同步

3. **任务提醒功能**
   - 添加截止日期字段和定时提醒
   - 使用 Notification API
   - 邮件/短信提醒(可选)

4. **标签和分类系统**
   - 自定义标签
   - 任务分类/文件夹
   - 标签筛选和搜索

5. **AI 辅助功能**
   - 针对主任务进行细致且可行性高的步骤拆分建议
   - 自动生成任务子任务
   - 自动分类和优先级

### 最大亮点
- **技术选型合理**：TypeScript + React + Vite + Ant Design 的组合，提升开发效率和代码质量
- **组件化设计**：清晰的模块划分，每个组件职责单一，易于维护和扩展
- **用户体验优化**：防抖搜索、文本溢出 Tooltip、粘性头部等细节提升整体体验
- **功能完善**：支持任务创建、编辑、删除、排序、搜索、批量操作等核心功能，以及子任务、任务详情等高级功能，满足大部分用户需求。
- **自动部署**：通过 Vercel 实现自动化部署，简化上线流程，提升迭代效率。
