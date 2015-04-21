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
          var tags = [];
          var data={};
          for (var i in issue.labels) {
            tags.push(issue.labels[i].name);
          }
          data.title = issue.title.replace(/\"/g,"");
          data.content = issue.body;
          data.date = issue.created_at;
          data.tags = tags;
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