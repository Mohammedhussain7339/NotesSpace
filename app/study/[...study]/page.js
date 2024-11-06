
'use client';
import React from 'react';

function Page({ params }) {
  // Access the dynamic segments as an array from params.study
  const studyParams = params?.study || []; 

  return (
    <div>
      <h1>Dynamic Study Page</h1>
      <h2>Captured URL Segments:</h2>
      <h4>{params.study[0]}</h4>
      <h4>{params.study[1]}</h4>
      {studyParams.length > 0 ? (
        studyParams.map((segment, index) => (
          <p key={index}>Segment {index + 1}: {segment}</p>
        ))
      ) : (
        <p>No dynamic segments provided.</p>
      )}
    </div>
  );
}

export default Page;
