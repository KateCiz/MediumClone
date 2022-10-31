import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WriteStoryNavBar from "../../navbar/WriteStoryNavBar/index";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import "./index.css";
import { useDispatch } from "react-redux";
import { editStory } from "../../../store/stories";
import { useHistory, useParams } from "react-router-dom";

const EditPage = () => {

  const { storyId } = useParams();

  const story = useSelector((state) => {
    state?.stories?.find((story) => String(story.id) === storyId)
  })

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [filledState, setFilledState] = useState(false);

  useEffect(() => {
    if (title.length > 0 && text.length > 0) {
      setFilledState(true);
    } else {
      setFilledState(false);
    }
  }, [title, text]);


  useEffect(() => {
    if (story) {
        setTitle(story.title)
        setText(story.Text)
    }
},[story])

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

  const history = useHistory();

  const handlePublish = () => {
    if (title.length > 1 && text.length > 1) {
      const story = {
        title: title,
        content: text,
        image_url: image,
      };
      dispatch(editStory(story, storyId));
    }
    history.push("/");
  };

  return (
    <>
      <WriteStoryNavBar
        user={sessionUser}
        publish={handlePublish}
        filledState={filledState}
      />
      <EditorContent editor={editor} className="test-editor" />
      <EditorContent editor={largeeditor} className="large-editor" />
    </>
  );
};

export default EditPage;
