export const listCategories = (categories) => {
  const toOptions = (category, depth = 0, parentId = null) => {
    const { _id, name, slug, children = [], products } = category;
    const childrenCategories = children.flatMap((child) =>
      toOptions(child, depth + 1, _id)
    );
    // console.log(categories);
    const option = {
      _id,
      name,
      slug,
      products,
      depth,
      parentId,
      // matchTerms: [name].concat(childrenCategories.map((obj) => obj.name)),
    };
    return [option].concat(childrenCategories);
  };

  const optionsList = categories?.flatMap((category) => toOptions(category));

  return optionsList;
};
