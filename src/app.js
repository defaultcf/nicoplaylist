import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFlag: false,
      douga: [],
    };
  }

  addList() {
    document.addEventListener("keydown", e => {
      if (e.key === "a") this.setState({ keyFlag: true });
    });
    document.addEventListener("keyup", e => {
      this.setState({ keyFlag: false });
    });

    const thumbs = Array.from(document.getElementsByClassName("itemThumb"));
    thumbs.forEach(item => {
      item.addEventListener("click", e => {
        if (this.state.keyFlag) {
          e.preventDefault();
          const id = item.getAttribute("data-id");
          const preventList = JSON.parse(localStorage.getItem("NicoPlayList")).douga;
          const list = { douga: [...preventList, id] };
          localStorage.setItem("NicoPlayList", JSON.stringify(list));
        }
      });
    });
  }

  playerJump() {
    if (!location.pathname.match(/^\/watch\/sm\d+/)) return;

    const video = document.querySelector("video");
    video.addEventListener("ended", () => {
      location.href = "http://www.nicovideo.jp/watch/sm32547140";
    });
  };

  componentDidMount() {
    this.addList();
    this.playerJump();
    if (localStorage.getItem("NicoPlayList") === null)
      localStorage.setItem("NicoPlayList", JSON.stringify({douga: []}));
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
