import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught by ErrorBoundary", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
