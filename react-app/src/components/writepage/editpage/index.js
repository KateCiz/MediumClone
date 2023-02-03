import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WriteStoryNavBar from "../../navbar/WriteStoryNavBar/index";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import "./index.css";
import { useDispatch } from "react-redux";
import storyReducer, { editStory } from "../../../store/stories";
import { useHistory, useParams } from "react-router-dom";
import { getSingleStory } from "../../../store/stories";
import { Modal } from "../../../context/Modal";
import AddImage from "../addimage/index";

const EditPage = () => {
  const { storyId } = useParams();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const [showImageInput, setShowImageInput] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getSingleStory(storyId));
      setLoaded(true);
    })();
  }, [dispatch]);

  const story = useSelector((state) => state.storyState[storyId]);

  const update = true;

  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [filledState, setFilledState] = useState(false);
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
    content: title,
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
    content: text,
    onUpdate({ editor }) {
      setText(editor.getText());
    },
  });

  useEffect(() => {
    if (loaded) {
      // setTitle(story.title);
      // setText(story.content);
      editor.commands.insertContent(story.title);
      largeeditor.commands.insertContent(story.content);
      setImage(story.image_url);
      if (story) {
        if (sessionUser) {
          if (story.Author.id !== sessionUser.id) {
            history.push("/404");
          }
        }
      }
    }
  }, [loaded]);

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
      dispatch(editStory(story, storyId));
      history.push(`/stories/${storyId}`);
    }
  };

  const handleAddImage = () => {
    setShowImageInput(!showImageInput);
  };

  const handleImageUpdate = (file) => {
    setImage(file);
  };

  return (
    <>
      {loaded && (
        <>
          <WriteStoryNavBar
            user={sessionUser}
            publish={handlePublish}
            filledState={filledState}
            update={update}
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
        </>
      )}
    </>
  );
};

export default EditPage;
