
import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { addPost } from "../api.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {



  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <p class="form-title">Добавить пост</p>
      <div class="upload-image-container"></div>
      <p class="form-title-small"> Опишите фотографию:</p>
      <textarea name="" id="" class="add-post-text" rows="4"></textarea>
      <button class="button add-post-button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
    let description = document.getElementById("")
    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
