---
title: Searching Google From Inside Vim
description: Writing a plugin to search google from Vim
date: "2019-03-11"
published: true
tags: "Vim, Neovim, vimscript, google"
hero: "hero_placeholder.jpg"
hero_description: "Googling from Vim is bliss"
---

# The Problem

What does thing mean, I should google it _proceeds to copy and past thing into google_. Rinse and repeat a bunch of times. There has got to be a better way.

# The Solution?

Write a Vim plugin to google all your problems...

## Caveats

This works on macOS, it should be trivial to make this work on linux, and I don't know about Windows.

# First Steps

On macOS the [open](https://ss64.com/osx/open.html) command

> `opens a file (or a folder or URL), as if you had double-clicked the file's icon`

Lets try it:

```sh
$ open google.com
The file /Users/user/google.com does not exist.
Perhaps you meant 'http://google.com'?
```

Alright lets do what it says:

```sh
$ open http://google.com
```

Awesome it opens google.

![Google is working](first_google.png)

Okay lets open google from Vim. Open up your `vimrc` or `init.vim` and add a function:

```vim
function! Google()
    call system("open http://google.com")
endfunction
```

Source (reload) your `vimrc` with `:so $MYVIMRC` and run:

```vim
:call Google()
```

And google should open as before, but this time from inside vim.

<div class="alert alert-primary my-4" role="alert">
<div class="my-2"><b class="h4">Note:</b></div>
Vimscript is an oddball programming language that can leave you scratching your head. In some ways its reminds me of Python, but in others it has no comparison. The best part is that all the docs are inside vim. All the help files are accessible by running <code>:help</code>, and you can list all the functions with <code>:h function-list</code>. And the worst part is sometimes the docs don't make any sense.
<br/>
<br/>

These are my tips and tricks to improve your vimscript experience:

<ul>
    <li>Use a linter. As of this article <a href="https://github.com/Kuniwak/vint">vint</a> is the solitary option. I use vint with the plugin <a href="https://github.com/w0rp/ale">ALE (Asynchronous Lint Editor)</a>. I don't write vimscript for fun, I want to solve a problem, and doing that with less pain is my preference</li>
    <li>When defining a <code>function</code> use an exclamation point, <code>!</code>. This forces vim to rewrite this function everytime you resource your <code>vimrc</code>, avoiding the <code>E122: Function FunctionName already exists, add ! to replace it</code> error</li>
    <li>To call a function you must use the keyword <code>call</code>. You don't need to call a function when you are assigning the return value of a function to a variable.</li>
    <li>Any command line code works in a function inside <code>execute</code> like <code>execute('echo "test"')</code></li>
    <li><code>.</code> (period or dot) is the concatenation operator. You can join two strings like: <code>let newString = "hello " . "world"</code></li>
    <li>Use full names when setting vim options in functions. <code>:set shiftwidth=2</code> is a lot easier to read than <code>:set sw=2</code></li>
</ul>
</div>

Now lets get make this into an actual command. Below the `Google()` function add:

```vim
command! Google call Google()
```

Source your `vimrc` again and run:

```vim
:Google
```

And google should open as before.

# Adding Features

Now that we can open google from vim lets try to run a search from inside vim. We need to solve 2 problems

1. How can we pass a word, or words, into the `Google()` function
2. How do we turn that input into a google approved query

## Getting the word under the cursor

The vim `expand` function gives information the current buffer. Passing `<cword>` into `expand` returns the word under the cursor, which we can then use for anything. For now we will print, `echo` in vimscript, the input.

```vim
function! Google()
    let l:query = expand('<cword>')
    echo l:query
endfunction
```

Above the `l:` prefix to the variables limits the scope to the current function.

After sourcing, running `Google()` over a word `echo`s that word. But what if we want to google something more specific...

## Passing a command line input into a function

Passing data to and from the command line is a little awkward, but the payoff is worth it.

On the vim command line we can use replacement text, between `<>` brackets, to pass variables to a command. In our case we can use `<q-args>` to pass input from the command line into our function as a string. We also need to tell the command to expect arguments using `nargs`. In our case we want to handle one or more arguments.

```vim
function! Google(query)
    echo a:query
    " call system("open http://google.com")
endfunction!

command! -nargs=+ Google call Google(<q-args>)
```

```

```
