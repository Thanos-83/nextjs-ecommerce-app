import { Category } from './CategoriesClass';
const category = new Category('Computers & Electronics');

// console.log(category);

export const AddNode = () => {
  category._addNode('Computers & Electronics');
  category._addNode('Notebooks', 'Computers & Electronics');
  category._addNode('Routers', 'Computers & Electronics');
  category._addNode('Desktop Computers', 'Computers & Electronics');
  category._addNode('printers', 'Computers & Electronics');
  category._addNode('web cameras', 'Computers & Electronics');
  category._addNode('Macbooks', 'Notebooks');
  category._addNode('Asus', 'Notebooks');
  category._addNode('Macbook Pro', 'Macbooks');
  category._addNode('Macbook Air', 'Macbooks');
  // console.log(category._displayLeafs('Computers & Electronics'));
  // return category._displayLeafs('Computers & Electronics');
  // console.log(category._search('Computers & Electronics'));
};

export const GetNodes = () => {
  category._traverse((node) => {
    // console.log(node);
  });
};

export const SearchNode = (node) => {
  // console.log(category._search('Computers & Electronics').children);
  return category._search(node);
};

export const DisplayLeafs = (node) => {
  // console.log(category._displayLeafs(node));
  // return category._displayLeafs(node);
};
