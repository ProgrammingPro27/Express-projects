function createPagination(parent) {
  parent.innerHTML += `<section class="pagination">
  <button id="pg-button-prev" type="button" class="pagination__button">
    <i class="fa fa-chevron-left"></i>
  </button>

  <ul class="pagination__list">
    <li class="pagination__item pagination__item--1">
      <button id="pg-button-1" type="button">1</button>
    </li>
    <li class="pagination__item pagination__item--2">
      <button id="pg-button-2" type="button">2</button>
    </li>
    <li class="pagination__item pagination__item--3">
      <button id="pg-button-3" type="button">3</button>
    </li>
    <li class="pagination__item pagination__item--4">
      <button id="pg-button-4" type="button">4</button>
    </li>
    <li class="pagination__item pagination__item--5">
      <button id="pg-button-5" type="button">5</button>
    </li>
  </ul>

  <button id="pg-button-next" type="button" class="pagination__button">
    <i class="fa fa-chevron-right"></i>
  </button>
</section>`
}
createPagination(document.body)
let totalItems = 6;
let itemsPerPage = 5;
let totalPages = Math.ceil(totalItems / itemsPerPage);
const maxButtons = 5;
const state = {
  currentPage: 1
};
const BUTTON_PREV = document.querySelector('#pg-button-prev');
const BUTTON_NEXT = document.querySelector('#pg-button-next');
const BUTTONS = [
  document.querySelector('#pg-button-1'),
  document.querySelector('#pg-button-2'),
  document.querySelector('#pg-button-3'),
  document.querySelector('#pg-button-4'),
  document.querySelector('#pg-button-5')
];



function updatePagination(currentPage = 1, BUTTONS, prevPage = 1) {
  fetch(`/people?p=${state.currentPage - 1}`)//here is the query param
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("body > div.wrapper").innerHTML = ""
      console.log(data)
      totalItems = data.count
      itemsPerPage = data.booksPerPage
      totalPages = Math.ceil(totalItems / itemsPerPage);
      for (let i = 0; i < data.books.length; i++) {
        createCard(data.books[i].name, data.books[i].age, data.books[i].gender);
      }
    }
    ).then((data) => {
      if (totalItems === 0) {
        BUTTONS.forEach((btn, index) => {
          if (index === 0) {
            btn.removeAttribute('data-level');
            btn.textContent = 1;
            btn.dataset.level = 'target';
            btn.innerHTML = '<strong>1</strong>';
          } else {
            btn.parentElement.style.display = 'none';
          }
        });
        return;
      }

      let startPage = 1;
      let endPage = totalPages;

      if (totalPages > maxButtons) {
        // Limit the number of buttons to maxButtons
        if (currentPage <= Math.floor(maxButtons / 2) + 1) {
          endPage = maxButtons;
        } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
          startPage = totalPages - maxButtons + 1;
        } else {
          startPage = currentPage - Math.floor(maxButtons / 2);
          endPage = currentPage + Math.floor(maxButtons / 2);
        }
      }

      BUTTONS.forEach((btn, index) => {
        const pageNumber = startPage + index;
        if (pageNumber <= endPage) {
          btn.removeAttribute('data-level');
          btn.textContent = pageNumber;
          btn.style.display = 'inline';
        } else {
          btn.parentElement.style.display = 'none';
        }
      });

      const targetedPage = currentPage - startPage;
      BUTTONS[targetedPage].dataset.level = 'target';
      const tempPageContent = BUTTONS[targetedPage].textContent;
      BUTTONS[targetedPage].innerHTML = `<strong>${tempPageContent}</strong>`;


    });

}

(function () {
  function _eventPagination(btn) {
    btn.addEventListener('click', () => {
      const lastPage = state.currentPage;
      state.currentPage = parseInt(btn.textContent);
      updatePagination(state.currentPage, BUTTONS, lastPage);
    }, false);
  }

  updatePagination(state.currentPage, BUTTONS);

  BUTTONS.forEach((btn) => _eventPagination(btn));

  BUTTON_PREV.onclick = () => {
    if (state.currentPage > 1) {
      const lastPage = state.currentPage;
      state.currentPage--;
      updatePagination(state.currentPage, BUTTONS, lastPage);
    }
  };

  BUTTON_NEXT.onclick = () => {
    if (state.currentPage < Math.ceil(totalItems / itemsPerPage)) {
      const lastPage = state.currentPage;
      state.currentPage++;
      updatePagination(state.currentPage, BUTTONS, lastPage);
    }
  };
})();