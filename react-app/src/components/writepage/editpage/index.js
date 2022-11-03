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

  // const story = useSelector((state) => {
  //   state?.storyState?.find((story) => String(story?.id) === storyId);
  // });
  useEffect(() => {
      (async() => {
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

  useEffect(() => {
    if (title.length > 0 && text.length > 0) {
      setFilledState(true);
    } else {
      setFilledState(false);
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
    if(loaded) {
      // setTitle(story.title);
      // setText(story.content);
      editor.commands.insertContent(story.title);
      largeeditor.commands.insertContent(story.content);

      if(story){
        if(sessionUser){
          if (story.Author.id !== sessionUser.id){
            history.push('/404')
          }
        }
      }
    }
  }, [loaded]);




  const handlePublish = () => {
    if (title.length > 1 && text.length > 1) {
      const story = {
        title: title,
        content: text,
        image_url: image,
      };
      dispatch(editStory(story, storyId));
    }
    history.push(`/stories/${storyId}`);
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
          <EditorContent editor={editor} className="test-editor" />
          <EditorContent editor={largeeditor} className="large-editor" />
        </>
      )}
    </>
  );
};

export default EditPage;
