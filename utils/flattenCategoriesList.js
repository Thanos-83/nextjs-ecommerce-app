export const nestedCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parent == null);
  } else {
    category = categories.filter(
      (cat) => String(cat.parent) == String(parentId)
    );
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      products: cat.products,
      children: nestedCategories(categories, cat._id),
    });
  }
  return categoryList;
};
