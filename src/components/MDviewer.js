import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const MDViewer = ({ content }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="text-lg mb-4" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4" {...props} />,
          li: ({node, ...props}) => <li className="mb-2" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
          img: ({node, ...props}) => (
            <div className="my-8">
              <img className="rounded-lg shadow-lg mx-auto" {...props} />
            </div>
          ),
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="my-8">
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg shadow-lg"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 rounded px-1 py-0.5" {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MDViewer;