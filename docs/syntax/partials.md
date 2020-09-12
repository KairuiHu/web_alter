---
id: partials
title: Partials
---

## Basic Syntax

A template function is always called with [an Eta config object](../api/configuration.md), which is stored in a variable called `E`. `E` has two functions for including partials: `include` and `includeFile`.

As of Eta 1.6.0, `E.include` and `E.includeFile` are aliased as `include` and `includeFile`. Either method works.

```ejs
<%~ E.include(name, options) %>
<% /* or */ %>
<%~ include(name, options) %>
```

```ejs
<%~ E.includeFile(path, options) %>
<% /* or */ %>
<%~ includeFile(path, options) %>
```

## Example

```ejs
<%~ E.include('my-partial') %>
```

```ejs
<%~ E.include('my-partial', {users: it.users}) %>
```

```
<%~ E.includeFile('../partials/footer', {description: "Footer" }) %>
```
