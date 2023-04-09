import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          const headers = data.blocks.filter(({ type }) => type === "header");
          onChange(data);
        }
      });
      //console.log(editor.blocks.getById("7zlEo3KECg"));
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);
  return <div id={holder} />;
};

export default memo(EditorBlock);
