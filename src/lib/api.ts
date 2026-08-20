const API_URL = "https://dummyjson.com";

export async function getProducts(
  limit = 12,
  skip = 0
) {
  const response = await fetch(
    `${API_URL}/products?limit=${limit}&skip=${skip}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return {
    products: data.products,
    total: data.total,
  };
}

export async function searchProducts(
  query: string,
  limit = 12,
  skip = 0
) {
  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(
      query
    )}&limit=${limit}&skip=${skip}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const data = await response.json();

  return {
    products: data.products,
    total: data.total,
  };
}


export async function getProductsByCategory(
  category: string,
  limit = 12,
  skip = 0
) {
  const response = await fetch(
    `${API_URL}/products/category/${encodeURIComponent(
      category
    )}?limit=${limit}&skip=${skip}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch category products"
    );
  }

  const data = await response.json();

  return {
    products: data.products,
    total: data.total,
  };
}

export async function getCategories() {
  const response = await fetch(
    `${API_URL}/products/categories`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  // DummyJSON can return category objects
  // depending on the endpoint/version.
  // Convert them into simple strings.

  return data.map((category: any) => {
    if (typeof category === "string") {
      return category;
    }

    return category.slug || category.name;
  });
}
export async function getProduct(id: string | number) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}