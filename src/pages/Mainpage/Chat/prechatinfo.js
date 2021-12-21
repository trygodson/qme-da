import React from 'react';
import './prechatinfo.scss';

function PrechatInfo() {
  return (
    <>
      <div className="prechat-info row d-flex justify-content-center text-center">
        <div class=" content col-8 col-sm-8 col-lg-4 col-md-6 col-xs-12 col-xl-12">
          <i class="bx bxs-chat"></i>
          <h1>Start A Conversation</h1>
          <p>Click on any of your previous chats to continue a conversation with them.</p>
        </div>
      </div>
    </>
  );
}

export default PrechatInfo;
