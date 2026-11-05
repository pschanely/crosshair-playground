import React from 'react';
import AceModule from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/textmate';

// react-ace is CommonJS with a `default` export; depending on the bundler, the
// default import is either the component or the whole module object.
const AceEditor = AceModule.default || AceModule;

function Editor({
  annotations,
  onChange,
  source,
}) {
  return (
    <AceEditor
      name="editor"
      mode="python"
      theme="textmate"
      fontSize={14}
      annotations={annotations}
      onChange={onChange}
      value={source}
      width="auto"
      height="auto"
      editorProps={{
        $blockScrolling: true,
      }}
    />
  );
}

export default Editor;
