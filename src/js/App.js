import '../styles/App.scss'

import React, { Component, useEffect, useState } from 'react'

import CanvasDraw from 'react-canvas-draw'
import { HexColorPicker } from 'react-colorful'
import sdlogo from '../assets/soju_dao.png'
import bottles from '../assets/beer_bottles.png'
import vase from '../assets/vase.jpg'
import cafe from '../assets/cafe.jpg'
import painting from '../assets/painting.jpg'

export default function App() {
  return (
    <div className='App' id='root'>
      <Hero />
      <Body />
      <Playground />
      <Footer />
    </div>
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

const resizableWindow = () => {
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 1.1
  })
  useEffect(() => {
    const handleResize = ()  =>
      setDimensions({
        height: window.innerHeight / 1.8,
        width: window.innerWidth / 1.1
      })
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })
    return dimensions
}

const Hero = () => {
  const width = useWindowWidth()
  return (
    <header>
      {width > 600 ? (
        <div>
          <img />
          <div>
            Connect. <br />
            Learn. <br />
            Create.
          </div>
        </div>
      ) : (
        <div>
          <a href='#'>
            <img src={sdlogo} alt='SojuDAO Logo' className='logo' width={344} />
          </a>
          <div className='intro_container'>
            <p className='intro'>
              Sojudao is a digital lifestyle and social dao committed to
              expanding korea's web3 ecosystem.
            </p>
            <a href='#'>join the fun</a>
            <img src={bottles} alt='bottles' width={380} />
          </div>
        </div>
      )}
    </header>
  )
}

const Body = () => {
  const width = useWindowWidth()
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Connect',
      main: 'Have a drink, socialize, make friends, and have a good time. Connect with the most influential people in Web2 and Web3.',
      link: '',
      image: cafe,
      image2: '',
      alt_text: '',
      alt_text2: '',
      width: 380,
    },
    {
      id: '2',
      name: 'Learn',
      main: 'Have a drink, socialize, make friends, and have a good time. Connect with the most influential people in Web2 and Web3.',
      link: '',
      image: vase,
      image2: '',
      alt_text: '',
      alt_text2: '',
      width: 380,
    },
    {
      id: '3',
      name: 'Create',
      main: 'Have a drink, socialize, make friends, and have a good time. Connect with the most influential people in Web2 and Web3.',
      link: '',
      image: painting,
      image2: '',
      alt_text: '',
      alt_text2: '',
      width: 380,
    },
  ])
  return (
    <div className='main-content'>
      {width > 600 ? (
        <div></div>
      ) : (
        <div>
          {items.map(function (item) {
            return (
              <div key={item.id} className='content-body'>
                <p className='title'>{item.name}</p>
                <img
                  src={item.image}
                  width={item.width}
                  className='section-image'
                />
                <hr style={{ width: 380 }} />
                <p className='desc'>{item.main}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


const Playground = () => {
  const [color, setColor] = useState('#aabbcc')
  const dimensions = resizableWindow()
  return (
    <div className='canvas-fun'>
      <p className='title'>Draw your soju</p>
      <Notepad color={color} width={dimensions.width} height={dimensions.height}/>
      <Picker handleColor={setColor} color={color} />
    </div>
  )
}

const Notepad = (props) => {
  return (
    <div className='notepad'>
      <Draw color={props.color} width={props.width} height={props.height}/>
    </div>
  )
}
class Draw extends Component {
  state = {
    width: this.props.width,
    height: this.props.height,
    brushRadius: 10,
    lazyRadius: 1,
    color: this.props.color,
    backgroundColor: "rgba(250, 5, 10, 0",
    gridColor: "#C7BCA8",
    catenaryColor: this.props.color
  }
  render() {
    return (
      <div className="draw-canvas">
        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushColor={this.props.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.props.width}
          canvasHeight={this.props.height}
          backgroundColor={this.state.backgroundColor}
          gridColor={this.state.gridColor}
          catenaryColor={this.state.catenaryColor}
        />
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
        
      </div>
    )
  }
}

const Picker = (props) => {
  const width = useWindowWidth()
  return (
    <div>
      {' '}
      {width > 600 ? (
        <div>
          <HexColorPicker color={props.color} onChange={props.handleColor} />;
          The current color is: {props.color}{' '}
        </div>
      ) : null}{' '}
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <p className='footer-title'> Contact Us </p>
      <section>
        <ul className='social-links'>
          <li>
            <p className='desc'>Website</p>
            <a href='#' className='desc'>Sojudao.xyz</a>
          </li>
          <li>
            <p className='desc'>Twitter</p>
            <a href='#' className='desc'>
              @SojuDAO_
            </a>{' '}
          </li>{' '}
          <li>
            <p className='desc'>Email</p>
            <a href='#' className='desc'>
              drink@sojudao.xyz
            </a>{' '}
          </li>{' '}
        </ul>{' '}
      </section>{' '}
      <small className='desc'> SOJUDAO © Copyright 2023 </small>
      <small className='desc'> ALL RIGHTS RESERVED </small>
    </footer>
  )
}
