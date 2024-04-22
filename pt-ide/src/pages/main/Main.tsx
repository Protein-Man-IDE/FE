import React, { useState } from 'react';
import SqlQueryEditor from '../../components/CodeEditor';
import IdeNavbar from '../../components/IdeNavbar';
import FileExplorer from '../../components/FileExplorer';
import axios from 'axios';

const Main: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [explorerWidth, setExplorerWidth] = useState(200); // 파일 탐색기의 초기 너비 설정
  const [editorWidth, setEditorWidth] = useState(window.innerWidth - explorerWidth); // 에디터의 초기 너비 설정

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // FileExplorer의 너비를 조정하는 함수
  const handleResize = (newWidth: number) => {
    setExplorerWidth(newWidth);
    setEditorWidth(window.innerWidth - newWidth); // 에디터 너비를 재계산
  };

  return (
    <div className="flex flex-col h-screen">
      <IdeNavbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <FileExplorer width={explorerWidth} setWidth={handleResize} />
        <div style={{ width: `${editorWidth}px` }} className="p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Main Page</h1>
          <SqlQueryEditor isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default Main;
