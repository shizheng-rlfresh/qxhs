---
title: "The Missing Guide to Problem Solving (That Leetcode Exposed)"
slug: "missing-guide-leetcode"
description: "Why most leetcode prep builds the wrong skill, and the method that actually works."
publicationDate: 2026-03-01
category: "Story"
public: true
author: "Zheng Shi"
---

<span style="color:gray; font-style:italic;">"First, you have to understand the problem. After understanding, make a plan. Carry out the plan. Look back on your work. How could it be better?" — George Polya, How to Solve It (1945)</span>

<br>

I want to tell you about something that's been bugging me for a while.

Like a lot of people in tech, I went through the *Leetcode* grind. *Neetcode* roadmap, company-tagged lists, the whole ritual. I got pretty decent at it. I could look at a problem and go "oh, that's a sliding window" or "two pointers, easy" and bang out a solution. Felt good. Felt like progress.

Then I walked into actual interviews at a top tech company, and something felt off.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>I want to be honest here. It wasn't a spectacular failure. It was more like a subtle wrongness that I couldn't articulate at the time. I could solve things I'd seen, but anything slightly different and I was in trouble.</span> 
</div>

<br>

Two things kept happening. On problems I genuinely hadn't seen before, my brain just went blank. No pattern to match, nothing to grab onto. But the sneakier trap was the *almost* familiar problems. I'd see something that *looked like* a problem I'd solved before, and my brain would lock onto that memorized solution like a dog with a bone. I'd spend 20 minutes trying to force it to fit, not realizing I was solving the problem in my memory instead of the one on the screen.

That second trap is the dangerous one, because it *feels* like you're making progress. "I think this is a sliding window..." Meanwhile you're going down a dead end with full confidence.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😮‍💨</span> 
    <span>The standard advice from every corner of the internet: grind more. Do more problems. Cover more ground. Build that muscle memory. I tried that. I really did. And I hit a wall I couldn't grind through.</span> 
</div>

<br>

Here's what I think was actually going on. All that grinding trained my brain to do one thing: **search**. See a problem, search my library for a match, apply template. It's fast. It feels productive. And it works, right up until it doesn't. The more I memorized, the harder it became to just *think*. My brain wanted to search, not analyze.

So I went back to basics. And I found something that's been hiding in plain sight since 1945.

## Every Algorithm Was Once Someone's Research

This is the part that shifted everything for me.

Think about it. Every algorithm in your *Leetcode* toolkit (binary search, two pointers, BFS, DFS, dynamic programming) didn't come from a *Neetcode* video. They were somebody's *research output*. A computer scientist, at some point in history, sat down with a problem they had never seen before, with no template to reach for, and figured it out from scratch through reasoning.

How did they do it? The same way all scientific research works. They studied the problem, formed a hypothesis about the solution, designed an algorithm, and then *proved* it works. Not "tested on a few examples." Proved. Formally. This is how computer science has always worked. When *Dijkstra* published his shortest path algorithm, he didn't just show it worked on some graphs. He proved it was correct through mathematical invariants.

*George Polya* distilled the essence of this process in 1945, long before *Leetcode* existed. Four steps:

1. **Understand the problem.**
2. **Make a plan.**
3. **Carry out the plan.**
4. **Look back.**

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😎</span> 
    <span>1945! This is 80 years old! And somehow the entire Leetcode ecosystem managed to skip it in favor of "do 500 problems and pray." The irony is that every algorithm you've ever memorized was created <i>using this exact process</i>.</span> 
</div>

<br>

Now, *Polya's* framework sounds generic. "Understand the problem," yeah, thanks, George. But when I started mapping it to how computer scientists actually design and prove algorithms, I realized the issue wasn't that it was too simple. The issue was that I'd never actually done it properly. Let me walk you through what it looks like when you take it seriously.

## Step 1: Understand the Contract

I call this "the contract" because that's what it is: the precise agreement between you and the problem about what you're given and what you need to produce.

Most people already know to read constraints carefully. Sorted array? That's a structural property you can exploit. Positive integers only? That opens up certain techniques. I don't need to belabor this point. Constraints are clues, and most experienced practitioners already treat them that way.

What I do want to emphasize is the question most people *don't* ask: **what's the relationship between input and output?** Can you state, precisely, what a correct answer must satisfy?

In computer science terms, this is defining the **specification**. Before you can design an algorithm, before you can prove anything about it, you need a precise statement of what "correct" means. This is exactly how algorithm research works: before proving an algorithm correct, you first formally define what correctness means for the problem.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>I used to skip this. I'd read the problem, look at the examples, and start pattern matching. It took me a while to realize that I was skipping the step that makes everything else possible. If you can't precisely state what the answer must satisfy, you can't reason about whether your approach produces it.</span> 
</div>

## Step 2: Propose a Hypothesis

This is where I think the biggest disconnect lives between how *Leetcode* is typically practiced and how problem solving actually works.

The conventional wisdom in the *Leetcode* ecosystem is: **know the patterns**. Study enough problems in each category that when you see a new one, you can recognize which pattern it belongs to and apply the corresponding template.

Here's the thing. When you "know the pattern," what you really know is *someone else's hypothesis that has already been verified*. You're memorizing the conclusion without understanding the reasoning that led to it. This is fundamentally backwards. A hypothesis is a hypothesis precisely because it needs to be *verified*, not recalled.

In computer science research, when someone designs a new algorithm, they don't start with the solution. They start with observations about the problem's structure, form a conjecture about what approach might work, and then test that conjecture through analysis and proof. The hypothesis comes *before* the certainty, not after.

What does this look like in practice? You start with the structural properties you identified in Step 1 and ask: **what can I exploit?**

The array is sorted, so I can eliminate portions of the search space. Maybe binary search. Maybe two pointers. I need to track a running condition over a subarray, so maybe I need a window with some state. The problem has overlapping subproblems, so maybe recursion with memoization.

Notice what's happening. I'm not saying "this looks like Problem #347." I'm reasoning from the structure of *this specific problem* toward a class of approaches. The building blocks (binary search, sliding window, DP) are the same ones I already know. The difference is how I arrive at them: through deduction, not recall.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😎</span> 
    <span>Here's the part that made this really click for me. A hypothesis might be wrong, and that's completely fine. In science, you don't start with the right answer. You start with a reasoned guess and test it. The power isn't in getting it right the first time. The power is in being able to <b>propose multiple hypotheses quickly and eliminate the wrong ones through reasoning</b>. After enough practice, your brain gets fast at this. You see a problem and within minutes you've considered three possible approaches, discarded two because they violate some property you identified, and zeroed in on the one that holds up.</span> 
</div>

<br>

This is *vastly* more powerful than pattern matching, and it's exactly how experienced researchers think. They don't search their memory for a matching paper. They generate candidate approaches and prune them based on structural analysis.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>To be clear, this is also harder. Memorizing patterns feels safe. Proposing hypotheses that might be wrong feels uncomfortable. But that discomfort is the signal that you're actually building the skill that matters. And the payoff is that you become someone who can solve problems you've never seen, not just problems you've memorized.</span> 
</div>

## Step 3: Find the Invariant

This is the core. This is the part nobody teaches in the *Leetcode* ecosystem, and I believe it is the single most important concept separating grinding from real problem solving.

An **invariant** is a property that remains true at every step of your algorithm. It's the contract your algorithm makes with itself: "no matter what happens during execution, *this* will always hold."

In computer science, invariants are how algorithms are *proven correct*. This isn't some abstract academic exercise. When Cormen, Leiserson, Rivest, and Stein (the authors of the famous CLRS textbook) present an algorithm, they prove it works by identifying the loop invariant and showing three things:

1. **Initialization:** The invariant is true before the loop starts.
2. **Maintenance:** If the invariant is true before an iteration, it remains true after.
3. **Termination:** When the loop ends, the invariant gives us the correct answer.

This is the gold standard of algorithm correctness. And the beautiful thing is, you don't need to write formal proofs in an interview. You just need to *think* in terms of invariants. When you can identify the invariant, you understand *why* the algorithm works, and that understanding makes you adaptable in ways that memorization never can.

Let me make this concrete with two examples. One that everyone thinks they know, and one that makes people want to flip a table.

### Binary Search: The Invariant You Already Use But Don't Think About

Everyone "knows" binary search. But I bet most people can't explain why they sometimes use `low <= high` versus `low < high`, or when it's `mid + 1` versus just `mid`. I couldn't, for the longest time. I just memorized which version went with which problem type.

The invariant: **the target, if it exists, is always within `[low, high]`.** Each step cuts the range in half while preserving this property.

Once you frame it this way, all those confusing implementation details become answerable with one question: **does this step preserve the invariant?** If setting `low = mid + 1` could skip the target, it violates the invariant, so you don't do it. If it provably can't, it's safe. The boundary conditions (`<=` vs `<`) fall out naturally from the invariant and the termination condition.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>I used to have five different binary search "templates" saved in my notes. Different problems, different boundary conditions. When I started reasoning through invariants, I realized they were all the same algorithm with different conditions for which half to discard. I didn't need five templates. I needed one invariant and the ability to reason about it. This is exactly how CLRS presents binary search: one loop invariant, proved once, applied everywhere.</span> 
</div>

### Monotonic Stack: The One That Feels Like Pure Magic

This is the one I really want to talk about, because it's the poster child for "tricks you either know or you don't."

Take "next greater element": given an array, for each element, find the next element to its right that is greater. Brute force is `O(n²)`. You're expected to do `O(n)`. If you've seen the pattern, you know the answer is "use a stack." But *why* a stack?

Let's reason from the problem. As you scan left to right, each element is "waiting" for its next greater element. If element A is waiting and element B comes after A but is smaller, then B will get its answer resolved *before* A does, because anything greater than B (which is smaller) will appear before something greater than A. The waiting elements naturally form a last in, first out order. That's a stack.

The invariant: **the stack always contains elements in decreasing order, each still waiting for its next greater element.** When a new element arrives that is greater than the top, we resolve everything smaller. After resolution, we push the new element. Decreasing order is maintained.

We can verify: **initialization**, stack is empty, trivially correct. **Maintenance**, each new element either gets pushed or resolves waiting elements first, preserving the decreasing order. **Termination**, anything left on the stack has no next greater element, which is correct.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">🤔</span> 
    <span>The stack wasn't a "trick." It emerged from reasoning about the structure of what's waiting and in what order. The LIFO property came from the observation that smaller elements resolve first. The monotonic property came from the invariant. If you'd never seen a monotonic stack before and followed this reasoning, you would <i>invent</i> it.</span> 
</div>

<br>

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😎</span> 
    <span>"Next warmer temperature"? Same invariant, different comparison. "Largest rectangle in histogram"? Same structure. "Stock span"? Same reasoning. These aren't five different tricks. They're one idea with different inputs.</span> 
</div>

## Step 4: Look Back

*Polya's* last step. The one everyone skips, especially under time pressure. I skipped it too, for a long time.

After you have a working approach, ask yourself: **can I argue its correctness?** In CS terms: can I state the loop invariant, and can I sketch why initialization, maintenance, and termination hold? You don't need a formal proof. But if you can articulate it, you *understand* the algorithm, not just the code.

Then: **what's the complexity, and why?** Not a memorized answer. The monotonic stack solution for next greater element is `O(n)`. Why? Because the invariant ensures each element is pushed and popped at most once. That's a *derived* answer, not a recalled one.

And finally: **where does this break?** What assumptions am I depending on? What if there are duplicates? What if I need the *previous* greater element instead of the next? Understanding the boundaries of your approach is as valuable as the approach itself.

<div style="width: 100%; border: 1px solid gray; padding: 10px; display: flex; align-items: left;"> 
    <span style="margin-right: 10px;">😎</span> 
    <span>This last step is what turns a solved problem into actual understanding. Without it, you solved one problem. With it, you understood a <i>class</i> of problems. This is, by the way, exactly how peer review works in research. You don't just show your algorithm works on some examples. You show why it works in general, and you identify the conditions under which it doesn't.</span> 
</div>

## What the Shift Actually Feels Like

If you've been grinding the way I used to, here's the honest difference.

**Before (search mode):** See problem. Scan for matching pattern. Recall template. Try to apply. Doesn't quite fit. Panic. Try another template. Run out of time.

**After (analysis mode):** See problem. Understand the contract. Identify structural properties. Form a hypothesis. Maybe form two or three. Discard the ones that don't hold up. Find the invariant. Build the approach. Verify correctness.

The second path is slower at first. That's the honest truth. You're used to jumping straight to "what pattern is this?" and now you're forcing yourself to slow down and actually think. It feels like going backward.

But it's robust. It works on problems you've never seen because it doesn't depend on having seen them. And with practice, the hypothesis generation gets fast. You start seeing structural properties quickly, proposing candidate approaches in seconds, and pruning them almost instinctively. Not because you memorized more, but because you trained a fundamentally different muscle.

## What I'm Not Saying

I'm not saying stop practicing. Volume matters. You need exposure to different structures, and you need reps with the building blocks.

What I'm saying is: the missing guide was never another problem list or another *Neetcode* category to complete. It was the reasoning process underneath. The one computer science was built on. The one *Polya* wrote down in 1945. The one that every algorithm in your toolkit was created with, but that nobody in the *Leetcode* ecosystem seems to talk about.

Stop searching your memory. Start reasoning from the problem. The algorithms are the same. The way you arrive at them changes everything.

<br>

*I've been building a repo that walks through problems this way, focusing on invariants and the reasoning process rather than just solutions. More on that soon.*

*Next time: why "optimal" doesn't mean what Leetcode taught you it means, and what real engineering taught me about tradeoffs.*

<br>

<span style="color:gray; font-style:italic;">Originally published on <a target="_blank" href="https://zhengshi.substack.com/p/the-missing-guide-to-problem-solving">Five-Step Snake</a></span>
