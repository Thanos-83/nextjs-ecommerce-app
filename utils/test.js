import { Tree } from './tree';
export const test = () => {
  const tree = new Tree();

  tree._addNode('Computers & Electronics');
  tree._addNode('Notebooks', 'Computers & Electronics');
  tree._addNode('Routers', 'Computers & Electronics');
  tree._addNode('Desktop Computers', 'Computers & Electronics');

  tree._addNode('Macbooks', 'Notebooks');
  tree._addNode('Asus', 'Notebooks');

  tree._addNode('Macbook Pro', 'Macbooks');
  tree._addNode('Macbook Air', 'Macbooks');

  tree._traverse((node) => {
    console.log(node);
  });

  console.log(tree._displayLeafs('Macbooks'));
  console.log(tree._search('Computers & Electronics').children);
};
