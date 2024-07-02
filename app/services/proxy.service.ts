import { dialog } from 'electron';

export async function getIdentityFiles() {
  const result = await dialog.showOpenDialog({
    defaultPath: '~/.ssh',
    properties: ['openFile', 'dontAddToRecent'],
    filters: [
      { name: 'Identity Files', extensions: ['pub'] },
    ],
  });

  return (result.filePaths[0]);
}
