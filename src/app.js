import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFlag: false,
      douga: [],
    };
  }

  storeDouga(douga) {
    this.setState({ douga: douga });
    localStorage.setItem("NicoPlayList", JSON.stringify(douga));
  }

  fetchList() {
    if (localStorage.getItem("NicoPlayList") === null) {
      localStorage.setItem("NicoPlayList", JSON.stringify([]));
    } else {
      this.storeDouga(JSON.parse(localStorage.getItem("NicoPlayList")))
    }

    window.addEventListener("storage", e => {
      if (e.key === "NicoPlayList") {
        this.setState({ douga: JSON.parse(e.newValue) });
      }
    }, false)
  }

  addList() {
    document.addEventListener("keydown", e => {
      if (e.key === "a") this.setState({ keyFlag: true });
    });
    document.addEventListener("keyup", e => {
      this.setState({ keyFlag: false });
    });

    const items = Array.from(document.getElementsByClassName("item"));
    items.forEach(item => {
      item.addEventListener("click", e => {
        if (this.state.keyFlag) {
          e.preventDefault();
          const id = item.querySelector(".itemThumb").getAttribute("data-id");
          const title = item.querySelector(".itemTitle a").innerHTML;
          const img = item.querySelector(".thumb").src;
          const douga = [...this.state.douga, {id, title, img}];
          this.storeDouga(douga);
        }
      });
    });
  }

  playerJump() {
    if (!location.pathname.match(/^\/watch\/sm\d+/)) return;

    const video = document.querySelector("video");
    video.autoplay = true;

    video.addEventListener("timeupdate", () => {});

    video.addEventListener("ended", () => {
      if (this.state.douga.length === 0) return;
      const { id } = this.state.douga[0];
      this.storeDouga(this.state.douga.slice(1, this.state.douga.length));
      location.href = `http://www.nicovideo.jp/watch/${id}`;
    });
  };

  componentDidMount() {
    this.fetchList();
    this.addList();
    this.playerJump();
  }

  render() {
    return (
      <div>
        {this.state.douga.map((item, key) => (
          <div key={key}>
            <a href={`http://www.nicovideo.jp/watch/${item.id}`}>
              <img src={item.img} />
              <p>{item.title}</p>
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
