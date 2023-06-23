import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, userPosts } from "../index.js";
import { deletePost, dislikeFetchFunction, likeFetchFunction } from "../api.js";
import { getToken } from "../index.js";


function likesFunction(token, page, data) {
  const likeButtons = document.querySelectorAll('.like-button');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      let id = likeButton.dataset.postId;
      if (likeButton.dataset.liked == 'false') {
        likeFetchFunction({ id, token: getToken() }).then(() => {
          goToPage(page, data)
        }).catch((error) => {
          alert(error.message)
        })
      } else {
        dislikeFetchFunction({ id, token: getToken() }).then(() => {
          goToPage(page, data)
        }).catch((error) => {
          alert(error.message)
        })
      }
    });
  }
}

export function renderPostsPageComponent({ appEl, token }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const postsHtml = posts.map((post) => {
    return `<li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
        <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
        ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}
      </button>
      <p class="post-likes-text">Нравится: 
        <strong>  ${post.likes.length === 0
        ? 0
        : post.likes[post.likes.length - 1].name + ((post.likes.length > 1) ? ' и ещё ' + (post.likes.length - 1) : '')}
        </strong>
      </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          19 минут назад
        </p>
      </li>`
  }).join('')



  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  const page = POSTS_PAGE;

  likesFunction(token, page, { notIsLoad: true })

}

export function renderUserPostsPageComponent({ appEl, user, token }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  let userPostsHtml = userPosts.map((post) => {
    return `<li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
        <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
        ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}
      </button>
      <p class="post-likes-text">Нравится: 
        <strong>  ${post.likes.length === 0
        ? 0
        : post.likes[post.likes.length - 1].name + ((post.likes.length > 1) ? ' и ещё ' + (post.likes.length - 1) : '')}
        </strong>
      </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
        <p class="post-date" style="display: flex; justify-content: space-between;">
        здесь надо указать сколько времени  
        назад
        ${user?._id == post.user.id ? `<button class="delete-button button" data-post-id="${post.id}">
        Удалить пост
        </button>` : ``}
      </p>
        </p>
      </li>`
  }).join('')



  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${userPostsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  const page = USER_POSTS_PAGE;

  let data = {
    userId: userPosts[0]?.user.id,
    notIsLoad: true
  }

  likesFunction(token, page, data)

  let deleteButtons = document.querySelectorAll('.delete-button');
  for (const deleteButton of deleteButtons) {
    let id = deleteButton.dataset.postId;
    deleteButton.addEventListener('click', () => {
      deletePost({
        id,
        token: getToken(),
      })
      .then(() => {
        goToPage(USER_POSTS_PAGE, data);
      })
    })
  }
}

