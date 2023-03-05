import { Component, ReactNode, ErrorInfo } from "react";

type propsErrorPage = {
  error?: Error;
};

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Uncaught error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children;
  }
}

const ErrorPage = (props: propsErrorPage) => {
  return (
    <div>
      <h1>Something went Wrong</h1>
      {props.error && <p>{props.error?.message}</p>}
      {!props.error && <p>Uncaught error please retry again</p>}
    </div>
  );
};

export default ErrorBoundary;
