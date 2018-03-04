function playNext() {
  location.href = "http://www.nicovideo.jp/watch/sm32547140";
}

export default () => {
  // 動画ページでなければ終了する
  if (!location.pathname.match(/^\/watch\/sm\d+/)) return;

  window.onload = () => {
    const video = document.querySelector("video");
    video.addEventListener("ended", () => playNext());
  };
}
