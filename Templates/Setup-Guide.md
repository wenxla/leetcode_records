# LeetCode × Obsidian 自动化设置指南

## 文件说明

| 文件 | 用途 | 放置位置 |
|------|------|----------|
| `leetcode.js` | Templater 用户脚本，自动抓取题目信息 | Templater User Script 文件夹 |
| `Algorithm-Template.md` | 更新后的题目模板 | 你的模板文件夹 |

## 设置步骤

### 1. 配置 Templater User Script 文件夹

1. 在 vault 中创建一个文件夹，比如 `_scripts/`
2. 打开 **Settings → Templater → User Script Functions Folder**
3. 设置为 `_scripts`

### 2. 放置文件

- 把 `leetcode.js` 放入 `_scripts/` 文件夹
- 把 `Algorithm-Template.md` 放入你的模板文件夹（替换原来的模板）

### 3. 使用方式

1. 在你的 leetcode 文件夹下新建笔记，选择 Algorithm-Template
2. 弹出输入框 → 粘贴 LeetCode 链接（如 `https://leetcode.com/problems/two-sum/`）
3. 自动完成：
   - 文件自动重命名为 `1. Two Sum`
   - 填入题号、标题、难度（星级）、标签
   - 填入题目描述（已转为 Markdown）
   - 生成 LeetCode 原题链接
   - 光标定位到 Thinking Process 区域，直接开始写

## 支持的链接格式

- `https://leetcode.com/problems/two-sum/`
- `https://leetcode.com/problems/two-sum/description/`
- `https://leetcode.cn/problems/two-sum/`（力扣中国站，自动使用中文标题和描述）

## 自动填入的字段

| 字段 | 来源 | 示例 |
|------|------|------|
| 文件名 | API | `1. Two Sum` |
| `leetcode_id` | API | `1` |
| `difficulty` | API → 映射 | Easy→⭐, Medium→⭐⭐⭐, Hard→⭐⭐⭐⭐⭐ |
| `leetcode_url` | 输入的 URL | 完整链接 |
| Tags | API | `Array, Hash Table` |
| Problem 描述 | API → HTML转MD | 完整题目内容 |

## 注意事项

- 需要网络连接（调用 LeetCode GraphQL API）
- 如果力扣中国站有访问限制，可能需要先在浏览器中登录 leetcode.cn
- 难度星级映射可以在 `leetcode.js` 的 `difficultyStars` 中自定义
- 如果你的 Obsidian vault 目录结构中用 category 来区分类型（如 Array、DP），
  模板默认用 `tp.file.folder()` 作为 category，和你原来的逻辑一致
