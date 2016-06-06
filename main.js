// Parse github filtering notation
const github = (() => {
  return function (str) {
    const main = /(?:[\w-_]+):(?:"[^"]+"|[^ ]+)/g;
    const sub = /^([^:]+):(")?(.+)\2$/;

    return (String(str).match(main) || [])
      .reduce((res, next) => {
        next = next.match(sub);
        res[next[1]] = res[next[1]] || [];
        res[next[1]].push(next[3]);

        return res;
      }, {});
  };
})();

if (typeof window === 'undefined') {
  module.exports = github;
}

console.log(github('is:open is:pull-request author:"Andreas K." author:"Luke Skywalker"'));
