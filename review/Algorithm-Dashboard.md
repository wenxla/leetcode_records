---
tags:
  - type/dashboard
---

# Algorithm Dashboard

## Overview

### By Difficulty (Individual Files)
````dataview
TABLE length(rows) AS "Count"
FROM #type/algorithm
GROUP BY difficulty AS "Difficulty"
SORT difficulty ASC
````

### By Difficulty (Easy Collection)
````dataview
TABLE length(rows.problem) AS "Count"
FROM #type/algorithm-collection
FLATTEN file.lists AS item
WHERE item.problem
GROUP BY item.difficulty AS "Difficulty"
````

### By Category
````dataview
TABLE length(rows) AS "Count"
FROM #type/algorithm
GROUP BY category
SORT length(rows) DESC
````

---

## Quick Review: Key Points + Takeaways

### Individual Problems
````dataview
TABLE key_point AS "Key Point", review AS "Takeaway", difficulty AS "Diff", category AS "Category"
FROM #type/algorithm
SORT date DESC
````

### Easy Collection
````dataview
TABLE item.problem AS "Problem", item.leetcode_id AS "ID", item.key_point AS "Key Point"
FROM #type/algorithm-collection
FLATTEN file.lists AS item
WHERE item.problem
````

---

## Needs Revisit
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff", category AS "Category", date AS "Date"
FROM #type/algorithm
WHERE revisit = true
SORT date ASC
````

---

## Recent
````dataview
TABLE leetcode_id AS "ID", key_point AS "Key Point", difficulty AS "Diff", category AS "Category"
FROM #type/algorithm
SORT date DESC
LIMIT 20
````

---

## By Category

### Array / String
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Array" OR category = "String"
SORT difficulty ASC
````

#### Easy - Array / String
````dataview
TABLE item.problem AS "Problem", item.key_point AS "Key Point"
FROM #type/algorithm-collection
FLATTEN file.lists AS item
WHERE item.problem AND (this.category = "Array" OR this.category = "String")
````

### Linked List
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Linked List"
SORT difficulty ASC
````

### Tree / Graph
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Tree" OR category = "Graph"
SORT difficulty ASC
````

### Dynamic Programming
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "DP"
SORT difficulty ASC
````

### Two Pointers / Sliding Window
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Two Pointers" OR category = "Sliding Window"
SORT difficulty ASC
````

### Stack / Queue
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Stack" OR category = "Queue"
SORT difficulty ASC
````

### Binary Search
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Binary Search"
SORT difficulty ASC
````

### Backtracking
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Backtracking"
SORT difficulty ASC
````

### Greedy
````dataview
TABLE key_point AS "Key Point", difficulty AS "Diff"
FROM #type/algorithm
WHERE category = "Greedy"
SORT difficulty ASC
````

