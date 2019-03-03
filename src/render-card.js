import getCardClasses from './get-card-classes';
import renderCardControlButtons from './render-card-control-buttons';
import renderCardDeadlineDay from './render-card-deadline-day';
import isRepeated from './check-card-repeated';
import renderCardDays from './render-card-days';
import renderCardHashTags from './render-card-hash-tags';
import renderCardColors from './render-card-colors';

export default (data, index) => {
  if (data && Object.keys(data).length) {
    return `<article class="${getCardClasses(data)}">
              <form class="card__form" method="get">
                <div class="card__inner">
                  <div class="card__control">${renderCardControlButtons(data.controlButtons)}</div>
                  <div class="card__color-bar"><svg class="card__color-bar-wave" width="100%" height="10"><use xlink:href="#wave"></use></svg></div>
                  <div class="card__textarea-wrap">
                      <label>
                          <textarea class="card__text" placeholder="Start typing your text here..." name="text">${data.text ? data.text : ``}</textarea>
                      </label>
                  </div>
                  <div class="card__settings">
                      <div class="card__details">
                          <div class="card__dates">
                              <button class="card__date-deadline-toggle" type="button">date: <span class="card__date-status">${data.dueDate ? `yes` : `no`}</span></button>
                              <fieldset class="card__date-deadline" ${!data.dueDate ? `disabled` : ``}>${data.dueDate ? renderCardDeadlineDay(data.dueDate) : ``}</fieldset>
                              <button class="card__repeat-toggle" type="button">repeat:<span class="card__repeat-status">${data.repeatDays && isRepeated(data.repeatDays) ? `yes` : `no`}</span></button>
                              <fieldset class="card__repeat-days"${!data.repeatDays || !isRepeated(data.repeatDays) ? ` disabled` : ``}>
                                  <div class="card__repeat-days-inner">${data.repeatDays ? renderCardDays(data.repeatDays, index) : ``}</div>
                              </fieldset>
                          </div>
                          <div class="card__hashtag">
                              <div class="card__hashtag-list">${data.hashTags && data.hashTags.size ? renderCardHashTags(data.hashTags) : ``}</div>
                              <label><input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"></label>
                          </div>
                      </div>
                      <label class="card__img-wrap">
                          <input type="file" class="card__img-input visually-hidden" name="img">
                          <img ${data.image ? `src="${data.image.src}" alt="${data.image.alt}"` : ``} class="card__img">
                      </label>
                      ${renderCardColors(data.colorClassNames, index)}
                  </div>
                  <div class="card__status-btns">
                      <button class="card__save" type="submit">save</button>
                      <button class="card__delete" type="button">delete</button>
                  </div>
                </div>
              </form>
            </article>`;
  }
  return ``;
};
