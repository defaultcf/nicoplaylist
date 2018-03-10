import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from './list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFlag: false,
      hideWindow: true,
      hideWindowFlag: true,
      douga: [],
    };
  }

  storeDouga(douga) {
    this.setState({ douga: douga });
    localStorage.setItem("NicoPlayList", JSON.stringify(douga));
  }

  fetchList() {
    if (localStorage.getItem("NicoPlayList") === null)
      localStorage.setItem("NicoPlayList", JSON.stringify([]));
    else
      this.storeDouga(JSON.parse(localStorage.getItem("NicoPlayList")))

    window.addEventListener("storage", e => {
      if (e.key === "NicoPlayList")
        this.setState({ douga: JSON.parse(e.newValue) });
    }, false)
  }

  addList() {
    const items = Array.from(document.getElementsByClassName("item"));

    document.addEventListener("keydown", e => {
      if (e.key === "a") {
        this.setState({ keyFlag: true });
        items.map(item => {
          item.classList.add("npl-addmode");
        });
      }

      if (e.key === "q" && this.state.hideWindowFlag) {
        this.setState({ hideWindow: !this.state.hideWindow });
        this.setState({ hideWindowFlag: false });
      }
    });
    document.addEventListener("keyup", e => {
      if (e.key === "a") {
        this.setState({ keyFlag: false });
        items.map(item => {
          item.classList.remove("npl-addmode");
        });
      }

      if (e.key === "q") {
        this.setState({ hideWindowFlag: true });
      }
    });

    items.forEach(item => {
      item.addEventListener("click", e => {
        if (this.state.keyFlag) {
          e.preventDefault();
          const url = item.querySelector(".itemTitle a").href;
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
    video.play();
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
    const toggleWindow = () => {
      this.setState({"hideWindow": !this.state.hideWindow});
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      this.storeDouga(arrayMove(this.state.douga, oldIndex, newIndex))
    };

    const clearAll = () => {
      if (window.confirm("リスト内の動画を全て削除します")) this.storeDouga([]);
    };

    return (
      <div id="nicoplaylist" className={this.state.hideWindow ? "npl-hide" : ""}>
        <div id="npl-header">
          <button onClick={toggleWindow}>&minus;</button>
          <span>リスト</span>
          <button onClick={clearAll}>全て消す</button>
          <span>{this.state.douga.length}件</span>
        </div>

        <SortableList items={this.state.douga} onSortEnd={onSortEnd} useDragHandle={true} />
      </div>
    );
  }
}

export default App;
