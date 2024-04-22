import React, { useState, useRef } from 'react';
import axios from 'axios';

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

interface FileExplorerProps {
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
}

const initialFiles: FileNode[] = [
    { name: 'src', type: 'folder', children: [{ name: 'index.tsx', type: 'file' }] },
    { name: 'public', type: 'folder', children: [{ name: 'index.html', type: 'file' }] },
];

const FileExplorer: React.FC<FileExplorerProps> = ({ width, setWidth }) => {
    const [files, setFiles] = useState<FileNode[]>(initialFiles);
    const [newFileName, setNewFileName] = useState('');

    const handleCreateFile = async () => {
        if (!newFileName) {
            alert('Please enter a file name.');
            return;
        }
        try {
            const response = await axios.post('/code', { name: newFileName });
            const newFile = response.data; // Assuming the response contains the new file
            setFiles([...files, newFile]);
            setNewFileName('');
        } catch (error) {
            alert('Error creating file: ' + error.message);
        }
    };

    const startResizing = (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
        mouseDownEvent.preventDefault();
        const startX = mouseDownEvent.pageX;
        const startWidth = width;

        const doResize = (moveEvent: MouseEvent) => {
            const currentX = moveEvent.pageX;
            const newWidth = startWidth + (currentX - startX);
            setWidth(Math.max(150, Math.min(newWidth, 500))); // Set minimum and maximum width
        };

        const stopResizing = () => {
            window.removeEventListener('mousemove', doResize);
            window.removeEventListener('mouseup', stopResizing);
        };

        window.addEventListener('mousemove', doResize);
        window.addEventListener('mouseup', stopResizing);
    };

    return (
        <div style={{ width }} className="bg-white shadow rounded-lg resize-x overflow-auto">
            <div className="cursor-ew-resize" onMouseDown={startResizing}>
                <div className="bg-gray-300 p-1 text-center">Drag</div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">EXPLORER</h3>
                <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="New file name"
                    className="p-2 m-2 border rounded"
                />
                <button onClick={handleCreateFile} className="p-2 bg-blue-500 text-white rounded">Create File</button>
                {files.map((file, index) => (
                    <div key={index}>
                        {file.type === 'folder' ? `📁 ${file.name}` : `📄 ${file.name}`}
                        {file.children && <div className="ml-4">{file.children.map((child, idx) => <div key={idx}>{`📄 ${child.name}`}</div>)}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileExplorer;
