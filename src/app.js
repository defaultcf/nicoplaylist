import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFlag: false,
      douga: [],
    };
  }

  fetchList() {
    if (localStorage.getItem("NicoPlayList") === null) {
      localStorage.setItem("NicoPlayList", JSON.stringify([]));
    } else {
      this.setState({ douga: JSON.parse(localStorage.getItem("NicoPlayList")) });
    }
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
          this.setState({ douga: [...this.state.douga, id] });
        }
      });
    });
  }

  playerJump() {
    if (!location.pathname.match(/^\/watch\/sm\d+/)) return;

    const video = document.querySelector("video");
    video.autoplay = true;
    video.addEventListener("ended", () => {
      const id = this.state.douga[0];
      this.setState({ douga: this.state.douga.slice(1, this.state.douga.length) });
      location.href = `http://www.nicovideo.jp/watch/${id}`;
    });
  };

  componentDidMount() {
    this.fetchList();
    this.addList();
    this.playerJump();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.keyFlag || nextState.douga === undefined) return;
    localStorage.setItem("NicoPlayList", JSON.stringify(nextState.douga));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.douga.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
