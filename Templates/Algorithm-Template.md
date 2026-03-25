<%*
const source = await tp.system.suggester(
    ["LeetCode", "Other"],
    ["leetcode", "other"],
    false, "Problem source?"
);

let data = {};
const diff = await tp.system.suggester(["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"], [1, 2, 3, 4, 5], false, "Difficulty?");
if (source === "leetcode") {
    const lc = await tp.user.leetcode(tp);
    
    data = {
        id: lc.id,
        title: lc.title,
        difficulty: diff,
        difficultyRaw: lc.difficulty,
        tags: lc.tags,
        url: lc.url,
        content: lc.content,
    };
} else {
    data.title = await tp.system.prompt("Name?");
    data.id = await tp.system.prompt("ID? (optional)", "");
    data.difficulty = diff;
    data.difficultyRaw = "";
    data.url = await tp.system.prompt("Link? (optional)", "");
    data.tags = [];
    data.content = "";
}

const displayName = data.id ? `${data.id}. ${data.title}` : data.title;

// 检查是否已存在
const existing = tp.file.find_tfile(displayName);
if (existing) {
    const action = await tp.system.suggester(
        ["Jump to existing file", "Cancel"],
        ["jump", "cancel"],
        false, `「${displayName}」already exists`
    );

    if (action === "jump") {
        await app.workspace.getLeaf().openFile(existing);
        await app.vault.trash(tp.config.target_file, true);
        return;
    } else {
        await app.vault.trash(tp.config.target_file, true);
        return;
    }
}

await tp.file.rename(displayName);

// category: 如果有 tags 就弹选择框
let category = "";
if (data.tags.length > 0) {
	const input = await tp.system.prompt( "Category? (删掉不要的, -分隔)", data.tags.join(", ") ); 
	category = input ? input.split(",").map(s => "\n - " + s.trim()).join("") : "";;
}
-%>
---
tags:
  - type/algorithm
difficulty: <% data.difficulty %>
category: <% category %>
count: 1
important: false
leetcode_id: "<% data.url ? '[' + data.id + '](' + data.url + ')' : data.id %>"
url: "<% data.url %>"
date: <% tp.file.creation_date("YYYY-MM-DD") %>
revisit: false
key_point: ""
review: ""

---

# <% data.id ? data.id + ". " : "" %><% data.title %>

> <% data.url ? "[LeetCode Link](" + data.url + ") | " : "" %>Difficulty: **<% data.difficultyRaw %>**<% data.tags.length > 0 ? " | Tags: " + data.tags.join(", ") : "" %>

## Problem


## Thinking Process
<!-- Your first reaction, including wrong approaches -->

## Solution


## Pitfalls
<!-- Where you got stuck, WA reasons, edge cases -->


## Related
- Similar:
- Prerequisites:

## Takeaway
<!-- After solving, fill key_point and review in frontmatter -->

### Approach code:
**Time:** O()
**Space:** O()
```dataviewjs
// 填入你 Java 文件的相对路径
const path = "resources/leethub/.java"; 

// 读取文件内容并拼接成 Markdown 代码块
const content = await app.vault.adapter.read(path);
dv.paragraph("```java\n" + content + "\n```");
```