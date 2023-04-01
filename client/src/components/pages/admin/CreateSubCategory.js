import { Await, defer, useLoaderData } from "react-router-dom";

//UI components
import FormPageContent from "../../UI/FormPageContent";
import SubCategoryForm from "../../admin/SubCategoryForm";
import loader from "../../../util/loader";
import { Suspense } from "react";
import BaseSpinner from "../../UI/BaseSpinner";

const CreateSubCategory = () => {
    const { categories } = useLoaderData();
    
    return (
       <Suspense fallback={<BaseSpinner />}>
           <Await resolve={categories}>
               {
                   (categories) => (
                       <FormPageContent title='Create a sub category'>
                           <SubCategoryForm categories={categories} />
                       </FormPageContent>
                   )
               }
           </Await>
       </Suspense>
    )   
}

export default CreateSubCategory

export function categoryDefer() {
    return defer({
        categories: loader('/categoryData/categories', (data) => data.items, ['admin'])
    })
}