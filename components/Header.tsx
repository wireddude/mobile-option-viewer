
import React from 'react';
import { Layers, FileUp } from 'lucide-react';

interface HeaderProps {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ onFileUpload }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Layers className="h-8 w-8 text-indigo-400" />
            <h1 className="ml-3 text-2xl font-bold text-gray-100">Options Dashboard</h1>
          </div>
          <div className="flex items-center">
             <label htmlFor="file-upload" className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md inline-flex items-center transition-colors duration-300">
                <FileUp className="w-5 h-5 mr-2" />
                <span>Upload JSON</span>
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".json" onChange={onFileUpload} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
