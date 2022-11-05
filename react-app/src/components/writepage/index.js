import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WriteStoryNavBar from "../navbar/WriteStoryNavBar/index";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import "./index.css";
import { useDispatch } from "react-redux";
import { createNewStory } from "../../store/stories";
import { useHistory } from "react-router-dom";
import { SiUfc } from "react-icons/si";

const WritePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [filledState, setFilledState] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [titleErrors, setTitleErrors] = useState(false);
  const [bodyErrors, setBodyErrors] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (title.length > 0 && text.length > 0) {
      setFilledState(true);
    } else {
      setFilledState(false);
    }
    if (title.replaceAll(" ", "").length < 1) {
      setTitleErrors(true);
    } else {
      setTitleErrors(false);
    }
    if (text.replaceAll(" ", "").length < 1) {
      setBodyErrors(true);
    } else {
      setBodyErrors(false);
    }
  }, [title, text]);

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
    onUpdate({ editor }) {
      setTitle(editor.getText());
    },
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
    if( bodyErrors && titleErrors){
      setShowErrors(true);
    }
    if (!bodyErrors && !titleErrors) {
      console.log(title, text);
      const story = {
        title: title,
        content: text,
        image_url: image,
      };
      dispatch(createNewStory(story));
      history.push("/");
    }
  };

  const handleAddImage = () => {
    setShowImageInput(!showImageInput);
  };

  const handleImageUpdate = (e) => {
    setImage(e.target.value);
  };

  return (
    <div className="page-container">
      <WriteStoryNavBar
        user={sessionUser}
        publish={handlePublish}
        filledState={filledState}
        update={false}
      />
      {titleErrors && showErrors ? (
        <div className="errors-msg">
          <p>Must have atleast 1 character</p>
        </div>
      ) : null}
      <EditorContent editor={editor} className="test-editor" />
      {bodyErrors && showErrors ? (
        <div className="errors-msg">
          <p>Must have atleast 1 character</p>
        </div>
      ) : null}
      <EditorContent editor={largeeditor} className="large-editor" />
      <div className="image-info">
        {showImageInput ? (
          <img
            className="open-close-btns"
            src={"/svgs/x-btn.svg"}
            alt=""
            onClick={handleAddImage}
          />
        ) : (
          <img
            className="open-close-btns"
            src={"/svgs/+-btn.svg"}
            alt=""
            onClick={handleAddImage}
          />
        )}
        {showImageInput ? (
          <input
            className="image-input-field"
            placeholder="add link to image"
            maxLength={300}
            value={image}
            onChange={handleImageUpdate}
          ></input>
        ) : null}
      </div>
    </div>
  );
};

export default WritePage;
