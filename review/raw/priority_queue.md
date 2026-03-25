---
tags:
  - type/algorithm
difficulty: 2
category:
  - heap
  - Priority_queue
count: 1
leetcode_id: ""
url: ""
date: 2026-03-20
revisit: false
key_point: 删除时用最后一个元素替换第一个元素。注意判断越界
review: ""
---

# priority_queue

> Difficulty: ****

## Describe


Priority queues are implemented using min-heaps and max-heaps.
A min-heap is a complete binary tree that satisfies one rule: the value of each node is ≤ the values of all its child nodes. Therefore, the top of the heap (the root node) is always the smallest element, and retrieving this minimum value takes **O(1)** time
The core of a min-heap comes down to two rules:
- **Complete Binary Tree:** Every level is filled completely from left to right. The last level may not be full, but all of its nodes must be placed as far left as possible.
- **Heap Property:** Every node is ≤ all of its child nodes.
![[min_heap_structure.svg|605]]

Because of this, the root node is always the minimum value, making the retrieval of the minimum O(1). Insertion and deletion take **O(log n)** time because the tree must be adjusted up or down to maintain this property.
heap uses an array to store this tree, for example: `[1, 3, 2, 5, 7, 4, 6]`. For a node at index `i`:
- The **left child** is at `2i + 1`
- The **right child** is at `2i + 2`
- The **parent node** is at `(i - 1) // 2`
**Insertion:** The new element is appended to the very end of the array, and then it "bubbles up" (or sifts up) through comparisons. 
**Deletion:** The first number (the root) is overwritten by the very last number in the array, and then it "bubbles down" (or sifts down) through comparisons

###  Complexity

|Operation|Time|Why|
|---|---|---|
|peek|O(1)|root is arr[0]|
|offer|O(log n)|sift up, tree height = log n|
|poll|O(log n)|sift down, tree height = log n|
|heapify|O(n)|bottom-up sift down

## Thinking Process
<!-- Your first reaction, including wrong approaches -->

## Solution

### Approach:
**Time:** O()
**Space:** O()'


```java

```

## Pitfalls
<!-- Where you got stuck, WA reasons, edge cases -->


## Related
- Similar:
- Prerequisites:

## Takeaway
<!-- After solving, fill key_point and review in frontmatter -->
