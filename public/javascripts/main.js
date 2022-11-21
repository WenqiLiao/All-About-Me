const doFilter = async(parsed) => {

    /*
    const res = await fetch('/api/category');
    console.log("res", res);
    const comments = await res.json();
    console.log("comments", comments);
    */
    //delete all rows first

    let table = document.getElementsByClassName('commentsTable')[0];
    table.innerHTML = '';

    for (let i = 0; i < parsed.length; i++) {
        const comment = table.appendChild(document.createElement('div'));
        const author = comment.appendChild(document.createElement('div'));
        author.textContent = parsed[i].authorName;
        const horoscope = comment.appendChild(document.createElement('div'));
        horoscope.textContent = parsed[i].horoscope;
        const relationship = comment.appendChild(document.createElement('div'));
        relationship.textContent = parsed[i].relationship;
        const content = comment.appendChild(document.createElement('div'));
        content.textContent = parsed[i].content;
       comment.appendChild(document.createElement('br'));
    }
}


const handleInput = async (evt) => {
    evt.preventDefault();
    const category = document.getElementsByClassName('filter')[0].value;
    console.log("category", category);
    const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({category})
    });
    const parsed = await res.json();
    console.log("parsed", parsed);
    doFilter(parsed);
}



const main = async () => {
    const filter = document.getElementsByClassName('filterBtn')[0];
    filter.addEventListener('click', handleInput);
}

main();