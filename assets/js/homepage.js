var getUserRepos = function (user) {
  var response = fetch(`https://api.github.com/users/${user}/repos`).then(
    function (response) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  );
  console.log("outside");
};

getUserRepos("jdpasternak");
getUserRepos("cli");
