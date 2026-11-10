import React from 'react';
import type { TermsDocument } from '@/types/terms';

interface TermsDocumentBodyProps {
  document: TermsDocument;
}

export const TermsDocumentBody: React.FC<TermsDocumentBodyProps> = ({ document }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 font-sans">
      <div className="border-b border-slate-100 pb-4 text-center">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
          {document.heading}
        </h2>
        <p className="text-[11px] text-slate-400 mt-1">
          {document.subtitle}
        </p>
      </div>

      <div className="space-y-3 text-xs text-slate-700">
        {document.blocks.map((block, index) => {
          if (block.kind === 'heading') {
            return <h4 key={index} className="font-bold text-slate-900">{block.text}</h4>;
          }
          if (block.kind === 'paragraph') {
            return <p key={index}>{block.text}</p>;
          }
          return (
            <ul key={index} className="list-disc pl-5 space-y-1 my-1">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        })}
      </div>
    </div>
  );
};
