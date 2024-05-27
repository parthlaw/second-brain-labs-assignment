import { create } from 'zustand'

const useProjectStore = create((set) => ({
  project: {},
  setProject: (newProject: any) => set({ project: newProject }),
}))
export default useProjectStore
