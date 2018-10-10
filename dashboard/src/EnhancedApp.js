import compose from 'recompose/compose.js';
import lifecycle from 'recompose/lifecycle.js';
import pure from 'recompose/pure.js';
import { App } from './App.js';

var enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.init();
    }
  }),
  pure
);

export var EnhancedApp = enhance(App);
EnhancedApp.displayName = 'enhance(App)';
