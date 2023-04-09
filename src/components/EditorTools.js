import Header from "./Header/index";
import CheckList from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";

const id = 0;

export const EDITOR_TOOLS = {
  checkList: CheckList,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      id: 0
    }
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  }
};
