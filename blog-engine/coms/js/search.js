const searchInput = document.getElementById("searcher");
const list = document.getElementById("list");
const articlesFolder = "articles";
const folders = [];

const replaceHyphensWithSpaces = str => str.replace(/-/g, " ");

const capitalizeWords = str =>
  str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

searchInput.addEventListener("input", event => {
  const searchTerm = event.target.value.toLowerCase();
  list.innerHTML = "";

  folders.forEach(folder => {
  const displayName = capitalizeWords(replaceHyphensWithSpaces(folder));
  if (displayName.toLowerCase().includes(searchTerm)) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `../coms/${articlesFolder}/${folder}`;
    a.textContent = displayName;
    li.appendChild(a);
    list.appendChild(li);
  }
 });
});

fetch(`../coms[]${articlesFolder}`)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");
    const links = htmlDoc.querySelectorAll("a");
    links.forEach(link => {
      if (!link.textContent.includes("Parent Directory")) {
        folders.push(link.textContent);
      }
    });
  });
