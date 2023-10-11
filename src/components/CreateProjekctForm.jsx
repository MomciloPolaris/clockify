import React, { useState } from 'react';
import Button from './Button';

function CreateProjectForm({ onCreateProject }) {
  const [projectName, setProjectName] = useState('');
  const [isShow, setIsShow] = useState(true);

  //definise funckiju koja poziva zatim se resetuje na prazan string
  const handleCreateProject = () => {
    onCreateProject(projectName);
    setProjectName('');
    setIsShow(false);
  };

  if (!isShow) return;

  return (
    <div className="flex items-center border-2 py-6 rounded-md">
      <div className="flex items-center gap-6 w-full px-2">
        <input
          style={{ padding: '10px' }}
          className="w-full border-2 rounded-md"
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button style={{ width: '200px' }} text="Create Project" onClick={handleCreateProject} />
      </div>
      <div className="w-full"></div>
    </div>
  );
}

export default CreateProjectForm;
