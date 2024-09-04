import React from 'react';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div>
            <div className='container'>
                  <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
            </div>
      </div>
    );
  }
}

export default ErrorPage;