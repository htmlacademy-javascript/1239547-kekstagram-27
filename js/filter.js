const ACTIVE_FILTER = 'img-filters__button--active';

const filterElement = document.querySelector('.img-filters');
const allFilterButtonElement = document.querySelectorAll('.img-filters__button');

const showFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
};

const changeFilter = (photos) => {
  allFilterButtonElement.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      filterElement.querySelector(`.${ACTIVE_FILTER}`).classList.remove(ACTIVE_FILTER);
      evt.target.classList.add(ACTIVE_FILTER);
      photos();
    });
  });
};

export {showFilter, changeFilter};
