var github = require('octonode');
var matter = require('hexo-front-matter');

var log = hexo.log,
  post = hexo.post,
  pagesn = 1,
  publish_mode,
  source,
  repo;

hexo.extend.migrator.register('github-issue', function(args, callback){
  source = args._.shift();
  // load --publish option
  const { publish } = args;
  publish_mode = publish;

  if (!source){
    var help = [
      'Usage: hexo migrate github-issue <owner/repo>',
      '',
      'For more help, you can check the docs: http://hexo.io/docs/migration.html'
    ];

    console.log(help.join('\n'));
    return callback();
  }

  log.i('Migrate from %s...', source);

  repo = github.client().repo(source);
  nextpage(callback);
});

function nextpage(cb) {
  var category_prefix = 'category_';
  repo.issues(pagesn, function(err, body, headers) {
    if (!err) {
      if (body && body.length) {
        for(var i in body) {
          var issue = body[i];
          var categories = [];
          var tags = [];
          var data = {};
          var published_tag = false;

          for (var i in issue.labels) {
            var name = issue.labels[i].name;
            if (name.indexOf(category_prefix) != -1) {
              name = name.substr(category_prefix.length);
              categories.push(name);
            } else if (name.toLowerCase() == "draft") {
              data.layout = "draft"
            } else if (name.toLowerCase() == "publish") {
              published_tag = true
            } else {
              tags.push(name);
            }
          }

          // parse front-matter
          issue.body = issue.body.replace(/\r\n/g, '\n');
          var { _content, ...meta } = matter.parse(issue.body);
          
          data.title = issue.title.replace(/\"/g,"");
          // if you migrate with --publish option, will skip unpublished issue
          if (publish_mode && (!published_tag) ) {
            log.i('skip unpublished post: ' + data.title);
            continue;
          }

          data.content = _content;
          data.date = issue.created_at;
          data.tags = tags;
          data.categories = categories;
          data.number = issue.number;
          data = Object.assign(meta, data);

          post.create(data, true);
          log.i('create post: ' + data.title);
        }
        pagesn++;
        nextpage(cb);
        return;
      };
      cb();
    } else {
      log.i('cannot get post: ' + err);
      cb();
    }
  });
}
