import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import react, {Component} from 'react';
import Particles from "react-tsparticles";
import Clarifai, { COLOR_MODEL } from "clarifai";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'

const particleOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

const particlesInit = (main) => {

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};

const app = new Clarifai.App({
  apiKey: '84d1c10644cd403f9e3609224045644a'
});

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (boundingBox) => {
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    console.log(boundingBox);
    const {left_col, right_col, top_row, bottom_row} = boundingBox;
    return {
      leftPos: left_col * width,
      rightPos: width - right_col * width,
      topPos: top_row * height,
      bottomPos: height - bottom_row * height
    }
    
  }

  displayFaceBox = (pos) => {
    this.setState({box: pos});
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onClickDetect = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions[0].region_info.bounding_box)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {
        this.state.route === 'home' 
        ? <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onClickDetect={this.onClickDetect} /> 
            <FaceRecognition boundingBox={this.state.box} inputUrl={this.state.imageUrl}/>          
          </div>
        : (
          this.state.route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange={this.onRouteChange} />)
        }        

        <Particles className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
        />
      </div>      
    );
  }
}

export default App;
