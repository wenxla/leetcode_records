# Python LeetCode Cheat Sheet

## 基础数据结构

### List

```python
# 初始化
arr = [0] * n                    # n 个 0
arr = [0 for _ in range(n)]      # 同上
matrix = [[0] * n for _ in range(m)]  # m×n 矩阵，不要用 [[0]*n]*m（浅拷贝坑）

# 常用操作
arr.append(x)         # 尾部添加 O(1)
arr.pop()             # 弹出尾部 O(1)
arr.pop(0)            # 弹出头部 O(n)，频繁用请换 deque
arr.insert(i, x)      # 在 i 处插入 O(n)
arr.remove(x)         # 删除第一个 x O(n)
arr.index(x)          # 第一个 x 的下标，不存在会报错
arr.reverse()         # 原地反转
arr.sort()            # 原地排序
arr.sort(key=lambda x: x[1])  # 按第二个元素排序
sorted(arr)           # 返回新数组，不改原数组
arr[::-1]             # 反转副本
arr[i:j]              # 切片 [i, j)

# 解构
a, b, c = [1, 2, 3]
first, *rest = [1, 2, 3, 4]   # first=1, rest=[2,3,4]

# 常用技巧
min(arr), max(arr), sum(arr)
len(arr)
x in arr              # O(n)，频繁查找请用 set
```

### String

```python
# 不可变，拼接用 join
s = "hello"
s[0]           # 'h'
s[1:3]         # 'el'
s[::-1]        # 'olleh' 反转

# 常用方法
s.lower(), s.upper()
s.strip()                  # 去两端空白
s.split(" ")               # 按空格分割
s.replace("old", "new")
s.startswith("he"), s.endswith("lo")
s.isdigit(), s.isalpha(), s.isalnum()
s.find("ll")              # 返回 2，找不到返回 -1
s.count("l")              # 出现次数

# 字符串拼接
"".join(["a", "b", "c"])   # "abc"
" ".join(words)             # 用空格连接

# 字符与 ASCII
ord('a')       # 97
chr(97)        # 'a'
ord(c) - ord('a')  # 字母转 0-25 下标
```

### Dict (HashMap)

```python
d = {}
d = {"a": 1, "b": 2}

d[key] = value
d.get(key, default)       # key 不存在返回 default，不会报错
d.setdefault(key, []).append(val)  # key 不存在就初始化为 []

key in d                  # O(1)
del d[key]
d.pop(key, default)       # 删除并返回

# 遍历
for k in d:               # 遍历 key
for k, v in d.items():    # 遍历 key-value
for v in d.values():      # 遍历 value

# defaultdict：自动初始化
from collections import defaultdict
d = defaultdict(int)      # 默认值 0
d = defaultdict(list)     # 默认值 []
d = defaultdict(set)      # 默认值 set()

# Counter：计数
from collections import Counter
cnt = Counter("aabbc")    # {'a': 2, 'b': 2, 'c': 1}
cnt = Counter([1,1,2,3])  # {1: 2, 2: 1, 3: 1}
cnt.most_common(2)        # 前 2 个高频元素
cnt[key]                  # 不存在返回 0，不会报错
```

### Set

```python
s = set()
s = {1, 2, 3}

s.add(x)           # O(1)
s.remove(x)        # 不存在会报错
s.discard(x)       # 不存在不报错
x in s             # O(1)

# 集合运算
a & b              # 交集
a | b              # 并集
a - b              # 差集
a ^ b              # 对称差集（在 a 或 b 中但不同时在）
```

### Tuple

```python
t = (1, 2, 3)
t[0]               # 1
a, b = (1, 2)      # 解构

# 可以作为 dict 的 key 和 set 的元素（list 不行）
visited = set()
visited.add((r, c))
```

---

## 常用标准库

### heapq（最小堆 / 优先队列）

```python
import heapq

# Python 默认是最小堆
heap = []
heapq.heappush(heap, val)       # 入堆
heapq.heappop(heap)             # 弹出最小值
heap[0]                         # 查看最小值（不弹出）

# 最大堆：取负
heapq.heappush(heap, -val)
-heapq.heappop(heap)

# 从数组建堆 O(n)
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)

# Top K
heapq.nlargest(k, arr)
heapq.nsmallest(k, arr)

# 自定义排序：推入 tuple
heapq.heappush(heap, (priority, index, value))
```

### deque（双端队列）

```python
from collections import deque

q = deque()
q.append(x)        # 右端入 O(1)
q.appendleft(x)    # 左端入 O(1)
q.pop()             # 右端弹 O(1)
q.popleft()         # 左端弹 O(1)
q[0]                # 左端查看
q[-1]               # 右端查看
len(q)

# 常用于 BFS 和滑动窗口
```

### sorted / 自定义排序

```python
# 按 key 排序
sorted(arr, key=lambda x: x[1])
sorted(arr, key=lambda x: -x)          # 降序
sorted(arr, key=lambda x: (x[0], -x[1]))  # 先按第一个升序，再按第二个降序

# 自定义比较（不常用但偶尔需要）
from functools import cmp_to_key
def compare(a, b):
    if a + b > b + a: return -1   # a 排前面
    return 1
sorted(arr, key=cmp_to_key(compare))
```

### bisect（二分查找）

```python
import bisect

# arr 必须是已排序的
bisect.bisect_left(arr, x)    # x 应插入的最左位置（第一个 >= x）
bisect.bisect_right(arr, x)   # x 应插入的最右位置（第一个 > x）
bisect.insort(arr, x)         # 插入并保持有序

# 查找 x 是否存在
i = bisect.bisect_left(arr, x)
found = i < len(arr) and arr[i] == x
```

### itertools

```python
from itertools import combinations, permutations, product, accumulate

list(combinations([1,2,3], 2))    # [(1,2), (1,3), (2,3)]
list(permutations([1,2,3], 2))    # [(1,2), (1,3), (2,1), ...]
list(product([0,1], repeat=3))    # [(0,0,0), (0,0,1), ...]

# 前缀和
list(accumulate([1,2,3,4]))       # [1, 3, 6, 10]
```

### math

```python
import math

math.inf                # 正无穷
-math.inf               # 负无穷
float('inf')            # 同上

math.ceil(3.2)          # 4
math.floor(3.8)         # 3
math.log2(8)            # 3.0
math.gcd(12, 8)         # 4
math.lcm(4, 6)          # 12（Python 3.9+）
math.sqrt(16)           # 4.0
math.isqrt(16)          # 4（整数平方根）
```

---

## 算法常用模式

### 双指针

```python
# 相向双指针（如 Two Sum sorted）
left, right = 0, len(arr) - 1
while left < right:
    s = arr[left] + arr[right]
    if s == target:
        return [left, right]
    elif s < target:
        left += 1
    else:
        right -= 1

# 同向双指针 / 快慢指针（如去重）
slow = 0
for fast in range(len(arr)):
    if arr[fast] != arr[slow]:
        slow += 1
        arr[slow] = arr[fast]
```

### 滑动窗口

```python
# 模板：可变长度窗口
left = 0
window = defaultdict(int)
res = 0

for right in range(len(s)):
    window[s[right]] += 1

    while 窗口不满足条件:
        window[s[left]] -= 1
        if window[s[left]] == 0:
            del window[s[left]]
        left += 1

    res = max(res, right - left + 1)
```

### 二分查找

```python
# 查找目标值
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# 查找左边界（第一个 >= target）
def lower_bound(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo

# 查找答案（最小化/最大化类）
def binary_search_answer(lo, hi):
    while lo < hi:
        mid = (lo + hi) // 2
        if check(mid):      # mid 满足条件
            hi = mid         # 找更小的
        else:
            lo = mid + 1
    return lo
```

### BFS

```python
from collections import deque

def bfs(grid, start):
    rows, cols = len(grid), len(grid[0])
    q = deque([start])
    visited = {start}

    while q:
        r, c = q.popleft()

        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited and grid[nr][nc] != 1:
                visited.add((nr, nc))
                q.append((nr, nc))

# 层序遍历（需要知道第几层）
level = 0
while q:
    for _ in range(len(q)):    # 这一层的所有节点
        node = q.popleft()
        ...
    level += 1
```

### DFS

```python
# 递归 DFS（图/网格）
def dfs(grid, r, c, visited):
    if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
        return
    if (r, c) in visited or grid[r][c] == 1:
        return

    visited.add((r, c))
    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
        dfs(grid, r + dr, c + dc, visited)

# 迭代 DFS（用 stack）
stack = [start]
visited = {start}
while stack:
    node = stack.pop()
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            stack.append(neighbor)
```

### 回溯

```python
def backtrack(path, choices):
    if 满足结束条件:
        result.append(path[:])   # 注意要拷贝
        return

    for choice in choices:
        if choice 不合法:
            continue
        path.append(choice)      # 做选择
        backtrack(path, 新的choices)
        path.pop()               # 撤销选择

result = []
backtrack([], initial_choices)
```

### 动态规划

```python
# 一维 DP
dp = [0] * (n + 1)
dp[0] = base_case
for i in range(1, n + 1):
    dp[i] = 转移方程

# 二维 DP
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1):
    for j in range(1, n + 1):
        dp[i][j] = 转移方程

# 空间优化：滚动数组（二维降一维）
dp = [0] * (n + 1)
for i in range(1, m + 1):
    prev = dp[:]         # 或者用两个一维数组交替
    for j in range(1, n + 1):
        dp[j] = ...

# 记忆化搜索（等价于 DP，有时更直观）
from functools import lru_cache

@lru_cache(maxsize=None)
def dp(i, j):
    if base case:
        return ...
    return 转移方程
```

### 前缀和

```python
# 一维前缀和
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + arr[i]

# 区间和 [l, r]
range_sum = prefix[r + 1] - prefix[l]

# 二维前缀和
prefix = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(m):
    for j in range(n):
        prefix[i+1][j+1] = grid[i][j] + prefix[i][j+1] + prefix[i+1][j] - prefix[i][j]
```

### 单调栈

```python
# 下一个更大元素
stack = []
result = [-1] * n
for i in range(n):
    while stack and arr[i] > arr[stack[-1]]:
        result[stack.pop()] = arr[i]
    stack.append(i)
```

### Union-Find（并查集）

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # 路径压缩
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True
```

### Trie（前缀树）

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True
```

---

## 树

### 定义 & 遍历

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 前序 中序 后序（递归）
def preorder(root):
    if not root: return
    print(root.val)         # 前序：根-左-右
    preorder(root.left)
    preorder(root.right)

def inorder(root):
    if not root: return
    inorder(root.left)
    print(root.val)         # 中序：左-根-右
    inorder(root.right)

def postorder(root):
    if not root: return
    postorder(root.left)
    postorder(root.right)
    print(root.val)         # 后序：左-右-根

# 层序遍历
def level_order(root):
    if not root: return []
    q = deque([root])
    result = []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result
```

### 迭代遍历

```python
# 前序（迭代）
def preorder_iter(root):
    stack, res = [root], []
    while stack:
        node = stack.pop()
        if not node: continue
        res.append(node.val)
        stack.append(node.right)  # 先右后左，因为栈 LIFO
        stack.append(node.left)
    return res

# 中序（迭代）
def inorder_iter(root):
    stack, res = [], []
    cur = root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        res.append(cur.val)
        cur = cur.right
    return res
```

---

## 链表

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# dummy head 技巧（简化头节点操作）
dummy = ListNode(0)
dummy.next = head
# ... 操作完后返回 dummy.next

# 反转链表
def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev

# 快慢指针找中点
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
# slow 就是中点（偶数个时偏右）

# 检测环
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        return True
return False
```

---

## 图

```python
# 邻接表建图
from collections import defaultdict
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)     # 无向图

# 拓扑排序（BFS / Kahn）
from collections import deque
def topo_sort(n, edges):
    graph = defaultdict(list)
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    q = deque([i for i in range(n) if indegree[i] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                q.append(nei)

    return order if len(order) == n else []  # 空 = 有环

# Dijkstra（最短路径）
import heapq
def dijkstra(graph, start, n):
    dist = [float('inf')] * n
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist
```

---

## Python 易错点

```python
# 1. 整除：用 // 而不是 /
7 // 2          # 3（整数）
7 / 2           # 3.5（浮点）
-7 // 2         # -4（Python 向下取整，不是向零）
int(-7 / 2)     # -3（向零取整，LeetCode 通常要这个）

# 2. 深拷贝 vs 浅拷贝
arr2 = arr[:]              # 一维浅拷贝够用
import copy
arr2 = copy.deepcopy(arr)  # 多维数组要深拷贝

# 3. 矩阵初始化陷阱
wrong = [[0] * n] * m      # 所有行是同一个引用！改一行全变
right = [[0] * n for _ in range(m)]

# 4. 可变默认参数
def bad(arr=[]):     # 所有调用共享同一个 []
    arr.append(1)
def good(arr=None):  # 正确写法
    if arr is None: arr = []

# 5. 字符串不可变
s = "hello"
# s[0] = "H"       # 报错
s = "H" + s[1:]     # 新建字符串

# 6. for 循环里不要修改正在遍历的 list
# 要删元素就遍历副本或倒着遍历

# 7. 比较
a is b       # 同一个对象（地址）
a == b       # 值相等
# 比较 None 用 is：if x is None

# 8. 全局变量在递归里
# 用 nonlocal 或者传参，不要直接改外层变量
def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
```

---

## 位运算

```python
n & 1           # 判断奇偶（等价 n % 2）
n >> 1          # 除以 2
n << 1          # 乘以 2
n & (n - 1)     # 去掉最低位的 1
n | (1 << i)    # 第 i 位设为 1
n & (1 << i)    # 检查第 i 位
n ^ n == 0      # 相同数异或为 0
bin(n).count('1')  # 数 1 的个数
```

---

## 实用技巧

```python
# enumerate
for i, val in enumerate(arr):
    print(i, val)

# zip
for a, b in zip(arr1, arr2):
    print(a, b)

# any / all
any(x > 0 for x in arr)    # 有一个满足就 True
all(x > 0 for x in arr)    # 全部满足才 True

# 三元表达式
x = a if condition else b

# 无穷大
INF = float('inf')

# 交换
a, b = b, a

# 字典推导 / 列表推导
squares = [x ** 2 for x in range(10)]
even = [x for x in arr if x % 2 == 0]
d = {k: v for k, v in pairs}

# map
list(map(int, input().split()))   # 读入一行数字

# 打印调试
print(f"{i=}, {arr=}")   # Python 3.8+ f-string 调试
```
