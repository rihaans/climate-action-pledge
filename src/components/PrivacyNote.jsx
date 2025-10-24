import React from 'react';
import { Lock, Shield } from 'lucide-react';

/**
 * PrivacyNote Component
 * Displays privacy information prominently
 */
const PrivacyNote = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Lock className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Your Privacy Matters
          </h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            Mobile Number and Email are required for validation but will <strong>NEVER</strong> be shown publicly.
            Data is used only for verification and engagement purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNote;
