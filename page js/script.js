let block = document.getElementById('block')
let block1 = document.getElementById('block1')
let countNumber = document.getElementById('selectValue')
let searchInp = document.getElementById('searchInp')
let currentIte
let postsArr = []


function getPosts(numberCount = 1) {
    console.log(countNumber.value);
    currentIte = numberCount
    axios({
        url: `https://jsonplaceholder.typicode.com/posts?_page=${numberCount}&_limit=${countNumber.value}&body_like=${searchInp.value}&title_like=${searchInp.value}`,
        method: "get"
    }).then(res => {
        postsArr = res.data
        getButton(res.headers['x-total-count']);
        draw()
    })
}
function draw() {
    let summ = ''
    for (i = 0; i < postsArr.length; i++) {
        summ += `<div class="col-md-3 col-3" >
        <div class="card">
            <div class="card-header">
            ${postsArr[i].id + ")  " + postsArr[i].title}
            </div>
            <div class="card-body">
            ${postsArr[i].body}
            </div>
        </div>
        </div>`
    }
    block.innerHTML = summ
}
function getButton(count) {
    let number = count / countNumber.value
    let summ = ''
    for (i = 0; i < number; i++) {
        summ += `<button class="${i + 1 == currentIte ? "box" : ""}" onclick="getPosts(${i + 1})">${i + 1}</button>`
    }
    block1.innerHTML = summ
}
getPosts()
