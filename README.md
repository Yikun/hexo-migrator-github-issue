# Github Issue Migrator

Migrate your blog from github issue to Hexo.

## Requirements
You need to complete the setup of Hexo first, see [Hexo Setup](https://hexo.io/docs/setup.html).
``` bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```

## Install

``` bash
$ npm install hexo-migrator-github-issue --save
```

## Usage

Execute the following command after installed. `owner/repo` is the github owner and repo of issue.

``` bash
$ hexo migrate github-issue owner/repo
```

It will migrate owner/repo issue to hexo, there are some specific issue label is supported:

- "catagory_", set the sepecfic catagory for the post
- "top_", set the top priority for the post.
- "draft", the post layout will be set to "draft", that means the post will be stored in 

## Demo

``` bash
hexo migrate github-issue Yikun/yikun.github.com
```
It will migrate Yikun/yikun.github.com issue to hexo.

## History
- 0.1.4 catagory/top/draft support
- 0.1.3 issue number support
- 0.1.2 fix the title format error
- 0.1.1 tag support
- 0.1.0 Init version

## Contributor
- @Yikun tag/issue number/draft support
- @CloudyCity category/top support

Welcome to submit the issue and pull request.
