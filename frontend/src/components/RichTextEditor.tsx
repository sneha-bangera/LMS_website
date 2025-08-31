// import React, { useState } from 'react';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';

// const RichTextEditor=({input, setInput})=> {

//   const handleChange= (content)=> {
//     setInput({...input, description:content})
//   }
//   return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
// }

// export default RichTextEditor

import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  input: {
    description: string;
    [key: string]: any;
  };
  setInput: React.Dispatch<React.SetStateAction<any>>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ input, setInput }) => {
  const handleChange = (content: string) => {
    setInput({ ...input, description: content });
  };

  return (
    <ReactQuill
      theme="snow"
      value={input.description}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
