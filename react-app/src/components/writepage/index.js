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
import AddImage from "./addimage/index";
import { Modal } from "../../context/Modal";

const WritePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();
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
    if (bodyErrors || titleErrors ) {
      setShowErrors(true);
    }
    if (!bodyErrors && !titleErrors ) {

      const story = {
        title: title,
        content: text,
        image: image,
      };
      dispatch(createNewStory(story));
      history.push("/");
    }
  };

  const handleAddImage = () => {
    setShowImageInput(!showImageInput);
  };

  const handleImageUpdate = (file) => {
    setImage(file);
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
      {showErrors ? (
        <div className="errors-msg">
          <p>Url must end in .jpg, .svg, or .png</p>
        </div>
      ) : null}
      {showErrors ? (
        <div className="errors-msg">
          <p>Must contain atleast 1 character</p>
        </div>
      ) : null}
      <div className="image-info">
        {showImageInput ? null : (
          <img
            className="open-close-btns"
            src={"/svgs/+-btn.svg"}
            alt=""
            onClick={handleAddImage}
          />
        )}
        {showImageInput ? (
          <Modal closeModal={() => setShowImageInput(false)}>
            <AddImage
              closeModal={() => setShowImageInput(false)}
              image={image}
              handleImageUpdate={(file) => handleImageUpdate(file)}
            />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default WritePage;
