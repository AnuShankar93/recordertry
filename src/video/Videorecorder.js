import React, { Component } from 'react';

class Videorecorder extends Component{
    constructor(props) {
        super(props);
        this.state = {
          file: ""
        };
    }
    gotDevices(deviceInfos) {
        for (var i = 0; i !== deviceInfos.length; ++i) {
          console.log(deviceInfos[i]);
        }
    }
    getStream() {
        if (window.stream) {
          window.stream.getTracks().forEach(function(track) {
            track.stop();
          });
        }
    }
    componentDidMount() {
        const constraints = {
          video: true,
          audio: true
        };
    
        navigator.mediaDevices
          .enumerateDevices()
          .then(this.gotDevices)
          .then(this.getStream)
          .catch(() => {});
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            window.stream = stream;
            this.setState({ file: window.URL.createObjectURL(stream) });
            console.log(stream);
          })
          .catch(error => console.log(error));
    }
    handleChange = e => {
        // this.setState({file:file.name})
        console.log(e.target.files[0]);
        let fileBlob = new Blob([e.target.files[0]], {
          type: "video/mp4"
        });
        console.log(
          new Blob([e.target.files[0]], {
            type: "video/mp4"
          })
        );
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(fileBlob);
        link.click();
        this.setState({ file: window.URL.createObjectURL(fileBlob) });
      };
    render() {
        return (
          <div>
            <form>
              <input onChange={this.handleChange} type="file" accept="video/mp4" />
            </form>
            <video controls autoPlay src={this.state.file} />
          </div>
        );
      }
}
export default Videorecorder;