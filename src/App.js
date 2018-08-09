import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer';
import PlayButton from './PlayButton';
import { Storage } from 'aws-amplify';
import { Greetings } from 'aws-amplify-react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';

Storage.configure({ level: 'private' });

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      files: [],
      src: '',
      src: 'https://vimeo.com/260885549',
      name: '',
      loggedIn: null,
      autoplay: false,
    };
  }

  async componentDidMount() {
    const files = await Storage.list('');
    this.setState({ files: [...this.state.files, ...files] });
  }

  playVideo = (evt, src, name, autoplay) => {
    evt.preventDefault();
    this.setState({ src, name, autoplay });
  };

  deleteVideo = (evt, src, name, index) => {
    evt.preventDefault();
    Storage.remove(name, { level: 'private' }).then(response => {
      this.setState({
        files: [...this.state.files.slice(0, index), ...this.state.files.slice(index + 1)],
      });
    });
  };

  uploadVideo = evt => {
    evt.preventDefault();
    const file = this.fileInput.current.files[0];
    Storage.put(file.name, file).then(response => {
      console.log('Storage.put', { response });
      this.setState({ files: [...this.state.files, response] });
    });
    evt.target.getElementsByClassName('form-control-file')[0].value = '';
  };

  uploadForm() {
    return (
      <form className="uploadform d-flex flex-column mb-2 p-20" onSubmit={this.uploadVideo}>
        <label htmlFor="fileInput">
          <strong>
            <u> UPLOAD VIDEOS </u>
          </strong>
        </label>
        <div className="form-group">
          <input type="file" className="form-control-file" accept="video/*" id="fileInput" ref={this.fileInput} />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    );
  }

  navbar() {
    return (
      <Navbar color="light" light expand="lg" className="w-100">
        <NavbarBrand href="/">VidUp</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <Greetings onStateChange={this.props.handleAuthStateChange} />
        </Nav>
      </Navbar>
    );
  }

  playlist() {
    return (
      <div className="">
        <h1 className="playlist display-3 mb-5 p-5 "> Playlist</h1>
        <ul className="filelists d-flex flex-column align-items-baseline h-100 list-inline">
          {this.state.files.map((file, index) => {
            return (
              <PlayButton
                s3key={file.key}
                key={file.key}
                index={index}
                playVideo={this.playVideo}
                deleteVideo={this.deleteVideo}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <section className="App d-flex flex-column">
        {this.navbar()}

        <div className="App-images p-3 d-flex flex-row w-100">
          <div className="videoplayer">
            <VideoPlayer url={this.state.src} autoplay={this.state.autoplay} />
            <h1>
              <span>{this.state.name}</span>
            </h1>
          </div>

          <div className="d-flex flex-column p-3 ml-4">
            {this.uploadForm()}
            {this.playlist()}
          </div>
        </div>
      </section>
    );
  }
}

export default App;
