export const renderTaskHashTags = (dateSet) => {
  const hashTagTemplate = (name) => `<span class="card__hashtag-inner">
                                      <input type="hidden" name="hashtag" value="${name}" class="card__hashtag-hidden-input">
                                      <button type="button" class="card__hashtag-name">#${name}</button>
                                      <button type="button" class="card__hashtag-delete">delete</button>
                                    </span>`;

  return Array
    .from(dateSet.values())
    .reduce((currentValue, element) => currentValue + hashTagTemplate(element), ``);
};
