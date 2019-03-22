import {getTaskClasses} from './get-task-classes';
import {renderTaskDueDay} from './render-task-due-date';
import {isRepeated} from './check-task-repeated';
import {renderTaskRepeatingDays} from './render-task-repeating-days';
import {renderTaskHashTags} from './render-task-hash-tags';
import {renderTaskColors} from './render-task-colors';

export const renderTask = (data) => {
  if (data && Object.keys(data).length) {
    const taskData = {
      classes: getTaskClasses(data.colorClassName, data.repeatingDays, data.dueDate),
      disabledClassArchive: data.isDone ? ` card__btn--disabled` : ``,
      disabledClassFavorites: data.isFavorite ? ` card__btn--disabled` : ``,
      title: data.title ? data.title : `Default task title`,
      dueDateStatus: data.dueDate ? `yes` : `no`,
      dueDateFieldsetStatus: !data.dueDate ? `disabled` : ``,
      dueDate: renderTaskDueDay(data.dueDate),
      repeatingDaysStatus: data.repeatingDays && isRepeated(data.repeatingDays) ? `yes` : `no`,
      repeatingDaysFieldsetStatus: !data.repeatingDays || !isRepeated(data.repeatingDays) ? ` disabled` : ``,
      repeatingDays: data.repeatingDays ? renderTaskRepeatingDays(data.repeatingDays) : ``,
      hashTags: data.hashTags && data.hashTags.size ? renderTaskHashTags(data.hashTags) : ``,
      imageSrc: data.picture ? `src="${data.picture}"` : ``,
      colors: renderTaskColors(data.colorClassName)
    };
    return `<article class="${taskData.classes}">
              <form class="card__form" method="get">
                <div class="card__inner">
                  <div class="card__control">
                      <button type="button" class="card__btn card__btn--edit card__btn--disabled">Edit</button>
                      <button type="button" class="card__btn card__btn--archive${taskData.disabledClassArchive}">Archive</button>
                      <button type="button" class="card__btn card__btn--favorites${taskData.disabledClassFavorites}">Favorites</button>
                  </div>
                  <div class="card__color-bar"><svg class="card__color-bar-wave" width="100%" height="10"><use xlink:href="#wave"></use></svg></div>
                  <div class="card__textarea-wrap">
                      <label>
                          <textarea class="card__text" placeholder="Start typing your text here..." name="text">${taskData.title}</textarea>
                      </label>
                  </div>
                  <div class="card__settings">
                      <div class="card__details">
                          <div class="card__dates">
                              <button class="card__date-deadline-toggle" type="button">date: <span class="card__date-status">${taskData.dueDateStatus}</span></button>
                              <fieldset class="card__date-deadline" ${taskData.dueDateFieldsetStatus}>${taskData.dueDate}</fieldset>
                              <button class="card__repeat-toggle" type="button">repeat:<span class="card__repeat-status">${taskData.repeatingDaysStatus}</span></button>
                              <fieldset class="card__repeat-days"${taskData.repeatingDaysFieldsetStatus}>
                                  <div class="card__repeat-days-inner">${taskData.repeatingDays}</div>
                              </fieldset>
                          </div>
                          <div class="card__hashtag">
                              <div class="card__hashtag-list">${taskData.hashTags}</div>
                              <label><input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"></label>
                          </div>
                      </div>
                      <label class="card__img-wrap">
                          <input type="file" class="card__img-input visually-hidden" name="img">
                          <img ${taskData.imageSrc} alt="Picture Alt" class="card__img">
                      </label>
                      ${taskData.colors}
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
