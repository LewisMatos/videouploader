import React, { Component } from 'react';
import './App.css';
import { Storage, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

Storage.configure({ level: 'private' });

class S3Image extends Component {
  state = { src: null };

  async componentDidMount() {
    const { s3key } = this.props;
    const src = await Storage.get(s3key);
    this.setState({ src });
  }

  render() {
    const { src } = this.state;
    if (!src) return null;
    return (
      <article>
        <img src={src} />
      </article>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  state = {
    files: [],
  };

  async componentDidMount() {
    Auth.signOut();
    const files = await Storage.list('');
    this.setState({ files });
  }

  handleSubmit = event => {
    event.preventDefault();
    const file = this.fileInput.current.files[0];

    Storage.put(file.name, file).then(response => {
      debugger;
      console.log('Storage.put', { response });
      this.setState({ files: [this.state.files, response] });
    });
  };

  render() {
    return (
      <div className="App">
        <form className="NewItem" onSubmit={this.handleSubmit}>
          <input type="file" ref={this.fileInput} />
          <input className="full-width" type="submit" />
        </form>
        <section className="App-images">
          {this.state.files.map(file => {
            console.log(file);
            debugger;
            return <S3Image s3key={file.key} key={file.key} />;
          })}
        </section>
      </div>
    );
  }
}

export default withAuthenticator(App);
