import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const adminNavigation = atom<number>({
    key: "adminNavigation",
    default: 1,
    effects_UNSTABLE: [persistAtom],
  });