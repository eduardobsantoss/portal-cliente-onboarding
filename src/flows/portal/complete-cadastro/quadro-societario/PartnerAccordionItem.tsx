import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { PartnerData, PartnerDocKey, PreviewDoc } from '@/types/documentChecklist';
import { getPartnerDocFields } from '@/utils/partnerRules';
import { PartnerDocItem } from './PartnerDocItem';
import { PartnerHeader } from './PartnerHeader';

interface PartnerAccordionItemProps {
  partner: PartnerData;
  isExpanded: boolean;
  onToggle: () => void;
  onUploadDoc: (partnerId: string, docKey: PartnerDocKey, file: File) => void;
  onPreview: (doc: PreviewDoc) => void;
}

/** Cartão recolhível de uma parte relacionada (sócio PF com cônjuge, sócio PJ ou representante não sócio). */
export const PartnerAccordionItem: React.FC<PartnerAccordionItemProps> = ({
  partner,
  isExpanded,
  onToggle,
  onUploadDoc,
  onPreview,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs">
      <PartnerHeader partner={partner} isExpanded={isExpanded} onToggle={onToggle} />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 p-3.5 bg-slate-50/30 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            {getPartnerDocFields(partner).map((field) => {
              const docState = partner.docs[field.docKey];
              return (
                <PartnerDocItem
                  key={field.docKey}
                  label={field.label}
                  docState={docState || { uploaded: false, status: 'pendente' }}
                  note={field.note}
                  onUpload={(file) => onUploadDoc(partner.id, field.docKey, file)}
                  onPreview={() =>
                    docState?.fileName && onPreview({ title: field.previewTitle, fileName: docState.fileName })
                  }
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
