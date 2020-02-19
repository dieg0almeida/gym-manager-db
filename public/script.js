const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a');

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active');
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [];
    let oldPage;

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        // const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        // const pagesBeforesSelectedPage = currentPage >= selectedPage - 2;
        // const firsAndLastPage = currentPage == 1 || currentPage == totalPages;

        if ((currentPage == 1 || currentPage == totalPages) ||
            (currentPage >= selectedPage - 2 && currentPage <= selectedPage + 2)) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...');
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1);
            }

            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}

const pagination = document.querySelector(".pagination");
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const filter = pagination.dataset.filter;

const pages = paginate(page, total);

let elements = '';

for(let page of pages){
    if(String(page).includes('...')){
        elements += `<span>${page}</span>`;
    }else{
        if(filter){
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
        }else{
            elements += `<a href="?page=${page}">${page}</a>`;
        }
        
    }
}

pagination.innerHTML = elements;


console.log(pages);
