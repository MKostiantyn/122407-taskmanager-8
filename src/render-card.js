import getCardClasses from './get-card-classes';
import renderCardControlButtons from './render-card-control-buttons';
import renderCardDeadlineDay from './render-card-deadline-day';
import isRepeated from './check-card-repeated';
import renderCardDays from './render-card-days';
import renderCardHashTags from './render-card-hash-tags';
import renderCardColors from './render-card-colors';

export default (data, index) => {
  if (data && Object.keys(data).length) {
    const cardData = {
      controlButtons: renderCardControlButtons(data),
      text: data.title ? data.title : ``,
      dueDateStatus: data.dueDate ? `yes` : `no`,
      dueDateFieldsetStatus: !data.dueDate ? `disabled` : ``,
      dueDate: data.dueDate ? renderCardDeadlineDay(data.dueDate) : ``,
      repeatDaysStatus: data.repeatDays && isRepeated(data.repeatDays) ? `yes` : `no`,
      repeatDaysFieldsetStatus: !data.repeatDays || !isRepeated(data.repeatDays) ? ` disabled` : ``,
      repeatDays: data.repeatDays ? renderCardDays(data.repeatDays, index) : ``,
      hashTags: data.hashTags && data.hashTags.size ? renderCardHashTags(data.hashTags) : ``,
      imageSrc: data.picture ? `src="${data.picture}"` : ``,
      colors: renderCardColors(data.colorClassNames, index)
    };
    return `<article class="${getCardClasses(data)}">
              <form class="card__form" method="get">
                <div class="card__inner">
                  ${cardData.controlButtons}
                  <div class="card__color-bar"><svg class="card__color-bar-wave" width="100%" height="10"><use xlink:href="#wave"></use></svg></div>
                  <div class="card__textarea-wrap">
                      <label>
                          <textarea class="card__text" placeholder="Start typing your text here..." name="text">${cardData.text}</textarea>
                      </label>
                  </div>
                  <div class="card__settings">
                      <div class="card__details">
                          <div class="card__dates">
                              <button class="card__date-deadline-toggle" type="button">date: <span class="card__date-status">${cardData.dueDateStatus}</span></button>
                              <fieldset class="card__date-deadline" ${cardData.dueDateFieldsetStatus}>${cardData.dueDate}</fieldset>
                              <button class="card__repeat-toggle" type="button">repeat:<span class="card__repeat-status">${cardData.repeatDaysStatus}</span></button>
                              <fieldset class="card__repeat-days"${cardData.repeatDaysFieldsetStatus}>
                                  <div class="card__repeat-days-inner">${cardData.repeatDays}</div>
                              </fieldset>
                          </div>
                          <div class="card__hashtag">
                              <div class="card__hashtag-list">${cardData.hashTags}</div>
                              <label><input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"></label>
                          </div>
                      </div>
                      <label class="card__img-wrap">
                          <input type="file" class="card__img-input visually-hidden" name="img">
                          <img ${cardData.imageSrc} alt="Picture Alt" class="card__img">
                      </label>
                      ${cardData.colors}
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
