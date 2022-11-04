import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WriteStoryNavBar from "../navbar/WriteStoryNavBar/index";
import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import "./index.css"
import {useDispatch} from "react-redux";
import {createNewStory} from "../../store/stories"
import {useHistory} from "react-router-dom"

const WritePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("")
  const [filledState, setFilledState] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

   useEffect(()=>{
      if (title.length > 0 && text.length > 0) {
        setFilledState(true);
      } else {
        setFilledState(false);
      }
   },[title,text])


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

  const history = useHistory();

  const handlePublish = () => {
      if (title.length > 1 && text.length > 1){
        const story = {
          'title': title,
          'content': text,
          'image_url': image
        }
        dispatch(createNewStory(story))
      }
      history.push("/");
  }

  const handleAddImage = () => {
    setShowImageInput(!showImageInput)
  }

  const handleImageUpdate = (e) => {
    setImage(e.target.value)
  }

  return (
    <>
      <WriteStoryNavBar
        user={sessionUser}
        publish={handlePublish}
        filledState={filledState}
        update={false}
      />
      <EditorContent editor={editor} className="test-editor" />
      <EditorContent editor={largeeditor} className="large-editor" />
      <div className="image-info">
        {showImageInput ? (
          <img
            className="open-close-btns"
            src={"../x-btn.svg"}
            alt=""
            onClick={handleAddImage}
          />
        ) : (
          <img
            className="open-close-btns"
            src={"../+-btn.svg"}
            alt=""
            onClick={handleAddImage}
          />
        )}
        {showImageInput ? <input className="image-input-field" placeholder="add link to image" maxLength={300} value={image} onChange={handleImageUpdate}></input> : null}
      </div>
    </>
  );
};

export default WritePage;
