import { type EditorRED } from 'node-red';

import { getNodeInputName, getNodeTab } from '@/share/utils/get-env.ts';

declare const RED: EditorRED;

interface TabInterface {
  id: string
  label: string
}

const initTab = (tabs: ReturnType<typeof RED.tabs.create>) => {
  let index = 0;

  return (config: TabInterface) => {
    const id = getNodeTab(config.id);
    tabs.addTab({
      ...config,
      id,
    }, index++);

    return id;
  };
};

export const createTabs = (id: string, tabs: TabInterface[], onChange?: (tab: TabInterface) => void) => {
  const tabsInstance = RED.tabs.create({
    id: getNodeInputName(id),
    onchange: onChange as ((item: string) => void) | undefined,
  });

  const addTab = initTab(tabsInstance);

  return {
    tabsInstance,
    tabIds: tabs.map(tab => addTab(tab)),
  };
};
