import React, { useState } from "react";
import { useSelector } from "react-redux";
import WriteStoryNavBar from "../navbar/WriteStoryNavBar/index";
import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import "./index.css"
import {useDispatch} from "react-redux";

const WritePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


   const editor = useEditor({
     extensions: [
       StarterKit,
       Placeholder.configure({
         placeholder: "Title",
       }),
       CharacterCount.configure({
         limit: 200,
       }),
     ],
     onUpdate({editor}) {
      setTitle(editor.getText())
     }
   });

  const largeeditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      CharacterCount.configure({
        limit: 1998,
      }),
    ],
    onUpdate({ editor }) {
      setText(editor.getText());
    },
  });


  const handlePublish = () => {
      if (title.length > 1 && text.length > 1){

      }
  }

  return (
    <>
      <WriteStoryNavBar user={sessionUser}  publish={handlePublish}/>
      <EditorContent editor={editor} className="test-editor" />
      <EditorContent editor={largeeditor} className="large-editor" />
    </>
  );
};

export default WritePage;
