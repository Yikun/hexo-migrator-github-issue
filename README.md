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

## Demo

``` bash
hexo migrate github-issue Yikun/yikun.github.com
```
It will migrate Yikun/yikun.github.com issue to hexo.
