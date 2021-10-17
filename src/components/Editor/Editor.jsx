import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export const Editor = ({ onChange, defaultValue, ...props }) => {
  return (
    <AceEditor
      theme="monokai"
      onChange={onChange}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
      width="100%"
      height="100%"
      {...props}
    />
  );
};

Editor.propTypes = {
  ...AceEditor.propTypes,
};
