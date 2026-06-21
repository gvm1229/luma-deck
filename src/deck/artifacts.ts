import { resolve } from 'node:path'

export function getProjectArtifactRoot(projectName: string): string {
  return resolve(process.cwd(), 'artifacts', projectName)
}

export function getHtmlArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'html')
}

export function getWindowsDesktopArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'desktop-win')
}

export function getMacDesktopArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'desktop-mac')
}

export function getPptxMediaDiagnosticDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'diagnostics', 'pptx-media')
}
