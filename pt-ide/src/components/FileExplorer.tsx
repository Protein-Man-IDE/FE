import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiFilePlus, FiSave, FiEdit2, FiPlay, FiTrash2 } from 'react-icons/fi';

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

interface FileExplorerProps {
    width: number;
    setWidth: (newWidth: number) => void;
    isDarkMode: boolean; // 다크 모드 여부를 받아올 prop
}

const FileExplorer: React.FC<FileExplorerProps> = ({ width, setWidth, isDarkMode }) => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [newFileName, setNewFileName] = useState('');
    const [hover, setHover] = useState(false);
    const separatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/code/1');
                const data = response.data;
                setFiles([data]);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error fetching data:', error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };
        fetchData();
    }, []);

    const handleFileClick = async (file: FileNode) => {
        console.log('File clicked:', file.name);
        // Additional logic to display file content or perform other actions
    };

    const handleCreateFile = async () => {
        if (!newFileName) {
            alert('Please enter a file name.');
            return;
        }
        try {
            const response = await axios.post('/code', { text: 'System.out.println()' });
            const newFile = response.data;
            setFiles([...files, newFile]);
            setNewFileName('');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert('Error creating file: ' + error.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    const handleSaveFile = async (file: FileNode) => {
        try {
            const response = await axios.put(`/code/${file.name}`, { text: 'Your updated text here...' });
            const updatedFile = response.data;
            setFiles(files.map(f => (f.name === updatedFile.name ? updatedFile : f)));
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert('Error saving file: ' + error.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    const handleEditFile = async (file: FileNode) => {
        // Edit logic here
        console.log(`Editing file: ${file.name}`);
    };

    const handleRunFile = async (file: FileNode) => {
        // Run logic here
        console.log(`Running file: ${file.name}`);
    };

    const handleDeleteFile = async (file: FileNode) => {
        try {
            const response = await axios.delete(`/code/${file.name}`);
            if (response.status === 204) {
                setFiles(files.filter(f => f.name !== file.name));
            } else {
                alert('Error deleting file');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert('Error deleting file: ' + error.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    const startResizing = (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
        mouseDownEvent.preventDefault();
        const startX = mouseDownEvent.pageX;
        const startWidth = width;

        const doResize = (moveEvent: MouseEvent) => {
            const currentX = moveEvent.pageX;
            const newWidth = startWidth + (currentX - startX);
            setWidth(Math.max(150, Math.min(newWidth, 500)));
        };

        const stopResizing = () => {
            window.removeEventListener('mousemove', doResize);
            window.removeEventListener('mouseup', stopResizing);
        };

        window.addEventListener('mousemove', doResize);
        window.addEventListener('mouseup', stopResizing);
    };

    return (
        <div className={isDarkMode ? "flex bg-gray-900" : "flex"}>
            <div style={{ width }} className={isDarkMode ? "bg-gray-800 overflow-auto" : "bg-gray-100 overflow-auto"}>
                <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} flex items-center p-2`}>
                    <h3 className="text-xs font-semibold">EXPLORER</h3>
                    <div className="flex ml-2">
                        <button onClick={handleCreateFile} className="p-1"><FiFilePlus /></button>
                        <button onClick={() => handleSaveFile(files[0])} className="p-1"><FiSave /></button>
                        <button onClick={() => handleEditFile(files[0])} className="p-1"><FiEdit2 /></button>
                        <button onClick={() => handleRunFile(files[0])} className="p-1"><FiPlay /></button>
                        <button onClick={() => handleDeleteFile(files[0])} className="p-1"><FiTrash2 /></button>
                    </div>
                </div>
                {files.map((file, index) => (
                    <div key={index} className="p-2" onClick={() => handleFileClick(file)}>
                        {file.type === 'folder' ? `📁 ${file.name}` : `📄 ${file.name}`}
                        {file.children && <div className="ml-4">{file.children.map((child, idx) => <div key={idx}>{`📄 ${child.name}`}</div>)}</div>}
                    </div>
                ))}
            </div>
            <div ref={separatorRef}
                className={`cursor-ew-resize border ${isDarkMode ? 'bg-gray-800 border-black' : ''}`}
                onMouseDown={startResizing}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    width: '5px',
                }} />
        </div>
    );
};

export default FileExplorer;
