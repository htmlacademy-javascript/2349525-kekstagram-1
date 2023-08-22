export const getTemplateComment = ({avatar, message, name}) => {
  const commentTemplate =
    `<li class="social__comment">
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`;

  return commentTemplate;
};

export const renderComments = (arrayComments) => {
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';

  arrayComments.forEach((elementComments) => {
    const comment = getTemplateComment(elementComments);
    commentsList.insertAdjacentHTML('beforeEnd', comment);
  });
};
