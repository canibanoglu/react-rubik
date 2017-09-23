import React from 'react';
import _ from 'lodash';

import { SCANNER } from '../constants/Rubik';

require('tracking');
require('tracking/build/data/face');

const TOLERANCE = 25;

export default class Camera extends React.Component {
  componentDidMount() {
    // register colors
    _.forOwn(SCANNER, (value, key) => {
      window.tracking.ColorTracker.registerColor(key, (r, g, b) =>
        _.inRange(r, value.r - TOLERANCE, value.r + TOLERANCE)
        && _.inRange(g, value.g - TOLERANCE, value.g + TOLERANCE)
        && _.inRange(b, value.b - TOLERANCE, value.b + TOLERANCE));
    });

    this.colorTracker = new window.tracking.ColorTracker(_.keys(SCANNER));

    this.colorTracker.on('track', event => {
        let context = this.refs.canvas.getContext('2d');
        context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        event.data.forEach(function(rect) {
            console.log('\n\n rect', rect, '\n\n');
            if (rect.color === 'custom') {
                rect.color = tracker.customColor;
            }
            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
    });

    // start tracking
    window.tracking.track(this.refs.cameraOutput, this.colorTracker, { camera: true });
  }

  componentWillUnmount() {
    this.tracker.removeAllListeners();
  }

  render() {
    return (
      <div>
        <video ref="cameraOutput" width="320" height="240" style={{ position: 'absolute' }} preload autoPlay loop muted></video>
        <canvas ref="canvas" width="320" height="240" style={{ position: 'absolute' }}></canvas>
      </div>
    )
  }
}