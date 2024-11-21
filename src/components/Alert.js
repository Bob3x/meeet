// src/components/Alert.js

import { Component } from 'react';

class Alert extends Component {
    constructor(props) {
      super(props);
      this.color = null;
      this.bgColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            fontWeight: "bolder",
            borderRadius: "7px",
            borderColor: this.color,
            textAlign: "center",
            fontSize: "13px",
            margin: "15px 0",
            padding: "10px",
            position: "relative"
        }
    }

    getCloseButtonStyle = () => {
      return {
            position: "absolute",
            right: "10px",
            top: "60%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "rgb(0, 0, 0, 1)",
            cursor: "pointer",
            fontSize: "24px",
            padding: "0 5px"
      }
    }

    render() {
        return (
          <div className="Alert">
            <p style={this.getStyle()}>{this.props.text}
              <button onClick={this.props.onClose} style={this.getCloseButtonStyle()}>
              ×
              </button>
            </p>
          </div>
        );
      }
    }

class InfoAlert extends Alert {
        constructor(props) {
          super(props);
          this.color = 'rgb(0, 0, 255)'; // blue
          this.bgColor = 'rgb(220, 220, 255)'; // light blue
          
        }
      }

class ErrorAlert extends Alert {
        constructor(props) {
          super(props);
          this.color = "rgb(160, 0, 0)"; // red
          this.bgColor = "rgb(244, 67, 54)"; // light red
        }
        }

class WarningAlert extends Alert {
            constructor(props) {
              super(props);
              this.color = 'rgb(255, 170, 113)'; // orange
              this.bgColor ='rgb(255, 102, 0)';  // darker orange
            }
            }
          
          
export { InfoAlert, ErrorAlert, WarningAlert };