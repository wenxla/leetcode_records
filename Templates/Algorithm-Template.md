<%*
const lc = await tp.user.leetcode(tp);
await tp.file.rename(`${lc.id}. ${lc.title}`);
-%>
---
tags:
  - type/algorithm
difficulty: <% lc.difficultyStars %>
category: <% tp.file.folder() %>
count: 1
leetcode_id: <% lc.id %>
leetcode_url: "<% lc.url %>"
date: <% tp.file.creation_date("YYYY-MM-DD") %>
revisit: false
key_point: ""
review: ""
---

# <% lc.id %>. <% lc.titleDisplay %>

> [LeetCode Link](<% lc.url %>) | Difficulty: **<% lc.difficulty %>** | Tags: <% lc.tags.join(", ") %>

## Problem

<% lc.content %>

## Thinking Process
<!-- Your first reaction, including wrong approaches -->
<% tp.file.cursor(1) %>

## Solution

### Approach 1:

**Time:** O()
**Space:** O()

```python

```

### Approach 2 (optional):

**Time:** O()
**Space:** O()

```python

```

## Pitfalls
<!-- Where you got stuck, WA reasons, edge cases -->


## Related
- Similar:
- Prerequisites:

## Takeaway
<!-- After solving, fill key_point and review in frontmatter -->
