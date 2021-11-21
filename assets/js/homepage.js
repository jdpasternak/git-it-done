var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContinerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
  var response = fetch(`https://api.github.com/users/${user}/repos`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

var formSubmitHandler = function (evt) {
  evt.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContinerEl.textContent = "No repositories found.";
    return;
  }
  repoContinerEl.textContent = "";
  repoSearchTermEl.textContent = searchTerm;
  for (var i = 0; i < repos.length; i++) {
    var repoName = `${repos[i].owner.login}/${repos[i].name}`;

    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-rown justfiy-space-between align-center";

    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = `<i class="fas fa-times status-icon icon-danger"></i>${repos[i].open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = `<i class="fa fa-check-square status-icon icon-success"></i>`;
    }

    repoEl.appendChild(statusEl);

    repoContinerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
