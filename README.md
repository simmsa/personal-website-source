This is the source code of [andrewdsimms.com](andrewdsimms.com)

# How to deploy

`npm run deploy`

Which runs `gatsby deploy` and then posts to github pages. For new blog posts with lots of media gh-pages can be slow, so be patient.

# Pushing source code

Github pages uses remote origin, so there is a separate [repository for the source code](https://github.com/simmsa/personal-website-source). To push to this repo use:

`git push source master`

# Blogging

## Creating a New Blog Post

In the `src/pages/blog` directory create a new folder (folder name doesn't matter, blog post slug is generated from frontmatter title) with an `index.md` file containing:

```md
---
title: Post Title
description: Description
date: "2019-03-07"
published: true
tags: "Tags, separated, by, commas"
hero: "hero_placeholder.jpg"
hero_description: ""
---
```

To easily create this use the snippet `fm`

## About Markdown

# Markdown Flavor

See https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

### Images
Image links are relative to the blog post directory. Place all images in the post directory and use:

```md
![Alt Text](image_filename.extension)
```

Snippet is `img`

### Hosting files
Hosted or static files should be put in the `static/blogfiles` folder and can be accessed with:

```md
[Link](/blogfiles/filename.extension)
```

Snippet is `a`, `l`, or `link`

This link won't work until `gatsby build` is run.

### Embed Files

You can embed files, essentially an include with:

```md
`embed:this_post_dir/filename.extension`
```

Snippet is `em` or `embed` and automatically finds `this_post_dir`

# How this is setup

This site uses [gatsby](https://www.gatsbyjs.org). I am using github pages which puts the generated html [here](https://github.com/simmsa/simmsa.github.io) and serves the actual website from this directory.

## 🧐 What's inside?

From default readme - kept for reference

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

