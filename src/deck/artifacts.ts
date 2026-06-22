import { resolve } from 'node:path'

export function getProjectArtifactRoot(projectName: string): string {
  return resolve(process.cwd(), 'artifacts', projectName)
}

export function getHtmlArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'html', 'current')
}

export function getWindowsDesktopArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'desktop-win', 'current')
}

export function getMacDesktopArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'desktop-mac', 'current')
}

export function getPdfArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'pdf', 'current')
}

export function getPptxMediaDiagnosticDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'diagnostics', 'pptx-media', 'current')
}

export function getRuntimeCacheArtifactDir(projectName: string): string {
  return resolve(getProjectArtifactRoot(projectName), 'runtime-cache', 'current')
}
