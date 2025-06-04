import { h, FunctionComponent } from "preact";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock: FunctionComponent<CodeBlockProps> = ({
  children,
  language = "javascript",
}) => {
  return (
    <div className="code-block-container">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ borderRadius: "4px" }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
