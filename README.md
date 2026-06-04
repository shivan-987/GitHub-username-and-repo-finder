
<!-- title -->
<h1 align='center'>Github Profile and Repository Finder</h1>

<!-- short description -->
<p align="center">
A responsive web page that interacts with the public GitHub REST API to search and retrieve real-time data.
One can easily switch between searching for someone's profile by their username OR for ideas/references/exploring open source works,query project keywords to get top-rated repositories.
</p>

<!-- deployment link -->
<p align="center">
    <a href="https://sankalp-yanamandra.github.io/GitHub-username-and-repo-finder/">
        <img src="https://img.shields.io/badge/try-application-brightgreen?style=for-the-badge" alt="try App">
    </a>
</p>

<!-- gif -->
<p align="center">
  <img src="assets/Animation.gif" alt="Project Demo">
</p>

<!-- features -->
## ✨ Features
<ol>
    <li>Dual Search Mode 
        <br>
        - easy switch between searching for a profile or querying repos by keywords.
        <br>
    </li>
    <li>Real Time Data 
        <br>
        - data fetched directly from the public GitHub REST API using Native Web Fetch API.
        <br>
    </li>
    <li>Asynchronous UI
        <br>
        - includes custom loading states while data is being fetched.
        - handle errors during the data fetch phase.
        <br>
    </li>
    <li>Responsive Design
        <br>
        - puts to use the versatility of CSS FlexBox to ensure the cards and card layout is easily to view.
        <br>
    </li>
</ol>

<!-- tech stack -->
## 🛠️ Tools Applied

### Page Skeleton, Style, Funtionality
- HTML5
- CSS
- JavaScript (used ES6 features)

### Page Layout
- CSS Flexbox

### API
- GitHub REST API
- JavaScript Native Web Fetch API

<!-- installation and usage -->
## 🚀 Getting Started

This is just a static frontend web page, so no complext dependencies required to run locally.

### Prerequisites
Just any modern web browser like Chrome, Brave, Edge and an active Internet connection for data fetch phase.

### Local Setup Process

1. **Clone this Repo**

```bash
git clone https://github.com/Sankalp-Yanamandra/GitHub-username-and-repo-finder.git
```
2. **Navigate to project directory**
```bash
cd Github-username-and-repo-finder
```
3. **Launch Application**

- Double Click the `index.html` file

<!-- code snippets -->
## 🔍 Code Spotlight

- implemented `fetch phase` using JavaScript `async-await` which returns a promise: fulfilled / rejected / pending and also used `try-catch` to handle errors thrown.
- used Native Web `fetch()` API for executing fetch phase which reduced `fetch phrase` code lines. 
- `.json()` used to convert the fetched data into `js object` type.

```javascript
//dynamic fetch request using try-catch (since async and await don't handle errors)
try{
//fetch API
let apilink = `https://api.github.com/users/${username}`
let raw_dev_data = await fetch(apilink)

// clear input values, clears the name entered
document.getElementById('gh-username').value = ''

//if unsuccessful fetch i.e. no developer found then throw error
if(!raw_dev_data.ok)
{
    throw new Error('Username not found')
}

//since found, convert json to js object
let developer_data = await raw_dev_data.json()

console.log(developer_data)  
// continue UI rendering
}   

catch(error){
//hide loader and card, only show error msg
loadermsg.style.display = 'none'
developer_info.style.display = 'none'
error_msg.style.display = 'block'
setTimeout(()=>{

},2000)
error_msg.innerHTML = `Username : <span style="color:yellow;font-style:bold">"${username}"</span> not found`
}

```
## ⚠️ Known Issues & API Limitations

While building and testing this application, a few quirks of the public API were noted:

* **Broad Text Searches:** The GitHub Search API natively performs a broad text search. Searching for single-letter programming languages (like "C" or "R") will yield irrelevant results because it searches for that letter across all text fields. **Workaround:** To strictly search by language, use GitHub's qualifier syntax in the search bar (e.g., type `language:c`).
* **Rate Limiting:** This application utilizes the unauthenticated GitHub REST API, which enforces a strict limit of 60 requests per hour per IP address. If the app suddenly stops returning results, you have likely hit this limit.

---

## 🤝 Contributing

Contributions, issues, and feature requests are highly welcome! If you have suggestions to make this much better, please fork the repo and create a pull request. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact

**My Name** - [@sankalp-yanamandra](https://github.com/sankalp-yanamandra)

**Project Link:** [https://github.com/Sankalp-Yanamandra/GitHub-username-and-repo-finder.git](https://github.com/Sankalp-Yanamandra/GitHub-username-and-repo-finder.git)
