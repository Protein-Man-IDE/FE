import React, { useEffect, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import tomorrowTheme from 'monaco-themes/themes/Tomorrow.json';
import TomorrowDarkTheme from 'monaco-themes/themes/Tomorrow-Night.json';
import { editor } from 'monaco-editor';
import Footer from './Footer';

interface SqlQueryEditorProps {
  isDarkMode: boolean; // 다크 모드 상태
  toggleDarkMode: () => void; // 다크 모드 토글 함수
}

const SqlQueryEditor: React.FC<SqlQueryEditorProps> = ({ isDarkMode, toggleDarkMode }) => {
  const monaco = useMonaco();
  const [language, setLanguage] = useState('typescript');
  const [sqlQuery, setSqlQuery] = useState(() => {
    return localStorage.getItem('sqlQuery') || '--여기에 SQL문을 작성하시면 됩니다.';
  });

  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme('tomorrow', tomorrowTheme as editor.IStandaloneThemeData);
    monaco.editor.defineTheme('tomorrowDark', TomorrowDarkTheme as editor.IStandaloneThemeData);
    // 초기 테마 설정
    monaco.editor.setTheme(isDarkMode ? 'tomorrowDark' : 'tomorrow');

  }, [monaco, isDarkMode]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      localStorage.setItem('sqlQuery', value);
      setSqlQuery(value);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'white'}`}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`block px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
      </select>


      <Editor
        height='100vh'
        value={sqlQuery}
        onChange={handleEditorChange}
        language={language}
        theme={isDarkMode ? 'tomorrowDark' : 'tomorrow'}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto'
          }
        }}
      />
      {/* <Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> */}
    </div>
  );
};

export default SqlQueryEditor;
