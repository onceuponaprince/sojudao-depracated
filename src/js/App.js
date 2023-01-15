import '../styles/App.scss';

import React, {
  Component,
  useEffect,
  useState,
} from 'react';

import CanvasDraw from 'react-canvas-draw';
import { HexColorPicker } from 'react-colorful';

export default function App() {
  const [color, setColor] = useState('#aabbcc')

  return (
    <div className='App' id='root'>
      <Hero />
      <Body />
      <Notepad color={color} />
      <Picker handleColor={setColor} color={color} />
      <Footer />
    </div>
  )
}

const Body = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Connect',
      main: 'Have a drink, socialize, make friends, and have a good time. Connect with the most influential people in Web2 and Web3.',
      link: '',
      image: '',
      image2: '',
      alt_text: '',
      alt_text2: '',
    },
    {
      id: '2',
      name: 'Learn',
      main: 'Have a drink, socialize, make friends, and have a good time. Connect with the most influential people in Web2 and Web3.',
      link: '',
      image: '',
      image2: '',
      alt_text: '',
      alt_text2: '',
    },
    {
      id: '3',
      name: 'Create',
      main: 'Have a drink, socialize, make friends, and have a good time. Connect with the most influential people in Web2 and Web3.',
      link: '',
      image: '',
      image2: '',
      alt_text: '',
      alt_text2: '',
    },
  ])
  return (
    <main>
      <div>
        {' '}
        {items.map(function (item) {
          return <div key={item.id}> {item.name} </div>
        })}{' '}
      </div>{' '}
    </main>
  )
}
const Hero = () => {
  return (
    <header>
      <div>
        <img />
        <div>
          Connect. <br />
          Learn. <br />
          Create.{' '}
        </div>{' '}
      </div>{' '}
    </header>
  )
}

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return width
}

const Notepad = (props) => {
  const width = useWindowWidth()
  return (
    <div>
      {' '}
      {width > 600 ? (
        <div>
          <Draw color={props.color} />
        </div>
      ) : null}{' '}
    </div>
  )
}

class Draw extends Component {
  state = {
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 1,
    color: this.props.color,
  }
  render() {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              localStorage.setItem(
                'savedDrawing',
                this.saveableCanvas.getSaveData()
              )
            }}
          >
            Save{' '}
          </button>{' '}
          <button
            onClick={() => {
              this.saveableCanvas.eraseAll()
            }}
          >
            Erase{' '}
          </button>{' '}
          <button
            onClick={() => {
              this.saveableCanvas.undo()
            }}
          >
            Undo{' '}
          </button>{' '}
          <button
            onClick={() => {
              console.log(this.saveableCanvas.getDataURL())
              alert('DataURL written to console')
            }}
          >
            GetDataURL{' '}
          </button>{' '}
          <div>
            <label> Width: </label>{' '}
            <input
              type='number'
              value={this.state.width}
              onChange={(e) =>
                this.setState({ width: parseInt(e.target.value, 10) })
              }
            />{' '}
          </div>{' '}
          <div>
            <label> Height: </label>{' '}
            <input
              type='number'
              value={this.state.height}
              onChange={(e) =>
                this.setState({ height: parseInt(e.target.value, 10) })
              }
            />{' '}
          </div>{' '}
          <div>
            <label> Brush - Radius: </label>{' '}
            <input
              type='number'
              value={this.state.brushRadius}
              onChange={(e) =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />{' '}
          </div>{' '}
          <div>
            <label> Lazy - Radius: </label>{' '}
            <input
              type='number'
              value={this.state.lazyRadius}
              onChange={(e) =>
                this.setState({ lazyRadius: parseInt(e.target.value, 10) })
              }
            />{' '}
          </div>{' '}
        </div>{' '}
        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushColor={this.props.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />{' '}
      </div>
    )
  }
}

const Picker = (props) => {
  return (
    <div>
      <HexColorPicker color={props.color} onChange={props.handleColor} />; The current color
      is: {props.color}{' '}
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <h2> Contact Us </h2>{' '}
      <section>
        <ul className='social-links'>
          <li>
            <a href='#'>
              <img alt='sns logos go here' width={16} />{' '}
            </a>{' '}
          </li>{' '}
          <li>
            <a href='#'>
              <img alt='sns logos go here' width={16} />{' '}
            </a>{' '}
          </li>{' '}
          <li>
            <a href='#'>
              <img alt='sns logos go here' width={16} />{' '}
            </a>{' '}
          </li>{' '}
        </ul>{' '}
      </section>{' '}
      <small> Copyright 2022 </small>{' '}
    </footer>
  )
}
