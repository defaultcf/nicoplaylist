import React from 'react';

const playNext = () => {
  location.href = "http://www.nicovideo.jp/watch/sm32547140";
};

const playerJump = () => {
  // 動画ページでなければ終了する
  if (!location.pathname.match(/^\/watch\/sm\d+/)) return;

  const video = document.querySelector("video");
  video.addEventListener("ended", playNext);
};

class App extends React.Component {
  componentDidMount() {
    playerJump();
  }

  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  }
}

export default App;
