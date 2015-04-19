var github = require('octonode');

var log = hexo.log,
  post = hexo.post,
  pagesn = 1,
  source,
  repo;

hexo.extend.migrator.register('github-issue', function(args, callback){
  source = args._.shift();

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
  repo.issues(pagesn, function(err, body, headers) {
    if (!err) {
      if (body && body.length) {
        for(var i in body) {
          var issue = body[i];
          var category = [];
          var data={};
          for (var i in issue.labels) {
            category.push(issue.labels[i].name);
          }
          data.title = issue.title;
          data.content = issue.body;
          data.date = issue.created_at;
          data.category = category;
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