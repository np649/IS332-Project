let mockDatabase = [
    {
        _id: '001', name: 'Stainless Steel Frying Pan', image: 'images/stainlesspan.bmp', category: 'Pans', price: 75
    },
    {
        _id: '002', name: 'Cast Iron Frying Pan', image: 'images/castironpan.bmp', category: 'Pans', price: 40
    },
    {
        _id: '003', name: 'Stainless Steel Soup Pot', image: 'images/pot.bmp', category: 'Pots', price: 125
    }
]


// Event Listeners
window.onload = async () => {
    getCategories(mockDatabase);
    generateProductList(sortBySelected(filterResults(mockDatabase)));
    sizeCheck();
};


const selectSortElement = document.getElementById('sort');
selectSortElement.addEventListener('change', async (event) => {
    generateProductList(sortBySelected(filterResults(mockDatabase)));
});

const selectCategoryElement = document.getElementById('category');
selectCategoryElement.addEventListener('change', async (event) => {
    generateProductList(sortBySelected(filterResults(mockDatabase)));
});

const selectPriceElement = document.getElementById('price');
selectPriceElement.addEventListener('change', async (event) => {
    generateProductList(sortBySelected(filterResults(mockDatabase)));
});


// Creating the Products
function generateCard(name, image, price, category){
    let column = document.createElement('div'); 
    column.className = "col";
    
    let card = document.createElement('div');
    card.className = "card h-50";
    column.appendChild(card);

    let cardProductName = document.createElement('h5');
    cardProductName.className = "card-text";
    cardProductName.innerHTML = name;
    cardBody.appendChild(cardProductName);
    
    let cardImage = document.createElement('img');
    cardImage.src = image;
    card.appendChild(cardImage);

    let cardBody = document.createElement('div');
    cardBody.className = "card-body";
    card.appendChild(cardBody)
    
    let cardProductPrice = document.createElement('p');
    cardProductPrice.className = "card-text";
    cardProductPrice.innerHTML = `$${price}`;
    cardBody.appendChild(cardProductPrice);

    let cardProductCategory = document.createElement('p');
    cardProductCategory.className = "card-text";
    cardProductCategory.innerHTML = category;
    cardBody.appendChild(cardProductCategory);

    return column;
}

let generateProductList = (data) => {
    try{
        if(document.getElementById('productList').innerHTML != null)
        {
            document.getElementById('productList').innerHTML = null;
        }

        let productList = document.createElement('div');
        productList.className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4";
        
        const area = document.getElementById('productList');
        area.appendChild(productList);
        data.forEach((product) => {
            productList.appendChild(generateCard(product.name, product.image, product.price, product.category));
        });
    } catch (e) {
        console.log(e);
    }
}

let getCategories = (data) => {
    let categoryList = ["All"];
    data.forEach((product) => {
       
        if(!categoryList.includes(product.category)) 
        {
            categoryList.push(product.category);
        }
    });
    categoryList.sort();

    let categoryForm = document.getElementById('category');
    categoryList.forEach((category) => {
        let option = document.createElement('option');
        option.value = category;
        option.innerHTML = category;
        categoryForm.appendChild(option);
    })
}


// Sorting
let sortLowHigh = (data) => {
    return data.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
}

let sortHighLow = (data) => {
    return data.sort(function(a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
    });
}

let sortAZ = (data) => {
    return data.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });
}

let sortBySelected = (data) => {
    switch (document.getElementById('sort').value) 
    {
        case 'price-low-high':
            return sortLowHigh(data);
        case 'price-high-low':
            return sortHighLow(data);
        case 'a-z':
            return sortAZ(data);
    }
}

let filterResults = (data) => {
    const priceFilter = [{min: 0, max: 50}, {min: 50, max: 100}, {min: 101, max: 200}];

    let newList = [];

    let priceFilterIndex = document.getElementById('price').value;
    if(priceFilterIndex == -1) {
        newList = data;
    }
    else {
        newList = data.filter((product) => (product.price >= priceFilter[priceFilterIndex].min) && (product.price <= priceFilter[priceFilterIndex].max));
    }

    let categoryFilter = document.getElementById('category').value;
    if(categoryFilter != "All") {
        newList = newList.filter((product) => product.category == categoryFilter);
    }
    return newList;
}

