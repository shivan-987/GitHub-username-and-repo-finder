
    function finderOn(){
        // let's say if finder off till now, then switch it off first
        let switch_off = document.getElementById('switchOFF')
        switch_off.checked = false

        // show the start-page
        let start_title = document.getElementById('start-page-1')
        let start_container = document.getElementById('start-page-2')
        start_container.style.display = 'flex'
        start_title.style.display = 'block'
    }

    function finderOff(){
        // let's say if finder on till now, then switch it on first
        let switch_on = document.getElementById('switchON')
        switch_on.checked = false

        // hide the start-page,repo-board,loader,error msg
        let start_title = document.getElementById('start-page-1')
        let start_container = document.getElementById('start-page-2')
        let loader = document.getElementById('loader')
        let error_msg = document.getElementById('error-msg')
        let repo_board = document.getElementById('repo-board')
        start_container.style.display = 'none'
        start_title.style.display = 'none'
        loader.style.display = 'none'
        error_msg.style.display = "none"
        repo_board.style.display = "none"

    }



    //defining fn to show username search option
    function displayUsernameSearchBox(){
        // if say project search box was displaying till now, then hide it 1st
        let project_search_box = document.getElementById('project_search')
        if(project_search_box.style.display != 'none')
        {
        project_search_box.style.display = 'none'
        }

        // hide keyword details if displayed
        let loadermsg = document.getElementById('loader')
        let error_msg = document.getElementById('error-msg')
        let found_repos = document.getElementById('repo-board')

        loadermsg.style.display = 'none'
        error_msg.style.display = 'none'
        found_repos.style.display = 'none'

        // get search container addr by its id
        let search_box = document.getElementById('username_search')

        //display the search box now for the user
        search_box.style.display = 'flex'

    }

    //defining fn to show project search box
    function displayProjectSearchBox(){
        // if username search box open till now, then hide it first
        let username_search_box = document.getElementById('username_search')
        if(username_search_box.style.display != 'none')
        {
        username_search_box.style.display = 'none'
        }

        // hide username details if displayed
        let loadermsg = document.getElementById('loader')
        let error_msg = document.getElementById('error-msg')
        let developer_info = document.getElementById('devCard')

        loadermsg.style.display = 'none'
        error_msg.style.display = 'none'
        developer_info.style.display = 'none'

        // get the project search box by its id
        let search_box = document.getElementById('project_search')

        //dislay the searchbox
        search_box.style.display = 'flex'
    }




    //defining the finding developer by username fn
    async function findDeveloper(){
        //get username to search, entered by user
        let username = document.getElementById('gh-username').value

        //get addr of loader and error and devCard
        let loadermsg = document.getElementById('loader')
        let error_msg = document.getElementById('error-msg')
        let developer_info = document.getElementById('devCard')

        //since button click : only show loader msg
        loadermsg.style.display = 'block'
        loadermsg.innerHTML = `Searching Github for profiles with username : <span style="color:yellow;font-style:bold">"${username}"</span>`
        // show loader msg for 3s before giving devcard info
        setTimeout(()=>{
        },2000)
        // hide error and developer info
        developer_info.style.display = 'none'
        error_msg.style.display = 'none'



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



        //get the card fields
        let dev_dp = document.getElementById('devAvatar')
        dev_dp.src = developer_data.avatar_url 

        let dev_uname = document.getElementById('devName')
        dev_uname.innerHTML = developer_data.name || "no name"

        let dev_bio = document.getElementById('devBio')
        dev_bio.innerHTML = developer_data.bio || "no bio"

        //get addr for blog
        let dev_blog = document.getElementById('blog')
        let blog_url = developer_data.blog
        if(blog_url === '' || !blog_url)
        {
            dev_blog.innerHTML = "no blog"
        }
        else
        { 
            dev_blog.innerHTML = `<a href = "${blog_url}"" target="_blank" rel="noopener noreferrer">Blog</a>`
        }


        // get addr to put github url on using 'html_url'
        let dev_git_url = document.getElementById('devUrl')
        let git_url = developer_data.html_url
        // _blank = open on new tab
        dev_git_url.innerHTML = `<a href = ${git_url} target="_blank" rel="noopener noreferrer">View Complete Profile</a>`


        let dev_repo_count = document.getElementById('devRepos')
        dev_repo_count.innerHTML = developer_data.public_repos

        let dev_followers = document.getElementById('devFollowers')
        dev_followers.innerHTML = developer_data.followers


        //hide loader and display card
        loadermsg.style.display = 'none'
        developer_info.style.display = 'block'

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

    }


    //fn to findProjects
    async function findProjects(){
        // get keyword entered by user
        let keyword = document.getElementById('gh-keyword')

        // get loader msg and error msg and addr of where to displ  ay repos found
        let loader = document.getElementById('loader')
        let error_msg = document.getElementById('error-msg')
        let found_repos = document.getElementById('repo-board')

        // as soon as start searching... hide error_msg and repos, showing loading msg
        error_msg.style.display = 'none'
        found_repos.style.display = 'none'
        loader.style.display = 'block'
        loader.innerHTML = `Searching Github for projects with keyword : <span style="color:yellow;font-style:bold">"${keyword.value}"</span>`

        // show loader msg for 3s before giving repos info
        setTimeout(()=>{
        },2000)


        try{
        // api link, q=keyword && sort by stars && only top 20 results
        let apilink = `https://api.github.com/search/repositories?q=${keyword.value}&sort=stars&per_page=20`

        //fetch data from API
        let raw_repo_data = await fetch(apilink)

        // clear input values, clears the keyword entered
        keyword.value = ''

        //if fetch returns rejected promise i.e. no project with keyword then throw error
        if(!raw_repo_data.ok)
        {
            throw new Error('No data fetched from API : rejected promise')
        }       
        //convert json data to readable js object, if API returns fulfilled promise
        let repo_data = await raw_repo_data.json()

        // use map() to iterate over items and each items's html display data defined and stored in an array
        let repo_array = repo_data.items

        //check if repo_array empty : i.e. data not found in the data fetched
        if(repo_array.length == 0)
        {
            throw new Error("Projects By keyword not found in fetched data")
        }

        let repo_project_card = repo_array.map((repo_data)=>{

            //to get languages/frameworks etc used in the repo : if topics exist then get top 4
            let topics_list = repo_data.topics ? repo_data.topics.slice(0,7).map((topic)=>{
                return `<span class="topic-tag">${topic}</span>`
            }).join('') : ' '

            return `
            <div class="repo-card">
                <div class="repo-desc">
                    <!--repo name-->
                    <h3><a href="${repo_data.html_url}" target="_blank" style="color: inherit; text-decoration: underline;">${repo_data.full_name}</a></h3>
                    <p>${repo_data.description || "no description provided"}</p>
                </div>

                <div class="repo-topics">
                    ${topics_list}
                    <span class="topic-tag" style="color:orange">and more</span>
                </div>


                <div class="repo-meta">
                    <span>
                        <!--to get github star icon-->
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg>
                        ${repo_data.stargazers_count}</span>
                    <span> 
                        <!--to get github fork icon-->
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                        </svg>
                        ${repo_data.forks_count}</span>
                    <span>
                        <!--to get github language circle icon-->
                        <svg aria-hidden="true" height="12" viewBox="0 0 12 12" version="1.1" width="12">
                        <circle cx="6" cy="6" r="6" fill="#f1e05a"></circle>
                        </svg>
                        ${repo_data.language || 'N/A'}</span>
                </div>
            </div>
            `
        }).join('') // array to string


        //hide loader msg, error msg and unhide display msg
        loader.style.display = "none"
        error_msg.style.display = "none"

        found_repos.innerHTML = repo_project_card


        // unhide display msg
        found_repos.style.display = 'grid'


        }
        catch(error)
        {
        //hide loader and repos card, only show error msg
        loader.style.display = 'none'
        found_repos.style.display = 'none'
        error_msg.style.display = 'block'
        setTimeout(()=>{
        },2000)
        error_msg.innerHTML = `Projects with keyword : <span style="color:yellow;font-style:bold">"${keyword.value}"</span> not found`                
        }

    }

