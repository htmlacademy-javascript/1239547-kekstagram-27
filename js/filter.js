const ACTIVE_FILTER = 'img-filters__button--active';

const filter = document.querySelector('.img-filters');
const allFilterButton = document.querySelectorAll('.img-filters__button');

const showFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

const changeFilter = (photos) => {
  allFilterButton.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      filter.querySelector(`.${ACTIVE_FILTER}`).classList.remove(ACTIVE_FILTER);
      evt.target.classList.add(ACTIVE_FILTER);
      photos();
    });
  });
};

export {showFilter, changeFilter};
