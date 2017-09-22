import React, { Component } from 'react';
import axios from 'axios';
import './style.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        name : '',
        image : '',
        bio : ''
    }
  }

  get_user(){
    const term = this.refs.search.value;
    axios.get(`https://api.github.com/users/${term}`)
    .then (response => {
      console.log(response.data);
      const op = response.data;
      const data = {name: op.login, image: op.avatar_url, bio: op.bio};
      this.setState({name: op.login, image: op.avatar_url, bio: op.bio});
      console.log(this.state);
      }
    )
    .catch (error => {
      console.log('Error');
      }
    )
  }

  render() {
    const {name, image, bio} = this.state;
    return (
      <div className="body">
        <div className="search">
            <input type="text" ref="search" placeholder="Github Username" />
            <button type="button" onClick={this.get_user.bind(this)}>Search</button>
        </div>
        
        {name ? <Box name={name} image={image} bio={bio} /> : ''}
      </div>
    );
  }
}

class Box extends Component {
  render() {
    return (
      <div className="box">
        <img src={this.props.image} />
        <h1>{this.props.name}</h1>
        <p>{this.props.bio != 'null' ? this.props.bio : '' }</p>
      </div>
    )
  }
}

export default App;
