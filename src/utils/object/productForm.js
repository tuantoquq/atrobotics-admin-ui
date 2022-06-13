export function initProduct (productName, productBrand, productPrice, productColors, productImages, productShortDesc, productLongDesc, productCategoryId, productSold){
    return {
        name: productName,
        brand: productBrand,
        price: productPrice,
        color: productColors,
        images: productImages,
        shortDesc: productShortDesc,
        longDesc: productLongDesc,
        categoryId: productCategoryId,
        sold: productSold,
        available: 1
    }
};