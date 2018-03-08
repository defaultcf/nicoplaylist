import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from './list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFlag: false,
      hideWindow: true,
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
          const url = item.querySelector(".itemTitle a").getAttribute("href");
          const title = item.querySelector(".itemTitle a").innerHTML;
          const img = item.querySelector(".thumb").src;
          this.storeDouga([...this.state.douga, {url, title, img}]);
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
      const { url } = this.state.douga[0];
      this.storeDouga(this.state.douga.slice(1, this.state.douga.length));
      location.href = url;
    });
  };

  componentDidMount() {
    this.fetchList();
    this.addList();
    this.playerJump();
  }

  render() {
    const calcWindowClassName = () => {
      let className = [];
      if (this.state.hideWindow) className.push("npl-hide");
      if (this.state.keyFlag) className.push("npl-border");
      return className.join(" ");
    }

    const toggleWindow = () => {
      this.setState({"hideWindow": !this.state.hideWindow});
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      this.setState({
        douga: arrayMove(this.state.douga, oldIndex, newIndex),
      });
    };

    return (
      <div id="nicoplaylist" className={calcWindowClassName()}>
        <div id="npl-header">
          <button onClick={toggleWindow}>
            &minus;
          </button>
        </div>

        <SortableList items={this.state.douga} onSortEnd={onSortEnd} />
      </div>
    );
  }
}

export default App;
