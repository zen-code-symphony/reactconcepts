import { Component, ErrorInfo, ReactElement } from "react";

interface IProps {
  children: ReactElement;
  errorComponent: ReactElement;
}

class ErrorBoundary extends Component<IProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
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
