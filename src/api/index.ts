import { ObjectType, RegistrableApp } from 'qiankun';
import microApps from '@/mock/microApps.json';

export function getMicroApps(): Promise<RegistrableApp<ObjectType>[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(microApps);
    }, 2000);
  });
}
