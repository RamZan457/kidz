import './Button.css';
import PropTypes from 'prop-types';

const Button = ({text}) => {
  return (
      <div>
              <a href="#" className="button button--hoo" style={{marginTop: "40px"}}>
                  <div className="button__wrapper">
                      <span className="button__text">{ text}</span>
                  </div>
                  <div className="characterBox">
                      <div className="character wakeup">
                          <div className="character__face"></div>
                          <div className="charactor__face2"></div>
                          <div className="charactor__body"></div>
                      </div>
                      <div className="character wakeup">
                          <div className="character__face"></div>
                          <div className="charactor__face2"></div>
                          <div className="charactor__body"></div>
                      </div>
                      <div className="character">
                          <div className="character__face"></div>
                          <div className="charactor__face2"></div>
                          <div className="charactor__body"></div>
                      </div>
                  </div>
              </a>
          </div>
  )
}

export default Button;

// handle props
Button.propTypes = {
  text: PropTypes.string.isRequired,
};