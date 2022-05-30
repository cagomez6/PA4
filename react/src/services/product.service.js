import http from "../http-common";

class ProductDataService {
    getAll() {
        return http.get("/products");
    }

    get(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        return http.post("/products", data);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    deleteAll() {
        return http.delete(`/products`);
    }

    findByFilters(title, rating, min, max) {
        return http.get(`/products`, {
            params: {
                title: title ? title : null,
                rating: rating ? rating : null,
                min: min ? min : null,
                max: max ? max : null,
            }
        });
    }
}

export default new ProductDataService();