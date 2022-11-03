import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { queryCategories } from '../../../blockchain/functions/Marketplace';
import { Close } from '../../Icons/';
import SelectSearch from 'react-select-search';
export const CategoriesCard = (props) => {
  const { categories, addCategory, removeCategory, setSelectCategory } = props;
  const [maxError, setMaxError] = useState(false);
  const [options, setOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const { Moralis } = useMoralis();
  const getOptions = async () => {
    const res = await queryCategories(Moralis);
    setOptions(res);
  };
  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    let listArray = [];
    options.map((option) => {
      if (!categories.includes(option.attributes.categoryId)) {
        listArray.push({
          name: option.attributes.name,
          value: option.attributes.categoryId
        });
      }
    });
    setCategoriesOptions(listArray);
  }, [options, categories]);


  const handleAdd = (category) => {
    if (categories.length >= 3) {
      setMaxError(true);
    } else {
      setMaxError(false);

      addCategory(category);
      if (setSelectCategory) {
        setSelectCategory(false);
      }
    }
  };

  const handleRemove = (category) => {
    removeCategory(category);
    setMaxError(false);
  };
  return (
    <div className="marketplace-create-page-inner-content-category">
      <div className="marketplace-create-page-inner-content-category-inner m-t-5">
        <SelectSearch
          placeholder="Select"
          className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
          options={categoriesOptions}
          value={[]}
          // disabled={categories?.length >= 3 ? true : false}
          onChange={(opt) => {
            handleAdd(opt);
          }}
        />
        <div
          className={
            maxError
              ? 'marketplace-create-page-inner-content-category-inner-info maxError'
              : 'marketplace-create-page-inner-content-category-inner-info'
          }
        >
          {maxError
            ? 'Please remove a category and try again. MAX 3'
            : ' Select 1-3 categories that best fit your listing.'}
        </div>
      </div>
      <div className="marketplace-create-page-inner-content-category-selected">
        {categories.map((category) => {
          return (
            <div className="marketplace-create-page-inner-content-category-selected-item">
              <div
                className="marketplace-create-page-inner-content-category-selected-item-inner"
                cat={category}
              >
                {category}
                <div
                  className="marketplace-create-page-inner-content-category-selected-item-inner-close"
                  onClick={() => handleRemove(category)}
                >
                  <Close />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesCard;
