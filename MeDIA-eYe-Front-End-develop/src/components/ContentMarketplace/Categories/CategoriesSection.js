import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CategoryJson } from '../../../utils/JsonData';
import CategoriesBlock from './CategoriesBlock/CategoriesBlock';

export function CategoriesSection() {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const categories = CategoryJson();


    return (
        <>
            <div className="mediaeye-categories-row">
                {categories.map((category, i) => (
                    <CategoriesBlock category={category} key={i} />
                ))}
            </div>
        </>
    );
}
export default CategoriesSection;
