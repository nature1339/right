import React from 'react';

const Error = ({ statusCode }) => {
  {console.log(`오류 ${statusCode}`)}

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>

      <h1>서버 오류</h1>
      <p>문제가 발생했습니다.</p>
      <a href="/">홈으로 돌아가기</a>
    </div>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;