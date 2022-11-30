// add delete button for the comments that belong to the user
const addDeletebutton = async() => {
    const another_res = await fetch('/api/delete_author');
    const user = await another_res.json();
    const allPosts = document.getElementsByClassName('commentsEle');
    for (let i = 0; i < allPosts.length; i++) {
        const username = allPosts[i].getElementsByClassName('commentsName')[0];
        if (username.innerHTML == user.author.name) {
            const deletebtn = allPosts[i].appendChild(document.createElement('button'));
            deletebtn.innerHTML = 'delete';
            deletebtn.addEventListener('click', async function(evt) {
                evt.preventDefault();
                const content = allPosts[i].getElementsByClassName('content')[0].innerHTML;
                console.log("content", content);
                const res = await fetch('/api/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({content})
                });
                const parsed = await res.json();
                console.log("parsed", parsed);
                doFilter(parsed);
            });
        }
    }

}


const doFilter = async(parsed) => {

    let table = document.getElementsByClassName('commentsTable')[0];
    table.innerHTML = '';

    for (let i = 0; i < parsed.length; i++) {
        const comment = table.appendChild(document.createElement('div'));
        comment.setAttribute("class", "commentsEle");
        const author = comment.appendChild(document.createElement('div'));
        author.setAttribute("class", "commentsName");
        author.textContent = parsed[i].authorName;
        const horoscope = comment.appendChild(document.createElement('div'));
        horoscope.setAttribute("class", "comments");
        horoscope.textContent = parsed[i].horoscope;
        const relationship = comment.appendChild(document.createElement('div'));
        relationship.setAttribute("class", "comments");
        relationship.textContent = parsed[i].relationship;
        const content = comment.appendChild(document.createElement('div'));
        content.setAttribute("class", "content");
        content.textContent = parsed[i].content;
       comment.appendChild(document.createElement('br'));
    }
    
}


const handleInput = async (evt) => {
    evt.preventDefault();
    const category = document.getElementsByClassName('filter')[0].value;
    //console.log("category", category);
    const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({category})
    });
    const parsed = await res.json();
    //console.log("parsed", parsed);
    doFilter(parsed);
}



const main = async () => {
    const filter = document.getElementsByClassName('filterBtn')[0];
    filter.addEventListener('click', handleInput);
    addDeletebutton();
}

main();