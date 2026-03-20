# Obsidian + LeetPush 双仓库配置教程

## 整体架构

```
你的 Obsidian Vault/                    ← 母仓库 (vault-repo)
├── .git/
├── .gitmodules
├── 其他笔记/
└── leetcode/
    ├── Algorithm-Dashboard.md
    ├── Algorithm-Template.md
    └── resources/                      ← 子仓库 (leetcode-repo)
        ├── .git/
        ├── 1. Two Sum.md
        ├── 15. 3Sum.md
        └── ...
```

母仓库管你所有的 Obsidian 笔记，子仓库只存 LeetPush 自动生成的题目笔记。
两个仓库各自独立推送，互不干扰。

---

## 前置条件

- Git 已安装
- Python 3.10+
- GitHub 账号
- Obsidian 已安装 Obsidian Git 插件

---

## 第一步：创建两个 GitHub 仓库

在 GitHub 上创建两个仓库：

1. **vault-repo**（私有）— 存你的整个 Obsidian vault
2. **leetcode-repo**（私有）— 存 LeetPush 生成的题目笔记

创建时都不要勾选 "Add a README"，保持空仓库。

---

## 第二步：初始化母仓库

如果你的 vault 还不是 git 仓库：

```bash
cd ~/你的vault路径
git init
git remote add origin https://github.com/你的用户名/vault-repo.git
```

创建 `.gitignore`（排除不需要同步的内容）：

```bash
cat > .gitignore << 'EOF'
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.trash/
.DS_Store
EOF
```

做一次初始提交：

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

## 第三步：添加子仓库（submodule）

先在 GitHub 上确认 leetcode-repo 是空的，然后：

```bash
cd ~/你的vault路径

# 创建 leetcode 目录（如果还没有的话）
mkdir -p leetcode

# 添加子仓库
git submodule add https://github.com/你的用户名/leetcode-repo.git leetcode/resources
```

这会：
- 克隆 leetcode-repo 到 `leetcode/resources/`
- 生成 `.gitmodules` 文件
- 在母仓库记录一个指向子仓库的指针

提交这个变更：

```bash
git add .gitmodules leetcode/resources
git commit -m "Add leetcode-repo as submodule"
git push
```

---

## 第四步：配置 LeetPush 脚本

把 `leetpush.py` 放到任意位置（比如 `~/leetpush/`）：

```bash
mkdir -p ~/leetpush
# 把 leetpush.py 复制到这里
```

第一次运行生成配置文件：

```bash
cd ~/leetpush
python3 leetpush.py
```

编辑生成的 `config.json`：

```json
{
  "vault_path": "~/你的vault路径/leetcode",
  "resources_subdir": "resources",
  "auto_git_push": true,
  "language": "python",
  "site": "com"
}
```

关键：`vault_path` + `resources_subdir` 拼起来就是子仓库的路径。

设置终端别名（可选但推荐）：

```bash
# 加到 ~/.zshrc 或 ~/.bashrc
echo 'alias lp="python3 ~/leetpush/leetpush.py"' >> ~/.zshrc
source ~/.zshrc
```

---

## 第五步：配置 Obsidian Git 插件

打开 Obsidian → Settings → Community Plugins → Obsidian Git → 设置：

| 设置项 | 推荐值 | 说明 |
|--------|--------|------|
| Auto pull interval | 10 | 每 10 分钟自动 pull |
| Pull before push | ✅ 开启 | 防止和子仓库冲突 |
| Auto commit interval | 10 | 每 10 分钟自动 commit |
| Auto push after commit | ✅ 开启 | commit 后自动 push |
| Pull submodules | ✅ 开启 | pull 时同步子仓库 |

这样 Obsidian Git 会自动管理母仓库的同步，并且在 pull 时也更新子仓库内容。

---

## 第六步：测试一下

```bash
lp https://leetcode.com/problems/two-sum/
```

预期输出：

```
📡 正在获取题目信息: two-sum ...
   #1 Two Sum | Easy | Array, Hash Table
✅ 笔记已创建: ~/vault/leetcode/resources/1. Two Sum.md
🚀 已推送到 GitHub: Add 1. Two Sum (Easy)
```

然后检查：

```bash
# 子仓库有新 commit
cd ~/你的vault路径/leetcode/resources
git log --oneline -1
# 应该看到: Add 1. Two Sum (Easy)

# 母仓库检测到子仓库指针变化
cd ~/你的vault路径
git status
# 应该看到: modified: leetcode/resources (new commits)
```

在 Obsidian 中打开 `leetcode/resources/1. Two Sum.md` 确认内容正常。

---

## 日常使用流程

```
1. 打开 LeetCode，选一道题
2. 终端运行: lp <链接>
3. 打开 Obsidian，笔记已经在 leetcode/resources/ 下了
4. 做题，在笔记的 Thinking Process / Pitfalls / Takeaway 里记录
5. Obsidian Git 自动 commit + push 母仓库
```

第 2 步会自动 push 子仓库，第 5 步 Obsidian Git 会自动 push 母仓库。
两个仓库各管各的，你不需要手动执行任何 git 命令。

---

## 常见问题

### Q: 母仓库总是显示 `leetcode/resources` 有变化？

正常现象。每次子仓库有新 commit，母仓库的指针就会更新。
Obsidian Git 会自动帮你 commit 这个变化。如果你不想频繁看到这个提示，
可以在 Obsidian Git 设置里把 auto commit 打开就行，它会自动处理。

### Q: 换电脑了怎么恢复？

```bash
# clone 母仓库（--recurse-submodules 会自动拉取子仓库）
git clone --recurse-submodules https://github.com/你的用户名/vault-repo.git
```

一条命令搞定，两个仓库都会恢复。

### Q: 子仓库 pull 不到最新内容？

```bash
cd ~/你的vault路径/leetcode/resources
git pull origin main
```

### Q: 想删掉 submodule 怎么办？

```bash
cd ~/你的vault路径
git submodule deinit leetcode/resources
git rm leetcode/resources
rm -rf .git/modules/leetcode/resources
git commit -m "Remove leetcode submodule"
```
