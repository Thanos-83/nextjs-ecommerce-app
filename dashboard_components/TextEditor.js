import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
);
function TextEditor({ handleText }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    // Save to database
    setEditorState(editorState);
    const text = convertToRaw(editorState.getCurrentContent());
    // console.log(convertToRaw(editorState.getCurrentContent()));
    handleText(text);
  };
  return (
    <div>
      <Editor
        initialEditorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName='toolbarClassName'
        editorClassName='bg-white p-4 shadow-md'
        // toolbar={{
        //   inline: { inDropdown: true },
        //   list: { inDropdown: true },
        //   textAlign: { inDropdown: true },
        //   link: { inDropdown: true },
        //   history: { inDropdown: true },
        // }}
      />
    </div>
  );
}

export default TextEditor;
