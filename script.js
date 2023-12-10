var postsData = null;
fetch('https://devhooks.in/api/getarticles')
    .then(data => data.json())
    .then(pData => {
        postsData = pData;        
});

document.getElementById('devsearch').addEventListener("keyup", (event) => {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    const query = event.target.value.toLowerCase();
    const squery = event.target.value.toLowerCase().split(" ");
    if(query.length > 1){
        let catpostsData = postsData.filter(
            (post) =>
            post.status == 1 &&
            squery.every(
                (q) =>
                post.title.toLowerCase().split(" ").includes(q) ||
                post.categories.toLowerCase().split(",").includes(q)
            )
        );
        if (!Object.keys(catpostsData).length) {
            catpostsData = postsData.filter(
            (post) =>
                post.status == 1 &&
                squery.some(
                (q) =>
                    post.title.toLowerCase().split(" ").includes(q) ||
                    post.categories.toLowerCase().split(",").includes(q)
                )
            );
        }
        if (!Object.keys(catpostsData).length) {
            catpostsData = postsData.filter(
            (post) =>
                post.status == 1 &&
                squery.some(
                (q) =>
                    post.title.toLowerCase().includes(q) ||
                    post.categories.toLowerCase().split(",").includes(q)
                )
            );
        }
        let posts = [];
        catpostsData.map((postData, index) => {
            posts.push({ title: postData.title, id: postData.id });
        });
        if(Object.keys(posts).length == 0){
            resultElement.innerHTML += '<li>No Record Found</li>';
        } else {
            posts.forEach(function (data, index) {
                resultElement.innerHTML += '<li><a href="https://devhooks.in/blog/'+data.id+'" title="'+data.title+'" target="_blank">'+data.title+'</a></li>';
            });
        }
                
    }
});