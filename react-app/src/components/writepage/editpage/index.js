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

const EditPage = () => {
  const { storyId } = useParams();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const [showImageInput, setShowImageInput] = useState(false);

  // const story = useSelector((state) => {
  //   state?.storyState?.find((story) => String(story?.id) === storyId);
  // });
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
  const [imageErrors, setImageErrors] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const urlEndings = ["jpg", "svg", "png", "gif", "peg"];

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
    if (image.length > 1) {
      if (image.replaceAll(" ", "").length < 1) {
        setImageErrors(true);
      }
    }
    if (image.length > 1) {
      if (image.replaceAll(" ", "").length > 1) {
        const ending = image.slice(-3);
        if (!urlEndings.includes(ending)) {
          setIsValidLink(false);
        } else {
          setIsValidLink(true);
        }
      }
    } else {
      setImageErrors(false);
    }
  }, [title, text, image]);

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
    if (bodyErrors || titleErrors || imageErrors || !isValidLink) {
      setShowErrors(true);
    }

    if (!bodyErrors && !titleErrors && !imageErrors && isValidLink) {
      const story = {
        title: title,
        content: text,
        image_url: image,
      };
      dispatch(editStory(story, storyId));
      history.push(`/stories/${storyId}`);
    }
  };

  const handleAddImage = () => {
    setShowImageInput(!showImageInput);
  };

  const handleImageUpdate = (e) => {
    setImage(e.target.value);
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
          {!isValidLink && showErrors ? (
            <div className="errors-msg">
              <p>Url must end in .jpg, .svg, or .png</p>
            </div>
          ) : null}
          {imageErrors && showErrors ? (
            <div className="errors-msg">
              <p>Must contain atleast 1 character</p>
            </div>
          ) : null}
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
        </>
      )}
    </>
  );
};

export default EditPage;
