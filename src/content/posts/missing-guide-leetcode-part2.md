---
title: "The Trap of 'Optimal' (The Missing Guide, Part II)"
slug: "missing-guide-leetcode-part2"
description: "Every 'best' solution chose what to sacrifice. It just never told you."
publicationDate: 2026-03-04
category: "Story"
public: true
author: "Zheng Shi"
---

<span style="color:gray; font-style:italic;">"The most dangerous word in problem solving isn't 'hard.' It's 'optimal.'"</span>

<br>

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">📖</span> 
    <span><b>TL;DR:</b> There is no "optimal" solution. Every solution optimizes along one axis (time, space, precision, predictability) at the expense of others. The Leetcode ecosystem teaches you there's one best answer. Real problem solving is about choosing which axis matters and reasoning about the tradeoffs.</span> 
</div>

<br>

In [Part I](/blog/missing-guide-leetcode), I wrote about how Leetcode trains you to search your memory instead of reason from the problem. That post was about solving problems *correctly*: understand the contract, propose hypotheses, find the invariant.

This post is about what comes after. You solved the problem. Now you need to evaluate your solution. And this is where things get interesting.

Every Leetcode problem has a hierarchy. Brute force at the bottom, "optimal" at the top. You grind until you reach the top. The entire ecosystem reinforces this: editorial solutions labeled "Optimal Approach," countless YouTube videos and blog posts ranking solutions from brute force to optimal, discussion boards where someone always posts a one-liner that runs in O(n) and makes you feel stupid.

The assumption underneath all of this is so deeply embedded that most people never examine it: **for every problem, there exists one best solution, and your job is to find it.**

There is no such thing as *the* optimal solution. There are only tradeoffs you've chosen to make, whether you realize it or not. Every "optimal" solution on Leetcode implicitly chose what to optimize for and what to sacrifice. It just never told you it made that choice.

## "Optimal" Always Has a Hidden Axis

Think about what happens when someone labels a Leetcode solution "optimal." Almost always, they mean it has the best time complexity. Maybe they'll mention space as a secondary note. But that's it. The word "optimal" collapses an entire world of considerations into a single axis: how fast does it run in the worst case?

That's a choice. And it's not the only one you could make.

Time complexity, space complexity, precision, predictability, maintainability, extensibility, worst case vs. average case, per-iteration cost vs. total cost. These are all axes you could optimize along. But you can only be good on one (or maybe two) at the expense of the others. That's what a tradeoff is. The Leetcode ecosystem just trained you to see only one axis, and it called that axis "optimal" as if no other axes existed.

Once you see this, you can't unsee it.

## The Evidence Is Everywhere

Let me walk through three examples from real engineering and research. Each one shows a different axis being quietly traded away.

### The Algorithm That Should Be Terrible But Isn't

If you've taken an algorithms or optimization course, you've probably heard of the Simplex method. George Dantzig invented it in 1947 to solve linear programming problems. It's one of the most widely used algorithms in history: logistics, supply chains, scheduling, resource allocation. It powers enormous parts of the global economy.

Its worst case complexity is exponential. In 1972, Klee and Minty constructed an adversarial input that makes Simplex traverse an exponential number of vertices. By the Big-O standard that Leetcode teaches, this algorithm is terrible.

In practice? It's incredibly fast. Problems with thousands of variables and constraints get solved routinely. Dantzig himself was surprised by this. For decades, mathematicians couldn't even explain *why* it was fast, until smoothed analysis came along and gave a more realistic framework.

Here's the tradeoff nobody talks about: Simplex is "suboptimal" on the worst case axis but dominant on the practical performance axis. Interior point methods, which do have polynomial worst case bounds, exist. Sometimes they win on large-scale problems. But for most practical use cases, Simplex is the choice. The "theoretically better" algorithm isn't necessarily the better algorithm.

If you only evaluate along the worst case axis, you'd never pick Simplex. You'd be wrong.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😎</span> 
    <span>The Leetcode mindset says: exponential bad, polynomial good. The engineering mindset says: which one actually solves my problem faster? Those are different questions, and they have different answers.</span> 
</div>

<br>

### The "Correct" Answer That Blew Up Production

This one I learned the hard way.

I was working on a time series analytics system that used ClickHouse. The team had built a customized query language to make it easier for customers and internal SMEs to run analyses. Things were working fine until queries started erroring out. A lot of them.

The problem: many queries were computing the median over six months of data. Computing an exact median requires storing all the values, sorting or partitioning them, and returning the middle one. That's O(n) time and O(n) space. Textbook correct. Textbook "optimal."

Each of those queries was consuming around 2GB of memory. Multiply that by concurrent users, and the system was blowing up.

The fix was an approximate algorithm called TDigest. It computes an approximate median using O(log n) space. The result isn't exact. For most queries, the error was negligible, well within the tolerance that any business decision would care about.

Here's what happened: we moved to *better* space complexity but *sacrificed* precision. The "optimal" exact solution was optimal on the correctness axis. TDigest was optimal on the "system doesn't crash" axis. Guess which one mattered more.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>Linear space sounds great on a whiteboard. It sounds less great when each query takes 2GB and you have a hundred users running queries at once. "Optimal" in what context? That's the question nobody asked until production answered it for us.</span> 
</div>

<br>

### The Paper That Worked but Couldn't "Prove" It

I co-authored a paper proposing a variant of a well-known stochastic optimization method for training ML models. Our variant solved an auxiliary subproblem each epoch, which gave it a different convergence profile. The reviewers saw "subproblem per epoch" and immediately flagged it as expensive. "That's too costly."

On the per-iteration cost axis, they were right. Each epoch was more expensive than the classical version. But the overall convergence cost was dramatically cheaper. Fewer total iterations, less total compute. On the axis that actually mattered (how much does it cost to get to a good solution), our approach was superior, and we had the empirical evidence to show it.

But here's what happened: I got trapped. The rebuttal process pushed me to make the theory "look better." I spent significant time tweaking the algorithm to improve its theoretical guarantees, trying to satisfy the reviewers' axis instead of the one I knew mattered. I was optimizing the wrong thing, and I knew it, but the pressure was real.

Eventually, I dropped that approach. I leaned on the empirical results and made the case directly: this is cheaper overall, here's the evidence. The paper was rejected a few times, then accepted by a top venue.

The lesson wasn't about peer review. It was about how easy it is to get pulled onto someone else's axis without realizing you've abandoned your own.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😮‍💨</span> 
    <span>The reviewers evaluated cost on a per-iteration axis. I was optimizing for total cost. We were both "right," but about different things. The real skill was recognizing that we were talking past each other and having the conviction to defend the axis that mattered.</span> 
</div>

<br>

## You've Already Seen This on Leetcode (You Just Weren't Taught to Notice)

The tradeoff hiding in Leetcode problems is the same one hiding in production systems. Let me show you with two problems every Leetcode grinder has solved.

### Two Sum

Everyone's first Leetcode problem. Given an array and a target, find two numbers that add up to the target.

The "optimal" solution: hash map. O(n) time, O(n) space. Store each number, check if the complement exists. Fast, clean, done.

The "suboptimal" solution: sort the array, use two pointers. O(n log n) time.

By the Leetcode hierarchy, the hash map wins. It's "optimal." End of discussion.

But what did it optimize for? Time on this one problem. What did it sacrifice? Extensibility.

The sort + two pointers approach *extends*. 3Sum? Same idea. 4Sum? Same idea. kSum? Same pattern. The technique generalizes naturally because the sorted structure opens up a whole class of problems. The hash map solution is a dead end the moment the problem changes.

The "optimal" Two Sum solution optimized for time complexity on one specific problem. The "suboptimal" one optimized for adaptability across a class of problems. Which one is "better" depends entirely on which axis you care about.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😎</span> 
    <span>The very first Leetcode problem already contains a tradeoff that most people never notice, because the ecosystem told them there was only one axis to care about.</span> 
</div>

<br>

### Kth Largest Element

Given an unsorted array, find the kth largest element.

The "optimal" solution: QuickSelect. O(n) average time, O(1) space. Based on the partition logic of QuickSort, you narrow down to the kth element without fully sorting.

The "suboptimal" solution: min-heap of size k. O(n log k) time, O(k) space.

QuickSelect wins on average time complexity. It's what the editorial says. It's what gets you the green checkmark.

But QuickSelect has O(n²) worst case. It mutates the input array. And it only works when you have all the data upfront.

The heap has predictable O(n log k) performance, every time. It doesn't touch your input. And if elements are arriving as a stream, the heap naturally handles it. QuickSelect can't even participate in that scenario.

QuickSelect optimized for average case time on a static array. The heap optimized for predictability, safety, and extensibility. In most production contexts, I'd pick the heap without thinking twice.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>This is the same pattern as Simplex and TDigest. The "better" theoretical answer isn't automatically the better answer. It depends on what you're building, who's using it, and what failure looks like. Those are engineering questions, not algorithm questions.</span> 
</div>

<br>

## The Real Skill

The missing skill was never "find the optimal solution faster." It was **"identify which axis matters for this problem, and reason about the tradeoffs between them."**

Post #1 was about reasoning over recall. This is the extension: reasoning about *what to optimize for*, not just *how to optimize*.

When you solve a problem on Leetcode, ask yourself: what did this solution choose to be good at? What did it sacrifice? What would change if I cared about a different axis? That question is worth more than memorizing another editorial.

When someone says "the optimal solution," ask: optimal with respect to what? If they can't answer that, they haven't finished thinking. And if you can't answer it about your own solution, neither have you.



<span style="color:gray; font-style:italic;">Originally published on <a target="_blank" href="https://zhengshi.substack.com/p/the-trap-of-optimal-the-missing-guide">Five-Step Snake</a></span>
