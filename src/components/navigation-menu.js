const createFilterMarkup = (filter, isActive) => {
  const {id, name, count} = filter;

  return (`<a href="#${id}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}">${name} ${id !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`);
};

export const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${filterMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
