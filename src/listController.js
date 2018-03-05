export default () => {
  const thumbs = Array.from(document.getElementsByClassName("itemThumb"));
  thumbs.forEach(item => {
    item.addEventListener("click", e => {
      console.log(e);
    });
  });
}
